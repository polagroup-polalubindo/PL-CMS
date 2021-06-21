import React, { useContext, useEffect } from "react";
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
} from "@material-ui/core";

import useStyles from "./styles";

import ImportExportOutlinedIcon from "@material-ui/icons/ImportExportOutlined";

import ProdukCard from "../produkCard";
import { useHistory } from "react-router";

export default function Index(params) {
  const classes = useStyles();
  const history = useHistory();
  const { autoLogin, fetchProduk, produk } = useContext(CMSContext);
  const [view, setView] = React.useState("semua produk");

  const aktif = produk.filter((el) => el.statusProduk === true);
  const tidakAktif = produk.filter((el) => el.statusProduk === false);

  useEffect(() => {
    // autoLogin();
    fetchProduk();
  }, []);

  const views = [
    { value: "semua produk" },
    { value: "aktif" },
    { value: "tidak aktif" },
  ];

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
          onClick={() => setView(option.value)}
          style={{
            borderBottom:
              view === option.value ? "2px solid red" : "2px solid black",
            borderRadius: 0,
            color: view === option.value ? "red" : null,
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
              <TableCell>
                <Checkbox
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              </TableCell>
              <TableCell>
                <Button
                  className={classes.button}
                  endIcon={<ImportExportOutlinedIcon />}
                >
                  INFO PRODUK
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  className={classes.button}
                  endIcon={<ImportExportOutlinedIcon />}
                >
                  HARGA
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  className={classes.button}
                  endIcon={<ImportExportOutlinedIcon />}
                >
                  STOK
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  className={classes.button}
                  endIcon={<ImportExportOutlinedIcon />}
                >
                  AKTIF
                </Button>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {view === "semua produk"
              ? produk.map((row) => <ProdukCard row={row} />)
              : view === "aktif"
              ? aktif.map((row) => <ProdukCard row={row} />)
              : tidakAktif.map((row) => <ProdukCard row={row} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
