import React, { useContext, useEffect } from "react";
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
  TextField,
  InputAdornment,
  Typography,
} from "@material-ui/core";

import ImportExportOutlinedIcon from "@material-ui/icons/ImportExportOutlined";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./styles";

import MemberCard from "../memberCard";
import { useHistory } from "react-router";

export default function Index() {
  const classes = useStyles();
  const history = useHistory();

  const { fetchMember, member } = useContext(CMSContext);

  useEffect(() => {
    fetchMember();
  }, []);

  return (
    <>
      <TextField
        label="Cari nama, no hp, email"
        variant="outlined"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <br />
      <br />

      <div className={classes.option}>
        <Button
          variant="contained"
          disableElevation
          color="secondary"
          className={classes.button}
          onClick={() => history.push("/member/tambah")}
        >
          + Tambah Member
        </Button>
        <Button variant="outlined" disableElevation>
          unduh laporan penjualan
        </Button>
        <Typography style={{ textAlign: "right" }}>
          jumlah member: {member.length}
        </Typography>
      </div>

      <TableContainer
        component={Paper}
        elevation={2}
        className={classes.table_container}
      >
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Button endIcon={<ImportExportOutlinedIcon />}>Nama</Button>
              </TableCell>
              <TableCell>Tgl gabung</TableCell>
              <TableCell>Kontak</TableCell>
              <TableCell>Ktp</TableCell>
              <TableCell>NPWP</TableCell>
              <TableCell>Komisi</TableCell>
              <TableCell>Total Pembelian</TableCell>
              <TableCell>Status Premier</TableCell>
              {/* <TableCell>Level Komisi</TableCell> */}
              {/* <TableCell>Diskon</TableCell> */}
              <TableCell>Premiere</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {member && member.length > 0 && member.map((row) => (
              <MemberCard row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
