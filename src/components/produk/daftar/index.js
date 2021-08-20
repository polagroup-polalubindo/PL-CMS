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
  CircularProgress,
  Grid,
  TablePagination,
} from "@material-ui/core";

import useStyles from "./styles";

// import ImportExportOutlinedIcon from "@material-ui/icons/ImportExportOutlined";

import ProdukCard from "../produkCard";
import { useHistory } from "react-router";

export default function Index(params) {
  const classes = useStyles();
  const history = useHistory();
  const { fetchProduk, produk, proses, totalProduk } = useContext(CMSContext);

  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    fetchData(rowsPerPage, page, status)
  }, []);

  const views = [
    { value: "semua produk", status: null },
    { value: "aktif", status: 1 },
    { value: "tidak aktif", status: 0 },
  ];

  const fetchData = (limit, page, status) => {
    let query = `?limit=${limit}&page=${page}`
    if (status !== null) query += `&status=${status}`
    fetchProduk(query);
  }

  const handleChangeStatus = (args) => {
    setStatus(args)
    setPage(0)
    fetchData(rowsPerPage, 0, args)
  }

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value)
    setPage(0)
    fetchData(e.target.value, 0, status)
  }

  const handleChangePage = (e, newPage) => {
    setPage(newPage)
    fetchData(rowsPerPage, newPage, status)
  }

  return (
    <>
      <Button
        variant="contained"
        disableElevation
        color="primary"
        className={classes.tambah_produk}
        onClick={() => history.push("/produk/tambah")}
      >
        + Tambah Produk
      </Button>

      <br />

      {views.map((option) => (
        <Button
          key={option.value}
          onClick={() => handleChangeStatus(option.status)}
          style={{
            borderBottom:
              status === option.status ? "2px solid red" : "2px solid black",
            borderRadius: 0,
            color: status === option.status ? "red" : null,
          }}
        >
          <b>{option.value}</b>
        </Button>
      ))}

      <TableContainer
        component={Paper}
        elevation={2}
        className={classes.table_container}
      >
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell>
                <Checkbox
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              </TableCell> */}
              <TableCell>
                {/* <Button
                  className={classes.button}
                  endIcon={<ImportExportOutlinedIcon />}
                > */}
                INFO PRODUK
                {/* </Button> */}
              </TableCell>
              <TableCell>
                {/* <Button
                  className={classes.button}
                  endIcon={<ImportExportOutlinedIcon />}
                > */}
                HARGA
                {/* </Button> */}
              </TableCell>
              <TableCell>
                {/* <Button
                  className={classes.button}
                  endIcon={<ImportExportOutlinedIcon />}
                > */}
                STOK
                {/* </Button> */}
              </TableCell>
              <TableCell>
                {/* <Button
                  className={classes.button}
                  // endIcon={<ImportExportOutlinedIcon />}
                > */}
                AKTIF
                {/* </Button> */}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              !proses && produk && produk.length > 0 && produk.map((row) => <ProdukCard row={row} />)
            }
          </TableBody>
        </Table>
        <Grid style={{ display: 'flex', justifyContent: 'center' }}>
          {
            proses
              ? <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 80, height: 80 }}>
                <CircularProgress style={{ width: 50, height: 50 }} />
              </Grid>
              : produk.length === 0 && <p> Tidak ada data produk</p>
          }
        </Grid>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={totalProduk}
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
