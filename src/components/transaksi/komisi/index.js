import React, { useContext, useEffect } from "react";

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
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./styles";

import { CMSContext } from "../../../context/state";

import DetailCard from "./KomisiDetailCard";

export default function Index(params) {
  const classes = useStyles();
  const { fetchTransaksiKomisi, transaksiKomisi } = useContext(CMSContext);
  //// console.log(transaksiKomisi);

  useEffect(() => {
    fetchTransaksiKomisi();
  }, []);

  const [filter, setFilter] = React.useState("penjualan");
  const allFilter = [
    { value: "semua komisi" },
    { value: "menunggu transfer" },
    { value: "sudah transfer" },
    { value: "verified" },
  ];

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
              <TableCell />
              <TableCell>ID Komisi</TableCell>
              <TableCell>Member</TableCell>
              <TableCell>Total Komisi</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ margin: "0.3rem" }}>
            {transaksiKomisi && transaksiKomisi.length > 0 && transaksiKomisi.map((item) => (
              <DetailCard item={item} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
