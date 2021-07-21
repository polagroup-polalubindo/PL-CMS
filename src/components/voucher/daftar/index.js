import React, { useContext, useEffect, useState } from "react";
import { CMSContext } from "../../../context/state";
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Menu,
} from "@material-ui/core";

import useStyles from "./styles";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import { useHistory } from "react-router";

export default function Index(params) {
  const classes = useStyles();

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
            Dari 22/03/2021 sampai 23/05/21
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
                  {bodyRows.map((row) => (
                    <TableRow key={row.kode_voucher}>
                      <TableCell>{row.kode_voucher}</TableCell>
                      <TableCell>{row.tipe_voucher}</TableCell>
                      <TableCell>{row.diskon}</TableCell>
                      <TableCell>{row.batas_pemakaian}</TableCell>
                      <TableCell>{row.diklaim}</TableCell>
                      <TableCell>{row.digunakan}</TableCell>
                      <TableCell>
                        <div
                          style={{
                            backgroundColor:
                              row.periode === "Akan Datang"
                                ? "#ffdede"
                                : "#deffe6",
                            color:
                              row.periode === "Akan Datang" ? "red" : "green",
                            padding: 5,
                          }}
                        >
                          {row.periode}
                        </div>
                        {row.waktu_periode}
                      </TableCell>
                      <TableCell>
                        <Button
                          aria-controls="simple-menu"
                          aria-haspopup="true"
                          onClick={(event) => {
                            setAnchorEl(event.currentTarget);
                          }}
                          variant="outlined"
                          endIcon={<ArrowDropDownIcon />}
                        >
                          Pilih Aksi
                        </Button>
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={() => {
                            setAnchorEl(null);
                          }}
                        >
                          <MenuItem
                            onClick={() => {
                              setAnchorEl(null);
                            }}
                          >
                            Edit
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              setAnchorEl(null);
                            }}
                          >
                            Hapus/Hentikan
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              setAnchorEl(null);
                            }}
                          >
                            Duplikat
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
