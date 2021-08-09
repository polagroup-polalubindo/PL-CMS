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
} from "@material-ui/core";

import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

import useStyles from "./styles";

import { CMSContext } from "../../../context/state";
import { useHistory } from "react-router";

function Index({ location }) {
  const classes = useStyles();
  const history = useHistory();

  const { tambahVoucher, ubahVoucher } = useContext(CMSContext);
  const [input, setInput] = useState({
    name: null,
    code: null,
    periodeStart: null,
    periodeEnd: null,
    typeVoucher: "Diskon",
    discountMax: "Atur Maksimal Diskon",
    minimumPurchase: null,
    usageQuota: null,
    forAll: null,
    listProduct: null,
  });

  const [typeVoucher, setTypeVoucher] = useState("Diskon");
  const [maksimalDiskon, setMaksimalDiskon] = useState("Atur Maksimal Diskon");
  const [minimalPembelian, setMinimalPembelian] = useState(
    "Atur Minimal Pembelian"
  );
  const [berlakuUntuk, setBerlakuUntuk] = useState("Semua Produk");

  useEffect(() => {
    if (location.state?.data) {
      setInput({
        name: location.state.data.name,
        code: location.state.data.code,
        periodeStart: location.state.data.periodeStart,
        periodeEnd: location.state.data.periodeEnd,
        typeVoucher: location.state.data.typeVoucher,
        discountMax: location.state.data.discountMax,
        minimumPurchase: location.state.data.minimumPurchase,
        usageQuota: location.state.data.usageQuota,
        forAll: location.state.data.forAll,
        listProduct: location.state.data.listProduct,
      });
    }
  }, [location.state]);

  const send = async () => {
    let response,
      newData = {};
    if (location.state?.data) {
      if (input.name !== location.state.data.name) newData.name = input.name;
      if (input.code !== location.state.data.code) newData.code = input.code;
      if (input.periodeStart !== location.state.data.periodeStart)
        newData.periodeStart = input.periodeStart;
      if (input.periodeEnd !== location.state.data.periodeEnd)
        newData.periodeEnd = input.periodeEnd;
      if (input.typeVoucher !== location.state.data.typeVoucher)
        newData.typeVoucher = input.typeVoucher;
      if (input.discountMax !== location.state.data.discountMax)
        newData.discountMax = input.discountMax;
      if (input.discountMax !== location.state.data.discountMax)
        newData.discountMax = input.discountMax;
      if (input.minimumPurchase !== location.state.data.minimumPurchase)
        newData.minimumPurchase = input.minimumPurchase;
      if (input.usageQuota !== location.state.data.usageQuota)
        newData.usageQuota = input.usageQuota;
      if (input.forAll !== location.state.data.forAll)
        newData.forAll = input.forAll;
      if (input.listProduct !== location.state.data.listProduct)
        newData.listProduct = input.listProduct;
    } else {
      newData = { ...input };
    }

    response = location.state?.data
      ? await ubahVoucher(location.state.data.id, newData)
      : await tambahVoucher(newData);
    if (response.message === "success") {
      history.push("/voucher");
    }
  };

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">0/10</InputAdornment>
                  ),
                }}
                name="code"
                value={input.code}
                onChange={handleInput}
              />
            </Grid>

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
                placeholder="26/03/2020 00:00"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon />
                    </InputAdornment>
                  ),
                }}
                name="periodeStart"
                value={input.periodeStart}
                onChange={handleInput}
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
                placeholder="26/03/2020 00:00"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon />
                    </InputAdornment>
                  ),
                }}
                name="periodeEnd"
                value={input.periodeEnd}
                onChange={handleInput}
              />
            </Grid>

            <Grid item xs={2}>
              <Typography variant="body2" component="p">
                Tipe Voucher
              </Typography>
            </Grid>
            <Grid item xs={3}>
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
            </Grid>
            <Grid item xs={7}>
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

            <Grid item xs={2}>
              <Typography variant="body2" component="p">
                Maksimal Diskon
              </Typography>
            </Grid>
            <Grid item xs={3}>
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
                checked={maksimalDiskon === "Atur Maksimal Diskon"}
                name="discountMax"
                value="Atur Maksimal Diskon"
                onChange={(event) => setMaksimalDiskon(event.target.value)}
              />
              {maksimalDiskon === "Atur Maksimal Diskon" && (
                <>
                  <br />
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Masukkan Angka"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Rp |</InputAdornment>
                      ),
                    }}
                  />
                </>
              )}
            </Grid>
            <Grid item xs={7}>
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
                checked={maksimalDiskon === "Tanpa Batas"}
                name="discountMax"
                value="Tanpa Batas"
                onChange={(event) => setMaksimalDiskon(event.target.value)}
              />
            </Grid>

            <Grid item xs={2}>
              <Typography variant="body2" component="p">
                Minimal Pembelian
              </Typography>
            </Grid>
            <Grid item xs={3}>
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
                checked={minimalPembelian === "Atur Minimal Pembelian"}
                name="minimumPurchase"
                value={input.minimumPurchase}
                onChange={(event) => setMinimalPembelian(event.target.value)}
              />
              {minimalPembelian === "Atur Minimal Pembelian" && (
                <>
                  <br />
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Masukkan Angka"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Rp |</InputAdornment>
                      ),
                    }}
                  />
                </>
              )}
            </Grid>
            <Grid item xs={7}>
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
                checked={minimalPembelian === "Tanpa Batas"}
                name="minimumPurchase"
                value={input.minimumPurchase}
                onChange={(event) => setMinimalPembelian(event.target.value)}
              />
            </Grid>

            <Grid item xs={2}>
              <Typography variant="body2" component="p">
                Kouta Pemakaian
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                name="usageQuota"
                value={input.usageQuota}
                onChange={handleInput}
              />
            </Grid>
            <Grid item xs={5} />

            <Grid item xs={2}>
              <Typography variant="body2" component="p">
                Berlaku Untuk
              </Typography>
            </Grid>
            <Grid item xs={3}>
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
                checked={berlakuUntuk === "Semua Produk"}
                name="forAll"
                value={input.forAll}
                onChange={(event) => setBerlakuUntuk(event.target.value)}
              />
            </Grid>
            <Grid item xs={7}>
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
                checked={berlakuUntuk === "Produk Tertentu"}
                name="listProduct"
                value={input.listProduct}
                onChange={(event) => setBerlakuUntuk(event.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} className={classes.button}>
        <Button variant="outlined" onClick={() => history.push("/voucher")}>
          Batal
        </Button>
        <Button variant="outlined">Simpan & Tambah Baru</Button>
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
    </Grid>
  );
}

export default Index;
