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
  CircularProgress,
  TablePagination
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./styles";
import { CMSContext } from "../../../context/state";
import { RowCard } from "./RowCard";

export default function Index(params) {
  const classes = useStyles();
  const { transaksi, fetchTransaksi, ubahStatusPembayaran, tolakPesanan, proses, totalTransaksi } =
    useContext(CMSContext);
  const [status, setStatus] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    function fetch() {
      fetchData(rowsPerPage, page, keyword, status);
    }
    fetch()
  }, [])

  const allFilter = [
    { value: "semua transaksi", status: null },
    { value: "perlu verifikasi", status: 'menunggu konfirmasi' },
    { value: "belum bayar", status: 'menunggu pembayaran' },
    { value: "verified", status: 'verified' },
    { value: "pembayaran ditolak", status: 'pesanan di tolak' },
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

  const fetchData = (limit, page, keyword, status) => {
    let query = `?limit=${limit}&page=${page}&keyword=${keyword}`
    if (status !== null) {
      query += `&status=${status}`
    }

    fetchTransaksi(query);
  }

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value)
    setPage(0)
    fetchData(e.target.value, 0, keyword, status)
  }

  const handleChangePage = (e, newPage) => {
    setPage(newPage)
    fetchData(rowsPerPage, newPage, keyword, status)
  }

  const handleChangeStatus = (args) => {
    setStatus(args)
    setPage(0)
    fetchData(rowsPerPage, 0, keyword, args)
  }

  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value)
    setPage(0)
    fetchData(rowsPerPage, 0, e.target.value, status)
  }

  return (
    <>
      <TextField
        label="Cari nama member, nomor resi"
        id="standard-start-adornment"
        variant="outlined"
        size="small"
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
        value={keyword}
        onChange={handleChangeKeyword}
      />
      <br />
      <br />
      <div className={classes.root}>
        {allFilter && allFilter.length > 0 && allFilter.map((option) => (
          <Chip
            key={option.value}
            label={option.value}
            onClick={() => handleChangeStatus(option.status)}
            style={{
              backgroundColor: status === option.status ? "red" : null,
              color: status === option.status ? "#fff" : null,
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
            {!proses && transaksi.map((item) => (
              <RowCard
                item={item}
                handleVerified={handleVerified}
                handleTolak={handleTolak}
              />
            ))}
          </TableBody>
        </Table>
        <Grid style={{ display: 'flex', justifyContent: 'center' }}>
          {
            proses
              ? <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 80, height: 80 }}>
                <CircularProgress style={{ width: 50, height: 50 }} />
              </Grid>
              : (transaksi.length === 0) && <p>Tidak ada data</p>
          }
        </Grid>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={totalTransaksi}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page'
          }}
          nextIconButtonProps={{
            'aria-label': 'next page'
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
}
