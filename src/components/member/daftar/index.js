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
  TextField,
  InputAdornment,
  Typography,
  CircularProgress,
  Grid,
  TablePagination,
} from "@material-ui/core";

import ImportExportOutlinedIcon from "@material-ui/icons/ImportExportOutlined";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./styles";

import MemberCard from "../memberCard";
import { useHistory } from "react-router";

import Download from "./export";

export default function Index() {
  const classes = useStyles();
  const history = useHistory();

  const { fetchMember, member, proses, totalMember } = useContext(CMSContext);
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    fetchData(rowsPerPage, page, keyword)
  }, []);

  const fetchData = async (limit, page, keyword) => {
    let query = `?limit=${limit}&page=${page}`
    if (keyword !== null) query += `&keyword=${keyword}`

    await fetchMember(query);
  }

  const handleChangeKeyword = (event) => {
    setKeyword(event.target.value)
    setPage(0)
    fetchData(rowsPerPage, 0, event.target.value)
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
        value={keyword}
        onChange={handleChangeKeyword}
      />

      <br />
      <br />

      <div>
        <Button
          variant="contained"
          disableElevation
          color="secondary"
          onClick={() => history.push("/member/tambah")}
        >
          + Tambah Member
        </Button>
        <Download keyword={keyword}/>
        <Typography style={{ textAlign: "right" }}>
          jumlah member: {totalMember}
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
            {!proses && member && member.length > 0 && member.map((row) => (
              <MemberCard row={row} />
            ))}
          </TableBody>
        </Table>
        <Grid style={{ display: 'flex', justifyContent: 'center' }}>
          {
            proses
              ? <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 80, height: 80 }}>
                <CircularProgress style={{ width: 50, height: 50 }} />
              </Grid>
              : member.length === 0 &&
              <p>Tidak ada data member</p>
          }
        </Grid>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={totalMember}
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
