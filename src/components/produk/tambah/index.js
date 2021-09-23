import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  FormControlLabel,
  Switch,
  MenuItem,
  Button,
  FormControl,
  RadioGroup,
  Radio,
} from "@material-ui/core";

import useStyles from "./styles";
import FieldSertifikasi from "./sertifikasi";
import FieldHargaGrosir from "./hargaGrosir";

import { CMSContext } from "../../../context/state";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

function Index({ location }) {
  const hiddenFileInputTDS = React.useRef(null);
  const hiddenFileInputMSDS = React.useRef(null);
  const classes = useStyles();
  const history = useHistory();
  const { brand, fetchBrand, tambahProduk, editProduk } =
    useContext(CMSContext);
  const [produkId, setProdukId] = useState(null);
  const [file, setFile] = useState("/img/cms/photo-product-placeholder.png");
  const [image, setImage] = useState(null);

  const [sertifikasi, setSertifikasi] = useState([]);

  const [asuransiPengiriman, setAsuransiPengiriman] = useState("Wajib");
  const [layananPengiriman, setLayananPengiriman] = useState("Standar");

  const [newHargaGrosir, setNewHargaGrosir] = useState([]);

  const [input, setInput] = useState({
    fotoProduk: null,
    namaProduk: "",
    brandId: null,
    deskripsi: "",
    minPesanan: 1,
    hargaSatuan: 0,
    diskon: "",
    statusProduk: false,
    stock: 0,
    sku: "",
    weight: 0,
    panjang: null,
    lebar: null,
    tinggi: null,
    komisiStatus: false,
    komisiLevel1: 0,
    komisiLevel2: 0,
    komisiLevel3: 0,
    levelKomisi: 0,

    urlVideo: "",
    TDS: null,
    MSDS: null,

    asuransiPengiriman: "Wajib",
    layananPengiriman: "Standar",

    preOrder: false,
  });

  useEffect(() => {
    fetchBrand();
    if (location?.state && location?.state.data) {
      setProdukId(location?.state.data.id);
      fetchDataForEdit(location?.state.data);
    }
  }, []);

  const allAsuransiPengiriman = [
    {
      value: "Wajib",
    },
    {
      value: "Opsional",
    },
  ];

  const allLayananPengiriman = [
    {
      value: "Standar",
    },
    {
      value: "Custom",
    },
  ];

  const send = async (e) => {
    if (await !validateForm()) {
      let newData = input;
      newData.hargaGrosir = newHargaGrosir;
      const data = new FormData();

      try {
        if (produkId) {
          delete newData.Brand;
          delete newData.BrandId;
          delete newData.preOrder;
          delete newData.HargaGrosirs;

          data.append("data", JSON.stringify(newData, null, 2));

          if (image && image.name) data.append("image", image);
          if (input.MSDS && input.MSDS.name) data.append("MSDS", input.MSDS);
          if (input.TDS && input.TDS.name) data.append("TDS", input.TDS);
          if (sertifikasi.length > 0) {
            sertifikasi.forEach((el) => {
              data.append("sertifikasi", el);
            });
          }

          await editProduk(produkId, data);
          Swal.fire({
            title: "Tambah produk berhasil",
            icon: "success",
          });
        } else {
          data.append("data", JSON.stringify(newData, null, 2));
          data.append("image", image);
          if (input.MSDS) data.append("MSDS", input.MSDS);
          if (input.TDS) data.append("TDS", input.TDS);
          if (sertifikasi.length > 0) {
            sertifikasi.forEach((el) => {
              data.append("sertifikasi", el);
            });
          }

          await tambahProduk(data);
          Swal.fire({
            title: "Tambah produk berhasil",
            icon: "success",
          });
        }
        history.push("/produk");
      } catch (err) {
        Swal.fire({
          title: "Silahkan coba lagi",
          icon: "error",
        });
      }
    }
  };

  const validateForm = () => {
    let isError = false;
    if (image === null && !produkId) {
      Swal.fire({
        title: "photo belum di upload",
        icon: "error",
      });
      isError = true;
    } else if (
      input.namaProduk === "" ||
      input.brandId === null ||
      input.deskripsi === "" ||
      !input.minPesanan ||
      !input.hargaSatuan ||
      !input.weight ||
      !input.weight ||
      !input.panjang ||
      !input.lebar ||
      !input.tinggi ||
      input.sku === ""
    ) {
      Swal.fire({
        title: "data belum lengkap",
        icon: "error",
      });
      isError = true;
    } else if (input.deskripsi.length > 255) {
      Swal.fire({
        title: "deskripsi produk max 255 character",
        icon: "error",
      });
      isError = true;
    }

    return isError;
  };

  const handleInput = async (e, index) => {
    if (
      e.target.name !== "namaProduk" &&
      e.target.name !== "brandId" &&
      e.target.name !== "deskripsi" &&
      e.target.name !== "sku" &&
      e.target.name !== "urlVideo" &&
      e.target.name !== "urlTDS" &&
      e.target.name !== "urlMSDS" &&
      e.target.name !== "urlSertifikasi"
    ) {
      if (!isNaN(e.target.value)) {
        setInput({ ...input, [e.target.name]: e.target.value });
      }
    } else {
      setInput({ ...input, [e.target.name]: e.target.value });
    }
  };

  const handleAsuransiPengiriman = (event) => {
    setAsuransiPengiriman(event.target.value);
  };

  const handleLayananPengiriman = (event) => {
    setLayananPengiriman(event.target.value);
  };

  const handleFile = (name, index) => async (e) => {
    if (e.target.files && e.target.files[0]) {
      if (name === "image") {
        setImage(e.target.files[0]);

        let reader = new FileReader();
        reader.onload = (e) => {
          setFile(e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
      } else if (name === "tds") {
        setInput({ ...input, TDS: e.target.files[0] });
      } else if (name === "msds") {
        setInput({ ...input, MSDS: e.target.files[0] });
      } else if (name === "sertifikat") {
        let newData = sertifikasi;
        await setSertifikasi([]);
        newData[index] = e.target.files[0];
        await setSertifikasi(newData);
      }
    }
  };

  const deleteSertifikasi = async (index) => {
    let newData = sertifikasi;
    await setSertifikasi([]);
    newData.splice(index, 1);
    setSertifikasi(newData);
  };

  const addSertifikasi = async () => {
    let newData = sertifikasi;
    await setSertifikasi([]);
    newData.push(null);
    setSertifikasi(newData);
  };

  const handleSetHargaGrosir = (data) => {
    setNewHargaGrosir(data);
  };

  const fetchDataForEdit = (data) => {
    let checkTDS = data.TDS && data.TDS.split("/");
    let checkMSDS = data.MSDS && data.MSDS.split("/");

    setFile(data.fotoProduk);
    setInput({
      ...data,
      brandId: data.BrandId,
      diskon: data.discount,
      TDS: checkTDS ? checkTDS[checkTDS.length - 1] : null,
      MSDS: checkMSDS ? checkMSDS[checkMSDS.length - 1] : null,
      urlVideo: data.videoProduk,
      preOrder: data.preorder,
    });

    setAsuransiPengiriman(data.asuransiPengiriman);
    setLayananPengiriman(data.layananPengiriman);

    setSertifikasi(data.Sertifikasis);
    setNewHargaGrosir(data.HargaGrosirs);
  };

  return (
    <Grid
      container
      spacing={3}
      direction="row"
      justify="flex-start"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Card className={classes.root} elevation={2}>
          <Grid container>
            <Grid item xs={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <b>Upload Foto Produk</b>
                </Typography>
                <Typography variant="body2" component="p">
                  ukuran 222px x 125px
                </Typography>
              </CardContent>
            </Grid>
            {produkId ? (
              <Grid item xs={10} className={classes.imgInput}>
                <label for="file-input" style={{ cursor: "pointer" }}>
                  <img
                    src={file}
                    alt="image"
                    id="img"
                    className={classes.imgTag}
                  />
                  <p
                    className={classes.imgTag}
                    style={{
                      textAlign: "center",
                      marginTop: 0,
                      marginBottom: 0,
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
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card className={classes.root} elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <b>Informasi Produk</b>
            </Typography>
            <Grid container spacing={5} alignItems="flex-start">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Nama Produk
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  helperText={
                    <p
                      style={{ textAlign: "right", margin: 0 }}
                    >{`${input.namaProduk?.length}/255`}</p>
                  }
                  name="namaProduk"
                  onChange={handleInput}
                  value={input.namaProduk}
                />
              </Grid>
            </Grid>
            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Brand
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  size="small"
                  select
                  className={classes.brandWidth}
                  name="brandId"
                  onChange={handleInput}
                  value={input.brandId}
                >
                  {brand &&
                    brand.length > 0 &&
                    brand.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.namaBrand}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card className={classes.root} elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <b>Detil Produk</b>
            </Typography>
            <Grid container spacing={5} alignItems="flex-start">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Deskripsi Produk
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  helperText={`${input.deskripsi?.length}/255`}
                  multiline
                  rows={10}
                  name="deskripsi"
                  onChange={handleInput}
                  value={input.deskripsi}
                />
              </Grid>
            </Grid>

            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Video Produk
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  placeholder="Url video"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="urlVideo"
                  onChange={handleInput}
                  value={input.urlVideo}
                />
              </Grid>
            </Grid>

            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  TDS Produk
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  color="transparent"
                  onClick={() => hiddenFileInputTDS.current.click()}
                >
                  {input.TDS
                    ? input.TDS.name
                      ? `${input.TDS.name.slice(
                          0,
                          10
                        )} ... ${input.TDS.name.slice(
                          input.TDS.name.length - 8,
                          input.TDS.name.length
                        )}`
                      : `${input.TDS.slice(0, 10)} ... ${input.TDS.slice(
                          input.TDS.length - 8,
                          input.TDS.length
                        )}`
                    : " + Tambah File TDS"}
                </Button>
                <input
                  ref={hiddenFileInputTDS}
                  type="file"
                  accept=".pdf"
                  onChange={handleFile("tds")}
                  hidden
                />
              </Grid>
              <Grid item xs={2}>
                <Typography
                  align="right"
                  variant="body2"
                  component="p"
                  gutterBottom
                >
                  MSDS Produk
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  color="transparent"
                  onClick={() => hiddenFileInputMSDS.current.click()}
                >
                  {input.MSDS
                    ? input.MSDS.name
                      ? `${input.MSDS.name.slice(
                          0,
                          10
                        )} ... ${input.MSDS.name.slice(
                          input.MSDS.name.length - 8,
                          input.MSDS.name.length
                        )}`
                      : `${input.MSDS.slice(0, 10)} ... ${input.MSDS.slice(
                          input.MSDS.length - 8,
                          input.MSDS.length
                        )}`
                    : " + Tambah File MSDS"}
                </Button>
                <input
                  ref={hiddenFileInputMSDS}
                  type="file"
                  accept=".pdf"
                  onChange={handleFile("msds")}
                  hidden
                />
              </Grid>
            </Grid>

            <Grid container spacing={5}>
              <Grid item xs={2}>
                <Typography
                  variant="body2"
                  component="p"
                  style={{ margin: "8px 0px" }}
                >
                  Sertifikasi
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Grid style={{ display: "flex", flexDirection: "column" }}>
                  {sertifikasi.map((el, index) => (
                    <FieldSertifikasi
                      key={("sertifikat", index)}
                      data={el}
                      lengthData={sertifikasi.length}
                      deleteSertifikasi={deleteSertifikasi}
                      sertifikasiIndex={index}
                      handleFile={handleFile}
                    />
                  ))}
                </Grid>
                <p
                  style={{ margin: "8px 0px", cursor: "pointer" }}
                  onClick={addSertifikasi}
                >
                  + Sertifikasi Baru
                </p>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card className={classes.root} elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <b>Harga Produk</b>
            </Typography>
            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Minimum Pemesanan
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={input.minPesanan}
                  name="minPesanan"
                  onChange={handleInput}
                />
              </Grid>
            </Grid>

            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Harga Satuan
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        className={classes.inputAdornment}
                      >
                        <p className={classes.colorTextWhite}>Rp.</p>
                      </InputAdornment>
                    ),
                    style: {
                      paddingLeft: "0",
                    },
                  }}
                  name="hargaSatuan"
                  value={input.hargaSatuan}
                  onChange={handleInput}
                />
              </Grid>
            </Grid>

            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Diskon
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        className={classes.inputAdornment}
                      >
                        <p className={classes.colorTextWhite}>%</p>
                      </InputAdornment>
                    ),
                    style: {
                      paddingRight: "0",
                    },
                  }}
                  name="discount"
                  value={input.discount}
                  onChange={handleInput}
                />
              </Grid>
            </Grid>

            <Grid container spacing={5}>
              <Grid item xs={2}>
                <Typography
                  variant="body2"
                  component="p"
                  style={{ margin: "8px 0px" }}
                >
                  Harga Grosir
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <FieldHargaGrosir
                  handleSetHargaGrosir={handleSetHargaGrosir}
                  data={newHargaGrosir}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card className={classes.root} elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <b>Pengelolaan Produk</b>
            </Typography>
            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Status Produk
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={input.statusProduk}
                      onChange={() =>
                        setInput({
                          ...input,
                          statusProduk: !input.statusProduk,
                        })
                      }
                      focusVisibleClassName={classes.focusVisible}
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
                  label="Aktif"
                />
              </Grid>
            </Grid>

            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Stok Produk
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="stock"
                  value={input.stock}
                  onChange={handleInput}
                />
              </Grid>
            </Grid>

            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  SKU
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="sku"
                  onChange={handleInput}
                  value={input.sku}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card className={classes.root} elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <b>Berat & Pengiriman</b>
            </Typography>
            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Berat Produk
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="weight"
                  value={input.weight}
                  onChange={handleInput}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        className={classes.inputAdornment}
                      >
                        <p className={classes.colorTextWhite}>gram</p>
                      </InputAdornment>
                    ),
                    style: {
                      paddingRight: "0",
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Ukuran
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Panjang"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        className={classes.inputAdornment}
                      >
                        <p className={classes.colorTextWhite}>cm</p>
                      </InputAdornment>
                    ),
                    style: {
                      paddingRight: "0",
                    },
                  }}
                  name="panjang"
                  value={input.panjang}
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Lebar"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        className={classes.inputAdornment}
                      >
                        <p className={classes.colorTextWhite}>cm</p>
                      </InputAdornment>
                    ),
                    style: {
                      paddingRight: "0",
                    },
                  }}
                  name="lebar"
                  value={input.lebar}
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Tinggi"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        className={classes.inputAdornment}
                      >
                        <p className={classes.colorTextWhite}>cm</p>
                      </InputAdornment>
                    ),
                    style: {
                      paddingRight: "0",
                    },
                  }}
                  name="tinggi"
                  value={input.tinggi}
                  onChange={handleInput}
                />
              </Grid>
            </Grid>

            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Asuransi Pengiriman
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    defaultValue={asuransiPengiriman}
                    value={asuransiPengiriman}
                    onChange={handleAsuransiPengiriman}
                  >
                    {allAsuransiPengiriman.map((option) => (
                      <FormControlLabel
                        control={
                          <Radio
                            classes={{
                              root: classes.checkbox,
                              checked: classes.checkedBox,
                            }}
                          />
                        }
                        key={option.value}
                        label={option.value}
                        value={option.value}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Layanan Pengiriman
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    defaultValue={layananPengiriman}
                    value={layananPengiriman}
                    onChange={handleLayananPengiriman}
                  >
                    {allLayananPengiriman.map((option) => (
                      <FormControlLabel
                        control={
                          <Radio
                            classes={{
                              root: classes.checkbox,
                              checked: classes.checkedBox,
                            }}
                          />
                        }
                        key={option.value}
                        label={option.value}
                        value={option.value}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Preorder
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={input.preOrder}
                      onChange={() =>
                        setInput({
                          ...input,
                          preOrder: !input.preOrder,
                        })
                      }
                      focusVisibleClassName={classes.focusVisible}
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
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card className={classes.root} elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <b>Komisi</b>
            </Typography>
            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Status
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={input.komisiStatus}
                      onChange={() =>
                        setInput({
                          ...input,
                          komisiStatus: !input.komisiStatus,
                        })
                      }
                      focusVisibleClassName={classes.focusVisible}
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
                  label="Aktif"
                />
              </Grid>
            </Grid>

            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Berlaku Sebesar
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  variant="outlined"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        className={classes.inputAdornment}
                      >
                        <p className={classes.colorTextWhite}>%</p>
                      </InputAdornment>
                    ),
                    style: {
                      paddingRight: "0",
                    },
                  }}
                  name="komisiLevel1"
                  value={input.komisiLevel1}
                  onChange={handleInput}
                  fullWidth
                />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2" component="p" gutterBottom>
                  Nama Level Komisi&emsp;&emsp;Level 1
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Berlaku Sebesar
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  variant="outlined"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        className={classes.inputAdornment}
                      >
                        <p className={classes.colorTextWhite}>%</p>
                      </InputAdornment>
                    ),
                    style: {
                      paddingRight: "0",
                    },
                  }}
                  name="komisiLevel2"
                  value={input.komisiLevel2}
                  onChange={handleInput}
                  fullWidth
                />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2" component="p" gutterBottom>
                  Nama Level Komisi&emsp;&emsp;Level 2
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Berlaku Sebesar
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  variant="outlined"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        className={classes.inputAdornment}
                      >
                        <p className={classes.colorTextWhite}>%</p>
                      </InputAdornment>
                    ),
                    style: {
                      paddingRight: "0",
                    },
                  }}
                  name="komisiLevel3"
                  value={input.komisiLevel3}
                  onChange={handleInput}
                  fullWidth
                />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2" component="p" gutterBottom>
                  Nama Level Komisi&emsp;&emsp;Level 3
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} className={classes.buttonGroup}>
        <Button variant="outlined" onClick={() => history.push("/produk")}>
          Batal
        </Button>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          className={classes.buttonContained}
          onClick={send}
        >
          Simpan
        </Button>
      </Grid>
    </Grid>
  );
}

export default Index;
