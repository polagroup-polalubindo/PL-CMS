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
  Grid,
  CircularProgress
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./styles";
import { CMSContext } from "../../../context/state";
import { RowCard } from "./RowCard";

export default function Index(params) {
  const classes = useStyles();
  const { transaksi, fetchTransaksi, ubahStatusPembayaran, tolakPesanan, proses } =
    useContext(CMSContext);
  const [filter, setFilter] = React.useState("semua transaksi");
  const [needVerification, setNeedVerification] = useState([])
  const [beforePayment, setBeforePayment] = useState([])
  const [verified, setVerified] = useState([])
  const [rejected, setRejected] = useState([])

  // const needVerification = ;
  // const beforePayment = ;
  // const verified = ;
  // const rejected = ;

  useEffect(() => {
    fetchTransaksi();
  }, [])

  useEffect(() => {
    async function fetch() {
      setNeedVerification(transaksi.filter(
        (el) => el.statusPembayaran === "menunggu konfirmasi"
      ))
      setBeforePayment(transaksi.filter(
        (el) => el.statusPembayaran === "menunggu pembayaran"
      ))
      setVerified(transaksi.filter((el) => el.statusPembayaran === "verified"))
      setRejected(transaksi.filter(
        (el) => el.statusPembayaran === "pesanan di tolak"
      ))
    }
    fetch()
  }, [transaksi])

  const allFilter = [
    { value: "semua transaksi" },
    { value: "perlu verifikasi" },
    { value: "belum bayar" },
    { value: "verified" },
    { value: "pembayaran ditolak" },
  ];

  const handleVerified = (data) => {
    ubahStatusPembayaran({ statusPembayaran: "verified", id: data.id });
  };

  const handleTolak = async (data) => {
    data.statusPesanan = "pesanan di tolak";
    data.statusPembayaran = "pesanan di tolak";
    data.statusPengiriman = "pesanan di tolak";
    const response = await tolakPesanan(data);
    if (response.message) {
      fetchTransaksi();
    }
  };

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
        {allFilter && allFilter.length > 0 && allFilter.map((option) => (
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
            {!proses && (filter === "perlu verifikasi"
              ? needVerification && needVerification.length > 0 && needVerification.map((item) => (
                <RowCard
                  item={item}
                  handleVerified={handleVerified}
                  handleTolak={handleTolak}
                />
              ))
              : filter === "belum bayar"
                ? beforePayment && beforePayment.length > 0 && beforePayment.map((item) => (
                  <RowCard
                    item={item}
                    handleVerified={handleVerified}
                    handleTolak={handleTolak}
                  />
                ))
                : filter === "verified"
                  ? verified && verified.length > 0 && verified.map((item) => (
                    <RowCard
                      item={item}
                      handleVerified={handleVerified}
                      handleTolak={handleTolak}
                    />
                  ))
                  : filter === "pembayaran ditolak"
                    ? rejected && rejected.length > 0 && rejected.map((item) => (
                      <RowCard
                        item={item}
                        handleVerified={handleVerified}
                        handleTolak={handleTolak}
                      />
                    ))
                    : transaksi && transaksi.length > 0 && transaksi.map((item) => (
                      <RowCard
                        item={item}
                        handleVerified={handleVerified}
                        handleTolak={handleTolak}
                      />
                    )))}
          </TableBody>
        </Table>
        <Grid style={{ display: 'flex', justifyContent: 'center' }}>
          {
            proses
              ? <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 80, height: 80 }}>
                <CircularProgress style={{ width: 50, height: 50 }} />
              </Grid>
              : (
                ((filter === "perlu verifikasi" && needVerification.length === 0) ||
                  (filter === "belum bayar" && beforePayment.length === 0) ||
                  (filter === "verified" && verified.length === 0) ||
                  (filter === "pembayaran ditolak" && rejected.length === 0) ||
                  transaksi.length === 0) &&
                <p>Tidak ada data</p>)
          }
        </Grid>
      </TableContainer>
    </>
  );
}
