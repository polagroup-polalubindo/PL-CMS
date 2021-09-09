import React, { useContext, useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Paper,
  Radio,
  InputAdornment,
  RadioGroup,
  Switch
} from "@material-ui/core";

import Swal from "sweetalert2";

// import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

import useStyles from "./styles";
import moment from 'moment';
import SeCreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';

import { CMSContext } from "../../../context/state";
import { useHistory } from "react-router";

const animatedComponents = makeAnimated();

function Index({ location }) {
  const classes = useStyles();
  const history = useHistory();

  const { addVoucher, editVoucher, fetchProduk, produk, URL_SERVER } = useContext(CMSContext);
  const [input, setInput] = useState({
    voucherId: null,
    name: "",
    code: "",
    periodeStart: "",
    periodeEnd: "",
    typeVoucher: "Diskon",
    nominal: 0,
    discountMax: 0,
    minimumPurchase: 0,
    usageQuota: 0,
    statusDiscountMax: "tanpaBatas",
    statusMinimumPurchase: "tanpaBatas",
    statusPemakaian: 'tanpaBatas',
    canCombine: false
  });

  const [selectedProduct, setSelectedProduct] = useState([]);
  const [typeVoucher, setTypeVoucher] = useState("Diskon");
  const [forAll, setForAll] = useState(true);
  const [file, setFile] = useState("/img/cms/photo-product-placeholder.png");
  const [image, setImage] = useState(null);

  const handleInput = async (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    async function fetch() {
      await fetchProduk()
    }
    fetch()
  }, [])

  useEffect(() => {
    async function fetch() { }
    if (location.state?.data) {
      setInput({
        ...input,
        voucherId: location.state.data.id,
        name: 'asdasdasd',
        code: location.state.data.code,
        periodeStart: location.state.data.periodeStart.slice(0, 10),
        periodeEnd: location.state.data.periodeEnd.slice(0, 10),
        discountMax: location.state.data.discountMax,
        statusDiscountMax:
          location.state.data.discountMax === 0
            ? "tanpaBatas"
            : "aturMaksimalDiskon",
        minimumPurchase: location.state.data.minimumPurchase,
        statusMinimumPurchase:
          location.state.data.minimumPurchase === 0
            ? "tanpaBatas"
            : "aturMinimalPembelian",
        usageQuota: location.state.data.usageQuota,
        nominal: location.state.data.nominal,
        statusPemakaian: location.state.data.isUnlimited ? "tanpaBatas" : "aturMaksimalPemakaian",
        canCombine: location.state.data.canCombine,
        keterangan: location.state.data.keterangan
      });

      if (produk.length > 0 && location.state?.data?.VoucherProducts.length > 0) {
        let produkSelected = []

        produk.forEach(el => {
          let check = location.state?.data?.VoucherProducts.find(element => element.productId === el.id)
          if (check) produkSelected.push(el)
        })
        setSelectedProduct(produkSelected)
      }

      if(location.state.data.banner){
        setFile(`${URL_SERVER}/${location.state.data.banner}`)
      }

      setForAll(location.state.data.forAll);
      setTypeVoucher(location.state.data.typeVoucher);
      // BANNER BELOM KE HANDLE
    }
    fetch()
  }, [location.state]);

  useEffect(() => {
    async function fetch() {
      if (location.state?.data && location.state?.data?.VoucherProducts.length > 0) {
        let produkSelected = []
        await produk.forEach(el => {
          let check = location.state?.data?.VoucherProducts.find(element => element.productId === el.id)
          if (check) produkSelected.push(el)
        })
        setSelectedProduct(produkSelected)
      }
    }
    fetch()
  }, [produk])


  const send = async () => {
    let formData = new FormData();
    if (await !validate()) {
      // if (location.state?.data) {
      //   if (input.name !== location.state.data.name) formData.append('name', input.name);
      //   if (input.code !== location.state.data.code) formData.append('code', input.code);
      //   if (input.periodeStart !== location.state.data.periodeStart)
      //     formData.append('periodeStart', input.periodeStart);
      //   if (input.periodeEnd !== location.state.data.periodeEnd)
      //     formData.append('periodeEnd', input.periodeEnd);
      //   if (input.discountMax !== location.state.data.discountMax)
      //     formData.append('discountMax', input.discountMax);
      //   if (input.minimumPurchase !== location.state.data.minimumPurchase)
      //     formData.append('minimumPurchase', input.minimumPurchase);
      //   if (input.usageQuota !== location.state.data.usageQuota)
      //     formData.append('usageQuota', input.usageQuota);
      //   formData.append('forAll', forAll);
      //   formData.append('typeVoucher', typeVoucher);
      // } 

      formData.append('name', input.name)
      formData.append('code', input.code)
      formData.append('typeVoucher', typeVoucher)
      formData.append('nominal', input.nominal)
      formData.append('usageQuota', input.usageQuota)
      formData.append('discountMax', input.statusDiscountMax === "tanpaBatas" ? 0 : input.discountMax)
      formData.append('minimumPurchase', input.statusMinimumPurchase === "tanpaBatas" ? 0 : input.minimumPurchase)
      formData.append('periodeStart', input.periodeStart)
      formData.append('periodeEnd', input.periodeEnd)
      formData.append('keterangan', input.keterangan)
      formData.append('canCombine', input.canCombine)
      formData.append('isUnlimited', input.statusPemakaian === 'tanpaBatas' ? true : false)
      formData.append('forAll', forAll)
      if (!forAll) formData.append('listProduct', JSON.stringify(selectedProduct))

      if (image) formData.append('banner', image)

      if (location.state?.data) {
        let edit = await editVoucher(
          location.state.data.id,
          formData)

        if (edit === 'success') {
          Swal.fire({
            title: "Edit voucher berhasil",
            icon: "success",
          })
          history.push("/voucher")
        }
      } else {
        let add = await addVoucher(
          formData,
        );

        if (add === 'success') {
          Swal.fire({
            title: "Tambah voucher berhasil",
            icon: "success",
          })
          history.push("/voucher")
        }
      }
    }
  };

  const validate = () => {
    let isError = false

    if (!input.name) {
      Swal.fire({
        title: 'Nama Voucher belum terisi',
        icon: 'error'
      })
      isError = true
    } else if (!input.code) {
      Swal.fire({
        title: 'Code Voucher belum terisi',
        icon: 'error'
      })
      isError = true
    } else if (!input.periodeStart) {
      Swal.fire({
        title: 'Periode Mulai Klaim Voucher belum terisi',
        icon: 'error'
      })
      isError = true
    } else if (!input.periodeEnd) {
      Swal.fire({
        title: 'Periode Akhir Klaim Voucher belum terisi',
        icon: 'error'
      })
      isError = true
    } else if (input.periodeStart > input.periodeEnd) {
      Swal.fire({
        title: 'Error',
        validationMessage: 'Periode Mulai harus lebih kecil dari Periode Selesai',
        icon: 'error'
      })
      isError = true
    } else if (!input.nominal) {
      Swal.fire({
        title: 'Nomimal potongan tidak boleh 0',
        icon: 'error'
      })
      isError = true
    } else if (input.statusDiscountMax === "aturMaksimalDiskon" && !input.discountMax) {
      Swal.fire({
        title: 'Maksimal potongan tidak valid',
        icon: 'error'
      })
      isError = true
    } else if (input.statusMinimumPurchase === "aturMinimalPembelian" && !input.minimumPurchase) {
      Swal.fire({
        title: 'Minimal pembelian tidak valid',
        icon: 'error'
      })
      isError = true
    } else if (input.statusPemakaian === 'aturMaksimalPemakaian' && !input.usageQuota) {
      Swal.fire({
        title: 'Kouta Pemakaian tidak valid',
        icon: 'error'
      })
      isError = true
    } else if (!forAll && selectedProduct.length === 0) {
      Swal.fire({
        title: 'Produk tertentu belum terisi',
        icon: 'error'
      })
      isError = true
    } else if (!input.keterangan) {
      Swal.fire({
        title: 'Keterangan belum terisi',
        icon: 'error'
      })
      isError = true
    }

    return isError
  }

  const handleChangeMaksimalDiskon = (event) => {
    setInput({ ...input, statusDiscountMax: event.target.value });
  };

  const handleChangeMinimumPurchase = (event) => {
    setInput({ ...input, statusMinimumPurchase: event.target.value });
  };

  useEffect(() => {
    if (input.periodeStart > input.periodeEnd) {
      setInput({ ...input, periodeEnd: null })
    }
  }, [input.periodeStart])

  const handleFile = (name, index) => async (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);

      let reader = new FileReader();
      reader.onload = (e) => {
        setFile(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleChangeSelect = (name, newValue, actionMeta) => {
    setSelectedProduct(newValue);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.root} elevation={2}>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={2}>
              <Typography variant="body2" component="p">
                Nama Voucher
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                name="name"
                value={input.name}
                onChange={handleInput}
              />
            </Grid>
          </Grid>

          <Grid
            container
            spacing={3}
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={2}>
              <Typography variant="body2" component="p">
                Kode Voucher
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                // InputProps={{
                //   endAdornment: (
                //     <InputAdornment position="end">0/10</InputAdornment>
                //   ),
                // }}
                name="code"
                value={input.code}
                onChange={handleInput}
              />
            </Grid>
          </Grid>

          <Grid
            container
            spacing={3}
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={2}>
              <Typography variant="body2" component="p">
                Banner Voucher
              </Typography>
              <i style={{ margin: 0, fontSize: 12 }}>*ukuran 360px x 230px</i>
            </Grid>
            {input.voucherId ? (
              <Grid item xs={10} className={classes.imgInput}>
                <label for="file-input" style={{ cursor: "pointer" }}>
                  <img
                    src={file}
                    alt="image"
                    id="img"
                    className={classes.imgTag}
                  />
                  <p
                    // className={classes.imgTag}
                    style={{
                      textAlign: "center",
                      marginTop: 0,
                      marginBottom: 0,
                      width: 360,
                    }}
                  >
                    Change foto
                  </p>
                </label>

                <input
                  id="file-input"
                  type="file"
                  accept=".jpg"
                  onChange={handleFile("image")}
                />
              </Grid>
            ) : (
              <Grid item xs={10} className={classes.imgInput}>
                <label for="file-input">
                  <img
                    src={file}
                    alt="image"
                    id="img"
                    className={classes.imgTag}
                  />
                </label>

                <input
                  id="file-input"
                  type="file"
                  accept=".jpg"
                  onChange={handleFile("image")}
                />
              </Grid>
            )}
          </Grid>

          <Grid
            container
            spacing={3}
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={2}>
              <Typography variant="body2" component="p">
                Periode Klaim Voucher
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                name="periodeStart"
                value={input.periodeStart}
                defaultValue={input.periodeStart}
                onChange={handleInput}
                InputProps={{ inputProps: { min: moment().format('YYYY-MM-DD') } }}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography align="center">-</Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                type="date"
                name="periodeEnd"
                value={input.periodeEnd}
                onChange={handleInput}
                InputProps={{ inputProps: { min: input.periodeStart || moment().format('YYYY-MM-DD') } }}
              />
            </Grid>
          </Grid>

          <Grid
            container
            spacing={3}
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={2}>
              <Typography variant="body2" component="p">
                Tipe Voucher
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <FormControlLabel
                control={
                  <Radio
                    classes={{
                      root: classes.checkbox,
                      checked: classes.checkedBox,
                    }}
                  />
                }
                label="Diskon"
                checked={typeVoucher === "Diskon"}
                name="typeVoucher"
                value="Diskon"
                onChange={(event) => setTypeVoucher(event.target.value)}
              />
              <FormControlLabel
                control={
                  <Radio
                    classes={{
                      root: classes.checkbox,
                      checked: classes.checkedBox,
                    }}
                  />
                }
                label="Nominal"
                checked={typeVoucher === "Nominal"}
                name="typeVoucher"
                value="Nominal"
                onChange={(event) => setTypeVoucher(event.target.value)}
              />
            </Grid>
          </Grid>

          <Grid
            container
            spacing={3}
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={2}>
              <Typography variant="body2" component="p">
                Nominal Potongan
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Masukkan Angka"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">{typeVoucher === "Diskon" ? '%' : 'Rp'} |</InputAdornment>
                  ),
                }}
                name="nominal"
                value={input.nominal}
                onChange={handleInput}
              />
            </Grid>
          </Grid>

          <Grid
            container
            spacing={3}
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={2}>
              <Typography variant="body2" component="p">
                Maksimal Diskon
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <RadioGroup
                row
                value={input.statusDiscountMax}
                onChange={handleChangeMaksimalDiskon}
              >
                <FormControlLabel
                  control={
                    <Radio
                      classes={{
                        root: classes.checkbox,
                        checked: classes.checkedBox,
                      }}
                    />
                  }
                  label="Tanpa Batas"
                  value="tanpaBatas"
                />
                <FormControlLabel
                  control={
                    <Radio
                      classes={{
                        root: classes.checkbox,
                        checked: classes.checkedBox,
                      }}
                    />
                  }
                  label="Atur Maksimal Diskon"
                  value="aturMaksimalDiskon"
                />
              </RadioGroup>

              {input.statusDiscountMax === "aturMaksimalDiskon" && (
                <>
                  {/* <br /> */}
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Masukkan Angka"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Rp |</InputAdornment>
                      ),
                    }}
                    name="discountMax"
                    value={input.discountMax}
                    onChange={handleInput}
                  />
                </>
              )}
            </Grid>
          </Grid>

          <Grid
            container
            spacing={3}
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={2}>
              <Typography variant="body2" component="p">
                Minimal Pembelian
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <RadioGroup
                row
                value={input.statusMinimumPurchase}
                onChange={handleChangeMinimumPurchase}
              >
                <FormControlLabel
                  control={
                    <Radio
                      classes={{
                        root: classes.checkbox,
                        checked: classes.checkedBox,
                      }}
                    />
                  }
                  label="Tanpa Batas"
                  value="tanpaBatas"
                />
                <FormControlLabel
                  control={
                    <Radio
                      classes={{
                        root: classes.checkbox,
                        checked: classes.checkedBox,
                      }}
                    />
                  }
                  label="Atur Minimal Pembelian"
                  value="aturMinimalPembelian"
                />
              </RadioGroup>
              {input.statusMinimumPurchase === "aturMinimalPembelian" && (
                <>
                  {/* <br /> */}
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Masukkan Angka"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Rp |</InputAdornment>
                      ),
                    }}
                    name="minimumPurchase"
                    value={input.minimumPurchase}
                    onChange={handleInput}
                  />
                </>
              )}
            </Grid>
          </Grid>

          <Grid
            container
            spacing={3}
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={2}>
              <Typography variant="body2" component="p">
                Kouta Pemakaian
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <RadioGroup
                row
                value={input.statusPemakaian}
                onChange={(event) => setInput({ ...input, statusPemakaian: event.target.value })}
              >
                <FormControlLabel
                  control={
                    <Radio
                      classes={{
                        root: classes.checkbox,
                        checked: classes.checkedBox,
                      }}
                    />
                  }
                  label="Tanpa Batas"
                  value="tanpaBatas"
                />
                <FormControlLabel
                  control={
                    <Radio
                      classes={{
                        root: classes.checkbox,
                        checked: classes.checkedBox,
                      }}
                    />
                  }
                  label="Atur Maksimal Pemakaian"
                  value="aturMaksimalPemakaian"
                />
              </RadioGroup>

              {
                input.statusPemakaian === 'aturMaksimalPemakaian' &&
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="usageQuota"
                  value={input.usageQuota}
                  onChange={handleInput}
                />
              }
            </Grid>
          </Grid>

          <Grid
            container
            spacing={3}
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={2}>
              <Typography variant="body2" component="p">
                Berlaku Untuk
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <FormControlLabel
                control={
                  <Radio
                    classes={{
                      root: classes.checkbox,
                      checked: classes.checkedBox,
                    }}
                  />
                }
                label="Semua Produk"
                checked={forAll === true}
                name="forAll"
                onChange={() => setForAll(true)}
              />
              <FormControlLabel
                control={
                  <Radio
                    classes={{
                      root: classes.checkbox,
                      checked: classes.checkedBox,
                    }}
                  />
                }
                label="Produk Tertentu"
                checked={forAll === false}
                name="forAll"
                onChange={() => setForAll(false)}
              />

              {
                !forAll &&
                <SeCreatableSelect
                  isMulti
                  components={animatedComponents}
                  options={produk}
                  value={selectedProduct}
                  onChange={value => handleChangeSelect('selectedProduct', value)}
                  getOptionLabel={(option) => option.namaProduk}
                  getOptionValue={(option) => option.id}
                />
              }
            </Grid>
          </Grid>

          <Grid
            container
            spacing={3}
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={2}>
              <Typography variant="body2" component="p">
                Pemakaian bisa dikombinasi
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <FormControlLabel
                control={
                  <Switch
                    checked={input.canCombine}
                    onChange={() =>
                      setInput({
                        ...input,
                        canCombine: !input.canCombine,
                      })
                    }
                    focusVisibleClassName={classes.focusVisible}
                    color="secondary"
                    disableRipple
                    classes={{
                      root: classes.switch,
                      switchBase: classes.switchBase,
                      thumb: classes.thumb,
                      track: classes.track,
                      checked: classes.checked,
                    }}
                  />
                }
                label={input.canCombine ? "Bisa" : "Tidak Bisa"}
              />
            </Grid>
          </Grid>

          <Grid
            container
            spacing={3}
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={2}>
              <Typography variant="body2" component="p">
                Keterangan
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                multiline
                rows={3}
                variant="outlined"
                size="small"
                fullWidth
                name="keterangan"
                value={input.keterangan}
                onChange={handleInput}
                placeholder="Dapatkan potongan harga sebesar 10% dengan maksimal ..."
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} className={classes.button}>
        <Button variant="outlined" onClick={() => history.push("/voucher")}>
          Batal
        </Button>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          className={classes.button_simpan}
          onClick={send}
        >
          Simpan
        </Button>
      </Grid>
    </Grid >
  );
}

export default Index;
