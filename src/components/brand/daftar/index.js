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
import { useHistory } from "react-router";

import useStyles from "./styles";
import SearchIcon from "@material-ui/icons/Search";

import BrandCard from "../brandCard";

export default function Index() {
  const classes = useStyles();
  const history = useHistory();

  const { fetchBrand, brand, proses, totalBrand } = useContext(CMSContext);

  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const [status, setStatus] = useState(null)
  const [keyword, setKeyword] = useState(null)

  useEffect(() => {
    fetchData(rowsPerPage, page, status, keyword);
  }, []);

  const headRows = [
    { value: "Foto Brand" },
    { value: "Nama Brand" },
    { value: "Aksi" },
  ];

  const fetchData = (limit, page, keyword) => {
    let query = `?limit=${limit}&page=${page}`
    if (status !== null) query += `&status=${status}`
    if (keyword !== null) query += `&keyword=${keyword}`

    fetchBrand(query);
  }


  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value)
    setPage(0)
    fetchData(e.target.value, 0, keyword)
  }

  const handleChangePage = (e, newPage) => {
    setPage(newPage)
    fetchData(rowsPerPage, newPage, keyword)
  }

  const handleChangeKeyword = (event) => {
    setKeyword(event.target.value)
    setPage(0)
    fetchData(rowsPerPage, 0, event.target.value)
  }

  const refresh = () => {
    setPage(0)
    fetchData(rowsPerPage, 0, status, keyword)
  }

  return (
    <Grid>
      <Button
        variant="contained"
        disableElevation
        color="primary"
        className={classes.tambah_produk}
        onClick={() => history.push("/brand/tambah")}
      >
        + Tambah Brand
      </Button>
      <br />
      <TextField
        label="Cari brand"
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
        style={{ marginBottom: 20 }}
      />

      <Paper style={{ padding: 10 }}>
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
                  brand &&
                  brand.length > 0 &&
                  brand.map((row) => <BrandCard row={row} refresh={refresh} />)}
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
                brand.length === 0 && <p>Tidak ada data yang tersedia</p>
              )}
            </Grid>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={totalBrand}
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
      </Paper>
    </Grid>
  );
}
