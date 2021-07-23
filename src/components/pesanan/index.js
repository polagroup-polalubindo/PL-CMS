import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  MenuItem,
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import useStyles from "./styles";

import { CMSContext } from "../../context/state";

import PenjualanCard from "./penjualanCard";
import LabelPengiriman from '../LabelPengiriman';
import Invoice from '../Invoice';

export default function Index() {
  const classes = useStyles();
  let { transaksi, fetchTransaksi, proses } = useContext(CMSContext);
  const pesananDitolak = transaksi.filter(
    (el) => el.statusPesanan === "pesanan di tolak"
  );
  transaksi = transaksi.filter((el) => el.statusPembayaran === "verified");
  const pesananBaru = transaksi.filter(
    (el) =>
      el.statusPesanan === "menunggu konfirmasi" ||
      ("menunggu pembayaran" &&
        el.statusPengiriman !== "siap di kirim" &&
        el.statusPengiriman !== "dalam pengiriman" &&
        el.statusPengiriman !== "pesanan selesai" &&
        el.statusPesanan === "pesanan di tolak")
  );
  const siapDikirim = transaksi.filter(
    (el) => el.statusPengiriman === "siap di kirim"
  );
  const dalamPengiriman = transaksi.filter(
    (el) => el.statusPengiriman === "dalam pengiriman"
  );
  const pesananSelesai = transaksi.filter(
    (el) => el.statusPengiriman === "pesanan selesai"
  );
  const [dataSelected, setDataSelected] = useState([])
  const [statusCheckAll, setStatusCheckAll] = useState(false)
  const [checked, setChecked] = useState(false)
  const [Counter, setCounter] = useState(0)

  useEffect(() => {
    fetchTransaksi();
  }, []);

  const [filter, setFilter] = React.useState("");

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  // const [pilih, setPilih] = React.useState({
  //   checkedA: true,
  //   checkedB: true,
  //   checkedF: true,
  //   checkedG: true,
  // });

  // const handlePilih = (event) => {
  //   setPilih({ ...pilih, [event.target.name]: event.target.checked });
  // };

  // const RedCheckbox = () => (
  //   <Checkbox color="default" className={classes.checkbox} />
  // );

  const views = [
    { value: "semua pesanan" },
    { value: "pesanan baru" },
    { value: "siap dikirim" },
    { value: "dalam pengiriman" },
    { value: "pesanan selesai" },
    { value: "pesanan ditolak" },
  ];
  const [view, setView] = React.useState("semua pesanan");

  const handleSelectedPesanan = async (flag, data) => {
    if (flag === "add") {
      await setDataSelected([...dataSelected, data])
    } else {
      let newDataSelected = await dataSelected.filter(el => el.id !== data.id)
      await setDataSelected(newDataSelected)
    }
  }

  useEffect(() => {
    let selectAll = false;

    if (transaksi.length > 0) {
      if (view === "pesanan baru") {
        if (pesananBaru.length === dataSelected.length) selectAll = true
        else selectAll = false
      } else if (view === "siap dikirim") {
        if (siapDikirim.length === dataSelected.length) selectAll = true
        else selectAll = false
      } else if (view === "dalam pengiriman") {
        if (dalamPengiriman.length === dataSelected.length) selectAll = true
        else selectAll = false
      } else if (view === "pesanan selesai") {
        if (pesananSelesai.length === dataSelected.length) selectAll = true
        else selectAll = false
      } else if (view === "pesanan ditolak") {
        if (pesananDitolak.length === dataSelected.length) selectAll = true
        else selectAll = false
      } else {
        if (transaksi.length === dataSelected.length) selectAll = true
        else selectAll = false
      }

      if (selectAll) {
        // setStatusCheckAll(true)
        setChecked(true)
      } else {
        setChecked(false)
      }
    }
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

  return (
    <>
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
          className={classes.form_daftar_btn}
        >
          <b>{option.value}</b>
        </Button>
      ))}
      <form className={classes.form_kategori} noValidate autoComplete="off">
        <TextField
          variant="outlined"
          size="small"
          label="Cari nama, produk, nomor resi, invoice"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          variant="outlined"
          size="small"
          select
          value={filter}
          onChange={handleFilter}
          label="pilih filter"
          style={{ width: 120 }}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </TextField>
        <TextField
          id="date"
          type="date"
          defaultValue="2017-05-24"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          size="small"
        />
        <Button variant="outlined" disableElevation className={classes.button}>
          unduh laporan penjualan
        </Button>
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

      {!proses && (view === "pesanan baru"
        ? pesananBaru && pesananBaru.length > 0 && pesananBaru.map((item) => <PenjualanCard item={item} statusCheckAll={statusCheckAll} handleSelectedPesanan={handleSelectedPesanan} />)
        : view === "siap dikirim"
          ? siapDikirim && siapDikirim.length > 0 && siapDikirim.map((item) => <PenjualanCard item={item} statusCheckAll={statusCheckAll} handleSelectedPesanan={handleSelectedPesanan} />)
          : view === "dalam pengiriman"
            ? dalamPengiriman && dalamPengiriman.length > 0 && dalamPengiriman.map((item) => <PenjualanCard item={item} statusCheckAll={statusCheckAll} handleSelectedPesanan={handleSelectedPesanan} />)
            : view === "pesanan selesai"
              ? pesananSelesai && pesananSelesai.length > 0 && pesananSelesai.map((item) => <PenjualanCard item={item} statusCheckAll={statusCheckAll} handleSelectedPesanan={handleSelectedPesanan} />)
              : view === "pesanan ditolak"
                ? pesananDitolak && pesananDitolak.length > 0 && pesananDitolak.map((item) => <PenjualanCard item={item} statusCheckAll={statusCheckAll} handleSelectedPesanan={handleSelectedPesanan} />)
                : transaksi && transaksi.length > 0 && transaksi.map((item) => <PenjualanCard item={item} statusCheckAll={statusCheckAll} handleSelectedPesanan={handleSelectedPesanan} />))}

      <Grid style={{ display: 'flex', justifyContent: 'center' }}>
        {
          proses
            ? <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 80, height: 80 }}>
              <CircularProgress style={{ width: 50, height: 50 }} />
            </Grid>
            : (
              ((view === "pesanan baru" && pesananBaru.length === 0) ||
                (view === "siap dikirim" && siapDikirim.length === 0) ||
                (view === "dalam pengiriman" && dalamPengiriman.length === 0) ||
                (view === "pesanan selesai" && pesananSelesai.length === 0) ||
                (view === "pesanan ditolak" && pesananDitolak.length === 0) ||
                transaksi.length === 0) &&
              <p>Tidak ada data</p>)
        }
      </Grid>
    </>
  );
}
