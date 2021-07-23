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
  FormControl,
  Select,
  MenuItem,
  Grid,
  InputLabel,
  CircularProgress
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./styles";

import { CMSContext } from "../../../context/state";

import DetailCard from "./KomisiDetailCard";
import Download from "./export";

const months = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
];

export default function Index(params) {
  const classes = useStyles();
  const { fetchAllKomisi, dataKomisi } = useContext(CMSContext);
  const [MonthOption, setMonthOption] = useState([])
  const [YearOption, setYearOption] = useState([])
  const [MonthSelected, setMonthSelected] = useState(new Date().getMonth() + 1)
  const [YearSelected, setYearSelected] = useState(new Date().getFullYear())
  const [Proses, setProses] = useState(true)
  const [Data, setData] = useState([])
  const [DataForDownload, setDataForDownload] = useState([])

  const labelValue = [
    {
      label: 'No.',
      value: 'no'
    }, {
      label: 'Penerima Komisi',
      value: 'userKomisi'
    }, {
      label: 'No NPWP',
      value: 'npwp'
    }, {
      label: 'No KTP',
      value: 'ktp'
    }, {
      label: 'No invoice',
      value: 'invoice'
    }, {
      label: 'Nama Cust',
      value: 'userCust'
    }, {
      label: 'Nilai belanja',
      value: 'totalBelanja'
    }, {
      label: 'Nilai komisi (10%)',
      value: 'komisi'
    }, {
      label: 'Pph NPWP',
      value: 'pphNpwp'
    }, {
      label: 'Pph Non NPWP',
      value: 'pphNoNpwp'
    }, {
      label: 'Setelah Pph',
      value: 'setelahPph'
    }, {
      label: 'Nama Bank',
      value: 'bank'
    }, {
      label: 'Rekening',
      value: 'noRek'
    }, {
      label: 'Keterangan',
      value: 'ket'
    }
  ]

  useEffect(() => {
    async function fetch() {
      setProses(true)
      await fetchAllKomisi({ month: MonthSelected, year: YearSelected });
      await fetchMonthOption();
      await fetchYearOption();
      setProses(false)
    }
    fetch()
  }, []);

  const [filter, setFilter] = React.useState("");
  const allFilter = [
    { value: "", label: "Semua" },
    { value: "Menunggu Transfer", label: "Menunggu Transfer" },
    { value: "Sudah Transfer", label: "Sudah Transfer" },
    { value: "Verified", label: "Verified" },
  ];

  const fetchMonthOption = () => {
    let newMonth = []
    for (let i = 0; i <= new Date().getMonth(); i++) {
      newMonth.push(i)
    }
    setMonthOption(newMonth)
  }

  const fetchYearOption = () => {
    let newYear = []
    for (let i = 2021; i <= new Date().getFullYear(); i++) {
      newYear.push(i)
    }
    setYearOption(newYear)
  }

  useEffect(() => {
    async function fetch() {
      setProses(true)
      await fetchAllKomisi({ month: MonthSelected, year: YearSelected });
      setProses(false)
    }
    fetch()
  }, [MonthSelected, setYearSelected])

  useEffect(() => {
    async function fetchData() {
      if (filter === '') {
        setData(dataKomisi)
        let data = [], counter = 1
        await dataKomisi.forEach(async (el) => {
          await el.TransaksiKomisis.forEach((element) => {
            let hasNPWP = true, pphNominal = 0;
            let komisi = Math.round((element.Transaksi?.totalHarga - element.Transaksi?.ongkosKirim) * 0.1)
            if (el.User?.noNPWP) pphNominal = Math.round(komisi * 0.5 * 0.05)
            else {
              pphNominal = Math.round(komisi * 0.5 * 0.06)
              hasNPWP = false
            }
            data.push({
              no: counter,
              userKomisi: el.User?.nama,
              npwp: el.User?.noNPWP || '-',
              ktp: el.User?.noKtp || '-',
              invoice: element.Transaksi?.invoice,
              userCust: element.User?.nama,
              totalBelanja: element.Transaksi?.totalHarga - element.Transaksi?.ongkosKirim,
              komisi: komisi,
              pphNpwp: hasNPWP ? pphNominal : '',
              pphNoNpwp: !hasNPWP ? pphNominal : '',
              setelahPph: komisi - pphNominal,
              bank: el.User?.bank,
              noRek: el.User?.noRekening,
              ket: el.status
            })
            counter++
          })
        })
        setDataForDownload(data)
      }
      else {
        let data = [], dataKomisiAfterFilter = await dataKomisi.filter(el => el.status === filter)
        setData(dataKomisiAfterFilter)
        await dataKomisi.forEach(el => {

        })
        setDataForDownload(data)
      }
    }
    fetchData()
  }, [filter, dataKomisi])

  const refresh = async () => {
    await fetchAllKomisi({ month: MonthSelected, year: YearSelected });
  }

  return (
    <>
      <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <TextField
          label="Cari transaksi"
          id="standard-start-adornment"
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
          style={{ minWidth: 300 }}
        />
        <Grid style={{ display: 'flex', alignItems: 'center' }}>
          <Download style={{ marginRight: 20 }} data={DataForDownload} labelValue={labelValue} month={months[MonthSelected - 1]} />
          <p style={{ fontSize: 17, margin: 0, marginRight: 10 }}>bulan</p>
          <FormControl size="small" >
            <Select
              variant="outlined"
              value={MonthSelected}
              style={{ width: 150, marginRight: 20 }}
              onChange={(e) => setMonthSelected(e.target.value)}>
              {
                MonthOption.map(month =>
                  <MenuItem value={month + 1}>{months[month]}</MenuItem>
                )
              }
            </Select>
          </FormControl>
          <p style={{ fontSize: 17, margin: 0, marginRight: 10 }}>tahun</p>
          <FormControl size="small">
            <Select
              variant="outlined"
              value={YearSelected}
              style={{ width: 100 }}
              onChange={(e) => setYearSelected(e.target.value)}>
              {
                YearOption.map(year =>
                  <MenuItem value={year}>{year}</MenuItem>
                )
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <br />
      <div className={classes.root}>
        {allFilter.map((option) => (
          <Chip
            key={option.value}
            label={option.label}
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
              <TableCell style={{ width: '5%' }} />
              <TableCell style={{ width: '10%' }}>ID Komisi</TableCell>
              <TableCell style={{ width: '35%' }}>Member</TableCell>
              <TableCell style={{ width: '25%' }}>Total Komisi</TableCell>
              <TableCell style={{ width: '25%' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ margin: "0.3rem" }}>

            {Proses
              ? <TableRow>
                <TableCell colSpan={5} style={{ textAlign: 'center' }}><CircularProgress /></TableCell>
              </TableRow>
              : Data.map((item) => (
                <DetailCard item={item} refresh={refresh} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
