import React, { useContext, useEffect } from "react";
import {
  Button,
  InputAdornment,
  MenuItem,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import useStyles from "./styles";

import { CMSContext } from "../../context/state";

import PenjualanCard from "./penjualanCard";

export default function Index() {
  const classes = useStyles();
  const { transaksi, fetchTransaksi } = useContext(CMSContext);
  const pesananBaru = transaksi.filter(
    (el) => el.statusPesanan === "menunggu konfirmasi"
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
  const pesananDitolak = transaksi.filter(
    (el) => el.statusPesanan === "pesanan di tolak"
  );
  console.log(transaksi);

  useEffect(() => {
    fetchTransaksi();
  }, []);

  const [filter, setFilter] = React.useState("");

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const [pilih, setPilih] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handlePilih = (event) => {
    setPilih({ ...pilih, [event.target.name]: event.target.checked });
  };

  const RedCheckbox = () => (
    <Checkbox color="default" className={classes.checkbox} />
  );

  const views = [
    { value: "semua pesanan" },
    { value: "pesanan baru" },
    { value: "siap dikirim" },
    { value: "dalam pengiriman" },
    { value: "pesanan selesai" },
    { value: "pesanan ditolak" },
  ];
  const [view, setView] = React.useState("semua pesanan");
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

      <form className={classes.form_daftar} noValidate autoComplete="off">
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
      </form>

      {view === "pesanan baru"
        ? pesananBaru.map((item) => <PenjualanCard item={item} />)
        : view === "siap dikirim"
        ? siapDikirim.map((item) => <PenjualanCard item={item} />)
        : view === "dalam pengiriman"
        ? dalamPengiriman.map((item) => <PenjualanCard item={item} />)
        : view === "pesanan selesai"
        ? pesananSelesai.map((item) => <PenjualanCard item={item} />)
        : view === "pesanan ditolak"
        ? pesananDitolak.map((item) => <PenjualanCard item={item} />)
        : transaksi.map((item) => <PenjualanCard item={item} />)}
    </>
  );
}
