import React, { useState, useContext } from "react";
import {
  Grid,
  TextField,
  CardContent,
  Card,
  Typography,
  Button,
  Switch,
  withStyles,
  FormControlLabel,
  Paper,
  Radio,
  InputAdornment,
} from "@material-ui/core";

import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

import useStyles from "./styles";

import { CMSContext } from "../../../context/state";
import { useHistory } from "react-router";

function Index() {
  const classes = useStyles();

  const [tipeVoucher, setTipeVoucher] = useState("Diskon");
  const [maksimalDiskon, setMaksimalDiskon] = useState("Atur Maksimal Diskon");
  const [minimalPembelian, setMinimalPembelian] = useState(
    "Atur Minimal Pembelian"
  );
  const [berlakuUntuk, setBerlakuUntuk] = useState("Semua Produk");

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
              <TextField variant="outlined" size="small" fullWidth />
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
              />
            </Grid>

            <Grid item xs={2}>
              <Typography variant="body2" component="p">
                Tipe Voucher
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel
                value="Diskon"
                control={
                  <Radio
                    classes={{
                      root: classes.checkbox,
                      checked: classes.checkedBox,
                    }}
                  />
                }
                label="Diskon"
                checked={tipeVoucher === "Diskon"}
                onChange={(event) => setTipeVoucher(event.target.value)}
              />
            </Grid>
            <Grid item xs={7}>
              <FormControlLabel
                value="Nominal"
                control={
                  <Radio
                    classes={{
                      root: classes.checkbox,
                      checked: classes.checkedBox,
                    }}
                  />
                }
                label="Nominal"
                checked={tipeVoucher === "Nominal"}
                onChange={(event) => setTipeVoucher(event.target.value)}
              />
            </Grid>

            <Grid item xs={2}>
              <Typography variant="body2" component="p">
                Maksimal Diskon
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel
                value="Atur Maksimal Diskon"
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
                value="Tanpa Batas"
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
                value="Atur Minimal Pembelian"
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
                value="Tanpa Batas"
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
                onChange={(event) => setMinimalPembelian(event.target.value)}
              />
            </Grid>

            <Grid item xs={2}>
              <Typography variant="body2" component="p">
                Kouta Pemakaian
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <TextField variant="outlined" size="small" fullWidth />
            </Grid>
            <Grid item xs={5} />

            <Grid item xs={2}>
              <Typography variant="body2" component="p">
                Berlaku Untuk
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel
                value="Semua Produk"
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
                onChange={(event) => setBerlakuUntuk(event.target.value)}
              />
            </Grid>
            <Grid item xs={7}>
              <FormControlLabel
                value="Produk Tertentu"
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
                onChange={(event) => setBerlakuUntuk(event.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} className={classes.button}>
        <Button variant="outlined">Batal</Button>
        <Button variant="outlined">Simpan & Tambah Baru</Button>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          className={classes.button_simpan}
        >
          Simpan
        </Button>
      </Grid>
    </Grid>
  );
}

export default Index;
