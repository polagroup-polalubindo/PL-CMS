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

import Swal from "sweetalert2";

// import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

import useStyles from "./styles";

import { CMSContext } from "../../../context/state";
import { useHistory } from "react-router";

function Index({ location }) {
  const classes = useStyles();
  const history = useHistory();

  const { addVoucher, editVoucher } = useContext(CMSContext);
  const [input, setInput] = useState({
    name: "",
    code: "",
    periodeStart: "",
    periodeEnd: "",
    typeVoucher: "Diskon",
    discountMax: 0,
    minimumPurchase: 0,
    usageQuota: 0,
    forAll: true,
  });

  const [typeVoucher, setTypeVoucher] = useState("Diskon");
  const [discountMax, setDiscountMax] = useState("Tanpa Batas");
  const [minimumPurchase, setMinimumPurchase] = useState("Tanpa Batas");
  const [forAll, setForAll] = useState(true);

  const handleInput = async (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (location.state?.data) {
      setInput({
        name: location.state.data.name,
        code: location.state.data.code,
        periodeStart: location.state.data.periodeStart,
        periodeEnd: location.state.data.periodeEnd,
        discountMax: location.state.data.discountMax,
        minimumPurchase: location.state.data.minimumPurchase,
        usageQuota: location.state.data.usageQuota,
      });

      setForAll(location.state.data.forAll);
      setTypeVoucher(location.state.data.typeVoucher);
    }
  }, [location.state]);

  const send = async () => {
    let newData = {};
    if (location.state?.data) {
      if (input.name !== location.state.data.name) newData.name = input.name;
      if (input.code !== location.state.data.code) newData.code = input.code;
      if (input.periodeStart !== location.state.data.periodeStart)
        newData.periodeStart = input.periodeStart;
      if (input.periodeEnd !== location.state.data.periodeEnd)
        newData.periodeEnd = input.periodeEnd;
      if (input.discountMax !== location.state.data.discountMax)
        newData.discountMax = input.name;
      if (input.minimumPurchase !== location.state.data.minimumPurchase)
        newData.minimumPurchase = input.minimumPurchase;
      if (input.usageQuota !== location.state.data.usageQuota)
        newData.usageQuota = input.usageQuota;
      newData.forAll = forAll;
      newData.typeVoucher = typeVoucher;
    } else {
      newData = { ...input, forAll: forAll, typeVoucher: typeVoucher };
    }

    location.state?.data
      ? await editVoucher(location.state.data.id, newData)
      : await addVoucher(newData);
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
                type="datetime-local"
                // InputProps={{
                //   startAdornment: (
                //     <InputAdornment position="start">
                //       <CalendarTodayIcon />
                //     </InputAdornment>
                //   ),
                // }}
                InputLabelProps={{
                  shrink: true,
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
                type="datetime-local"
                // InputProps={{
                //   startAdornment: (
                //     <InputAdornment position="start">
                //       <CalendarTodayIcon />
                //     </InputAdornment>
                //   ),
                // }}
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
                label="Tanpa Batas"
                checked={discountMax === "Tanpa Batas"}
                value="Tanpa Batas"
                onChange={(event) => setDiscountMax(event.target.value)}
              />
              {discountMax === "Tanpa Batas" && (
                <input
                  type="text"
                  value="0"
                  name="discountMax"
                  onChange={handleInput}
                  hidden
                />
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
                label="Atur Maksimal Diskon"
                checked={discountMax === "Atur Maksimal Diskon"}
                value="Atur Maksimal Diskon"
                onChange={(event) => setDiscountMax(event.target.value)}
              />
              {discountMax === "Atur Maksimal Diskon" && (
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
                    name="discountMax"
                    value={input.discountMax}
                    onChange={handleInput}
                  />
                </>
              )}
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
                label="Tanpa Batas"
                checked={minimumPurchase === "Tanpa Batas"}
                name="minimumPurchase"
                value="Tanpa Batas"
                onChange={(event) => setMinimumPurchase(event.target.value)}
              />
              {minimumPurchase === "Tanpa Batas" && (
                <input
                  type="text"
                  value="0"
                  name="minimumPurchase"
                  onChange={handleInput}
                  hidden
                />
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
                label="Atur Minimal Pembelian"
                checked={minimumPurchase === "Atur Minimal Pembelian"}
                value="Atur Minimal Pembelian"
                onChange={(event) => setMinimumPurchase(event.target.value)}
              />
              {minimumPurchase === "Atur Minimal Pembelian" && (
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
                    name="minimumPurchase"
                    value={input.minimumPurchase}
                    onChange={handleInput}
                  />
                </>
              )}
            </Grid>

            <Grid item xs={2}>
              <Typography variant="body2" component="p">
                Kouta Pemakaian
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                name="usageQuota"
                value={input.usageQuota}
                onChange={handleInput}
              />
            </Grid>
            <Grid item xs={7} />

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
                checked={forAll === true}
                name="forAll"
                onChange={() => setForAll(true)}
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
                checked={forAll === false}
                name="forAll"
                onChange={() => setForAll(false)}
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
