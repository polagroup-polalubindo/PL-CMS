import React, { useContext, useEffect, useState } from "react";

import {
  Chip,
  TextField,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  MenuItem,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./styles";
import { CMSContext } from "../../../context/state";
import { RowCard } from "./RowCard";

export default function Index(params) {
  const classes = useStyles();
  const { transaksi, fetchTransaksi, ubahStatusPembayaran, tolakPesanan } =
    useContext(CMSContext);
  const [filter, setFilter] = React.useState("semua transaksi");
  const needVerification = transaksi.filter(
    (el) => el.statusPembayaran === "menunggu konfirmasi"
  );
  const beforePayment = transaksi.filter(
    (el) => el.statusPembayaran === "menunggu pembayaran"
  );
  const verified = transaksi.filter((el) => el.statusPembayaran === "verified");
  const rejected = transaksi.filter(
    (el) => el.statusPembayaran === "pesanan di tolak"
  );

  const allFilter = [
    { value: "semua transaksi" },
    { value: "perlu verifikasi" },
    { value: "belum bayar" },
    { value: "verified" },
    { value: "pembayaran ditolak" },
  ];

  const handleVerified = (data) => {
    console.log(data);
    ubahStatusPembayaran({ statusPembayaran: "verified", id: data.id });
  };

  const handleTolak = async (data) => {
    console.log(data);
    data.statusPesanan = "pesanan di tolak";
    data.statusPembayaran = "pesanan di tolak";
    data.statusPengiriman = "pesanan di tolak";
    const response = await tolakPesanan(data);
    if (response.message) {
      fetchTransaksi();
    }
  };

  useEffect(() => {
    fetchTransaksi();
  }, []);

  return (
    <>
      <TextField
        label="Cari transaksi"
        id="standard-start-adornment"
        variant="outlined"
        size="small"
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
      />
      <br />
      <br />
      <div className={classes.root}>
        {allFilter.map((option) => (
          <Chip
            key={option.value}
            label={option.value}
            onClick={() => setFilter(option.value)}
            style={{
              backgroundColor: filter === option.value ? "red" : null,
              color: filter === option.value ? "#fff" : null,
            }}
          />
        ))}
      </div>
      <br />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.table_head}>
            <TableRow>
              <TableCell>Tgl Transaksi</TableCell>
              <TableCell>ID Transaksi</TableCell>
              <TableCell>Member</TableCell>
              <TableCell>Sales Invoice</TableCell>
              <TableCell>Metode Pembayaran</TableCell>
              <TableCell>Rekening Asal</TableCell>
              <TableCell>Bank Asal</TableCell>
              <TableCell>Bank Tujuan</TableCell>
              <TableCell>Total Transaksi</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filter === "perlu verifikasi"
              ? needVerification.map((item) => (
                  <RowCard
                    item={item}
                    handleVerified={handleVerified}
                    handleTolak={handleTolak}
                  />
                ))
              : filter === "belum bayar"
              ? beforePayment.map((item) => (
                  <RowCard
                    item={item}
                    handleVerified={handleVerified}
                    handleTolak={handleTolak}
                  />
                ))
              : filter === "verified"
              ? verified.map((item) => (
                  <RowCard
                    item={item}
                    handleVerified={handleVerified}
                    handleTolak={handleTolak}
                  />
                ))
              : filter === "pembayaran ditolak"
              ? rejected.map((item) => (
                  <RowCard
                    item={item}
                    handleVerified={handleVerified}
                    handleTolak={handleTolak}
                  />
                ))
              : transaksi.map((item) => (
                  <RowCard
                    item={item}
                    handleVerified={handleVerified}
                    handleTolak={handleTolak}
                  />
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
