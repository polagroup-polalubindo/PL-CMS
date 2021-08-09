import React, { useContext, useEffect, useState } from "react";
import { CMSContext } from "../../../context/state";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
  MenuItem,
  Menu,
  CircularProgress,
} from "@material-ui/core";

import useStyles from "./styles";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import CreateIcon from "@material-ui/icons/Create";

import VoucherCard from "../voucherCard";
import { useHistory } from "react-router";

export default function Index(params) {
  const classes = useStyles();
  const history = useHistory();

  const { fetchVoucher, voucher, proses } = useContext(CMSContext);

  useEffect(() => {
    fetchVoucher();
  }, []);

  const [view, setView] = React.useState("Semua");

  const views = [
    { value: "Semua" },
    { value: "Sedang Berjalan" },
    { value: "Akan Datang" },
    { value: "Telah Berakhir" },
  ];

  const headRows = [
    { value: "Kode Voucher" },
    { value: "Tipe Voucher" },
    { value: "Diskon" },
    { value: "Batas Pemakaian" },
    { value: "Diklaim" },
    { value: "Digunakan" },
    { value: "Periode" },
    { value: "Aksi" },
  ];

  const bodyRows = [
    {
      kode_voucher: "SVC71236",
      tipe_voucher: "Voucher Disc",
      diskon: 30,
      batas_pemakaian: "399",
      diklaim: 0,
      digunakan: 1,
      periode: "Akan Datang",
      waktu_periode: (
        <>
          05/05/2021 00:00
          <br />
          07/08/2021 14:23
        </>
      ),
    },
    {
      kode_voucher: "SVC71236",
      tipe_voucher: "Voucher Disc",
      diskon: 30,
      batas_pemakaian: "399",
      diklaim: 0,
      digunakan: 1,
      periode: "Sedang Berjalan",
      waktu_periode: (
        <>
          05/05/2021 00:00
          <br />
          07/08/2021 14:23
        </>
      ),
    },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <>
      <Paper style={{ padding: 10 }}>
        <Grid container spacing={4} style={{ paddingBottom: 20 }}>
          <Grid item xs={12}>
            <Typography variant="h6">
              <b>Overview:</b>
            </Typography>
            Dari 22/03/2021 sampai 23/05/21 <CreateIcon />
          </Grid>

          <Grid item xs={3} style={{ borderRight: "1px solid" }}>
            <b>Digunakan</b>
            <br />
            <Typography variant="h4">1</Typography>
            vs 7 hari terakhir -%
          </Grid>
          <Grid item xs={3} style={{ borderRight: "1px solid" }}>
            <b>Pembeli</b>
            <br />
            <Typography variant="h4">1</Typography>
            vs 7 hari terakhir -%
          </Grid>
          <Grid item xs={3} style={{ borderRight: "1px solid" }}>
            <b>Jumlah Terjual</b>
            <br />
            <Typography variant="h4">1</Typography>
            vs 7 hari terakhir -%
          </Grid>
          <Grid item xs={3}>
            <b>Penjualan</b>
            <br />
            <Typography variant="h4"> Rp. 331.161,-</Typography>
            vs 7 hari terakhir -%
          </Grid>
        </Grid>
      </Paper>
      <br />
      <Paper style={{ padding: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">
              <b>Daftar Voucher</b>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            {views.map((option) => (
              <Button
                key={option.value}
                onClick={() => setView(option.value)}
                style={{
                  borderBottom:
                    view === option.value
                      ? "2px solid red"
                      : "1px solid #6e6d6d",
                  borderRadius: 0,
                  color: view === option.value ? "red" : "#6e6d6d",
                }}
              >
                <b>{option.value}</b>
              </Button>
            ))}
          </Grid>

          <Grid item xs={12}>
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead className={classes.table_head}>
                  <TableRow>
                    {headRows.map((row) => (
                      <TableCell key={row.value}>
                        <b>{row.value}</b>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!proses &&
                    voucher &&
                    voucher.length > 0 &&
                    voucher.map((row) => <VoucherCard row={row} />)}
                </TableBody>
              </Table>
              <Grid style={{ display: "flex", justifyContent: "center" }}>
                {proses ? (
                  <Grid
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 80,
                      height: 80,
                    }}
                  >
                    <CircularProgress style={{ width: 50, height: 50 }} />
                  </Grid>
                ) : (
                  voucher.length === 0 && <p>Tidak ada data yang tersedia</p>
                )}
              </Grid>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
