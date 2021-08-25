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
  CircularProgress,
  TablePagination,
  TextField,
  InputAdornment
} from "@material-ui/core";

import useStyles from "./styles";
import SearchIcon from "@material-ui/icons/Search";

import VoucherCard from "../voucherCard";

export default function Index() {
  const classes = useStyles();

  const { fetchVoucher, voucher, proses, totalVoucher } = useContext(CMSContext);

  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const [status, setStatus] = useState(null)
  const [keyword, setKeyword] = useState(null)

  useEffect(() => {
    fetchData(rowsPerPage, page, status, keyword);
  }, []);

  const views = [
    { value: null, label: "Semua" },
    { value: "Sedang Berjalan", label: "Sedang Berjalan" },
    { value: "Akan Datang", label: "Akan Datang" },
    { value: "Telah Berakhir", label: "Telah Berakhir" },
  ];

  const headRows = [
    { value: "Nama Voucher" },
    { value: "Kode Voucher" },
    { value: "Tipe Voucher" },
    { value: "Periode" },
    { value: "Aksi" },
  ];

  const fetchData = (limit, page, status, ) => {
    let query = `?limit=${limit}&page=${page}`
    if (status !== null) query += `&status=${status}`
    if (keyword !== null) query += `&keyword=${keyword}`

    fetchVoucher(query);
  }

  const handleChangeStatus = (args) => {
    setStatus(args)
    setPage(0)
    fetchData(rowsPerPage, 0, args, keyword)
  }

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value)
    setPage(0)
    fetchData(e.target.value, 0, status, keyword)
  }

  const handleChangePage = (e, newPage) => {
    setPage(newPage)
    fetchData(rowsPerPage, newPage, status, keyword)
  }

  const handleChangeKeyword = (event) => {
    setKeyword(event.target.value)
    setPage(0)
    fetchData(rowsPerPage, 0, status, event.target.value)
  }

  const refresh = () => {
    setPage(0)
    fetchData(rowsPerPage, 0, status, keyword)
  }

  return (
    <>
      {/* <Paper style={{ padding: 10 }}>
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
      <br /> */}
      <Paper style={{ padding: 10 }}>
        <Grid container spacing={2}>
          <TextField
            label="Cari nama/code"
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            value={keyword}
            onChange={handleChangeKeyword}
          />

          <Grid item xs={12}>
            {views.map((option) => (
              <Button
                key={option.value}
                onClick={() => handleChangeStatus(option.value)}
                style={{
                  borderBottom:
                    status === option.value
                      ? "2px solid red"
                      : "1px solid #6e6d6d",
                  borderRadius: 0,
                  color: status === option.value ? "red" : "#6e6d6d",
                }}
              >
                <b>{option.label}</b>
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
                    voucher.map((row) => <VoucherCard row={row} refresh={refresh}/>)}
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
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={totalVoucher}
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
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
