import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  MenuItem,
  TextField,
  Grid,
  CircularProgress,
  TablePagination,
} from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import useStyles from "./styles";

import { CMSContext } from "../../context/state";

import PenjualanCard from "./penjualanCard";
import LabelPengiriman from '../LabelPengiriman';
import Invoice from '../Invoice';
import Download from './export';

export default function Index() {
  const classes = useStyles();
  let { transaksi, fetchTransaksi, proses, totalTransaksi } = useContext(CMSContext);
  const [status, setStatus] = useState('semua pesanan')

  const [dataSelected, setDataSelected] = useState([])
  const [statusCheckAll, setStatusCheckAll] = useState(false)
  const [checked, setChecked] = useState(false)

  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const [keyword, setKeyword] = useState('')
  const [dateSelected, setDateSelected] = useState(`${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}`)

  const [range, setRange] = useState('bulan');

  const views = [
    { value: "semua pesanan" },
    { value: "pesanan baru" },
    { value: "siap di kirim" },
    { value: "dalam pengiriman" },
    { value: "pesanan selesai" },
    { value: "pesanan di tolak" },
  ];

  const handleSelectedPesanan = async (flag, data) => {
    if (flag === "add") {
      await setDataSelected([...dataSelected, data])
    } else {
      let newDataSelected = await dataSelected.filter(el => el.id !== data.id)
      await setDataSelected(newDataSelected)
    }
  }

  useEffect(() => {
    fetchData(rowsPerPage, page, keyword, status, range, dateSelected);
  }, []);

  useEffect(() => {
    let selectAll = false;

    if (transaksi.length > 0) {
      if (transaksi.length === dataSelected.length) selectAll = true
      else selectAll = false
    }

    if (selectAll) setChecked(true)
    else setChecked(false)
  }, [dataSelected])

  const handleCheck = (e) => {
    setChecked(e.target.checked)
    // setStatusCheckAll(e.target.checked)

    if (!e.target.checked) setDataSelected([])
    // else {
    //   if (view === "pesanan baru") {
    //     setDataSelected(pesananBaru)
    //   } else if (view === "siap dikirim") {
    //     setDataSelected(siapDikirim)
    //   } else if (view === "dalam pengiriman") {
    //     setDataSelected(dalamPengiriman)
    //   } else if (view === "pesanan selesai") {
    //     setDataSelected(pesananSelesai)
    //   } else if (view === "pesanan ditolak") {
    //     setDataSelected(pesananDitolak)
    //   } else {
    //     setDataSelected(transaksi)
    //   }
    // }
  }

  const fetchData = (limit, page, keyword, status, range, date) => {
    let query = `?limit=${limit}&page=${page}&keyword=${keyword}&range=${range}&date=${date}&status=verified`
    if (status !== 'semua pesanan') {
      if (status === "pesanan di tolak") {
        query += `&statusPesanan=${status}`
      } else if (status === "pesanan baru") {
        query += `&statusPesanan=menunggu konfirmasi`
      } else {
        query += `&statusPengiriman=${status}`
      }
    }

    fetchTransaksi(query);
  }

  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value)
    setPage(0)
    fetchData(rowsPerPage, 0, e.target.value, status, range, dateSelected)
  }

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value)
    setPage(0)
    fetchData(e.target.value, 0, keyword, status, range, dateSelected)
  }

  const handleChangePage = (e, newPage) => {
    setPage(newPage)
    fetchData(rowsPerPage, newPage, keyword, status, range, dateSelected)
  }

  const handleChangeStatus = (args) => {
    setStatus(args)
    setPage(0)
    fetchData(rowsPerPage, 0, keyword, args, range, dateSelected)
  }

  const handleChangeRange = (event) => {
    setRange(event.target.value);
    setPage(0)
    fetchData(rowsPerPage, 0, keyword, status, event.target.value, dateSelected)
  }

  const handleChangeDate = (date) => {
    setDateSelected(date)
    setPage(0)
    fetchData(rowsPerPage, 0, keyword, status, range, date)
  }

  return (
    <>
      {views.map((option) => (
        <Button
          key={option.value}
          onClick={() => handleChangeStatus(option.value)}
          style={{
            borderBottom:
              status === option.value ? "2px solid red" : "2px solid black",
            borderRadius: 0,
            color: status === option.value ? "red" : null,
          }}
          className={classes.form_daftar_btn}
        >
          <b>{option.value}</b>
        </Button>
      ))}
      <form className={classes.form_kategori} noValidate autoComplete="off" style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          variant="outlined"
          size="small"
          label="Cari nama member, nomor resi, invoice"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleChangeKeyword}
        />
        <TextField
          id="date"
          type="date"
          defaultValue={`${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}`}
          // defaultValue="2021-08-08"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          size="small"
          onChange={(e) => handleChangeDate(e.target.value)}
          value={dateSelected}
        />
        <TextField
          variant="outlined"
          size="small"
          select
          value={range}
          onChange={handleChangeRange}
          label="data per-"
          style={{ width: 120 }}
        >
          <MenuItem value='hari'>Hari</MenuItem>
          <MenuItem value='minggu'>Minggu</MenuItem>
          <MenuItem value='bulan'>Bulan</MenuItem>
          <MenuItem value='tahun'>Tahun</MenuItem>
        </TextField>


        <Download keyword={keyword} status={status} range={range} date={dateSelected} />
        {/* <Button variant="outlined" disableElevation className={classes.button}>
          unduh laporan penjualan
        </Button> */}
      </form>

      {/* <form className={classes.form_daftar} noValidate autoComplete="off">
        <FormControlLabel
          control={
            <RedCheckbox
              checked={pilih.checkedA}
              onChange={handlePilih}
              name="checkedA"
            />
          }
          label="1 pesanan terpilih"
        />

        <Button variant="outlined" className={classes.form_daftar_btn}>
          cetak resi
        </Button>
        <Button variant="outlined" className={classes.form_daftar_btn}>
          cetak label
        </Button>
      </form> */}

      <Grid style={{ padding: '10px 24px', display: 'flex', alignItems: 'center' }}>
        {/* <FormControlLabel
          control={<Checkbox
            name="checked"
            checked={checked}
            onChange={handleCheck}
            disabled />}
          label={`Pilih semua ${dataSelected.length > 0 ? `(${dataSelected.length})` : ''}`}
          style={{ marginRight: 20 }}
        /> */}
        <b style={{ marginRight: 20, fontSize: 17 }}>{dataSelected.length} Data yang dipilih</b>
        <Grid style={{ marginRight: 20 }}>
          <Invoice data={dataSelected} />
        </Grid>
        <LabelPengiriman data={dataSelected} />
      </Grid>

      {!proses && transaksi.map((item) => <PenjualanCard item={item} statusCheckAll={statusCheckAll} handleSelectedPesanan={handleSelectedPesanan} />)}

      <Grid style={{ display: 'flex', justifyContent: 'center' }}>
        {
          proses
            ? <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 80, height: 80 }}>
              <CircularProgress style={{ width: 50, height: 50 }} />
            </Grid>
            : (transaksi.length === 0 && <p>Tidak ada data</p>)
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
    </>
  );
}
