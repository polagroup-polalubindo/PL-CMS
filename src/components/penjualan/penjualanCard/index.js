import React, { useContext, useState } from "react";
import {
  Button,
  Paper,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import useStyles from "../styles";

import { CMSContext } from "../../../context/state";

const PenjualanCard = ({ item }) => {
  const { konfirmasiTransaksi, tolakPesanan, fetchTransaksi, inputResi } =
    useContext(CMSContext);
  const [openProduk, setOpenProduk] = useState(false);
  const [resi, setResi] = useState("");

  const handleKonfirmasi = async () => {
    item.statusPesanan = "pesanan di konfirmasi";
    item.statusPengiriman = "siap di kirim";
    const response = await konfirmasiTransaksi(item);
    if (response.message) {
      fetchTransaksi();
    }
  };

  const handleTolakPesanan = async () => {
    item.statusPesanan = "pesanan di tolak";
    item.statusPembayaran = "pesanan di tolak";
    item.statusPengiriman = "pesanan di tolak";
    const response = await tolakPesanan(item);
    if (response.message) {
      fetchTransaksi();
    }
  };

  const handleInputResi = async (e) => {
    if (e.key === "Enter") {
      //// console.log(resi);

      const response = await inputResi({
        noResi: resi,
        statusPengiriman: "dalam pengiriman",
        expiredAt: null,
        id: item.id,
      });
      if (response.message) fetchTransaksi();
    }
  };

  return (
    <>
      <Paper style={{ padding: "10px 24px" }}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={9}>
            <FormControlLabel
              control={<Checkbox name="checkedA" />}
              label={
                <>
                  <b>
                    {item.noResi === null
                      ? item.statusPesanan
                      : item.statusPengiriman}
                  </b>
                  <br />
                  <span style={{ color: "red" }}>{item.invoice}</span> /
                  {item.namaPenerima} {item.telfonPenerima} /{" "}
                  {item.createdAt.split("T")[0]} |{" "}
                  {item.createdAt.split("T")[1].split(".")[0]}
                </>
              }
            />
          </Grid>
          {/* <Grid item xs={3} style={{ textAlign: "right" }}>
            <Typography variant="body2">
              batas respons&ensp;
              <Button
                startIcon={<AccessTimeIcon />}
                variant="contained"
                disableElevation
                style={{ backgroundColor: "#e8d800", color: "white" }}
              >
                23 jam
              </Button>
            </Typography>
          </Grid> */}

          <hr style={{ width: "100%" }} />

          <Grid item xs={4} container>
            <Grid item xs={2}>
              <img
                src={item.Carts[0]?.Produk?.fotoProduk}
                alt={item.Carts[0]?.Produk?.namaProduk}
                width="50"
                height="50"
              />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body2">
                <b>{item.Carts[0]?.Produk?.namaProduk}</b>
                <br />
                {item.Carts[0]?.qty} x Rp {item.Carts[0]?.Produk?.hargaSatuan}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6} style={{ borderLeft: "1px solid" }}>
            <Typography variant="body2">
              <b>Alamat</b>
              <br />
              {item.namaPenerima} {item.telfonPenerima}
              <br />
              {item.alamatPengiriman}
            </Typography>
          </Grid>
          <Grid item xs={2} style={{ borderLeft: "1px solid" }}>
            <Typography variant="body2">
              Kurir JNE Reguler
              <br />
              Rp {item.ongkosKirim}
            </Typography>
          </Grid>

          {openProduk
            ? item.Carts && item.Carts.length > 0 && item.Carts.map((el) => (
                <Grid item xs={10} container>
                  <Grid item xs={2}>
                    <img
                      src={el.Produk?.fotoProduk}
                      alt={el.Produk?.namaProduk}
                      width="50"
                      height="50"
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="body2">
                      <b>{el.Produk?.namaProduk}</b>
                      <br />
                      {el.qty} x Rp {el.Produk?.hargaSatuan}
                    </Typography>
                  </Grid>
                </Grid>
              ))
            : null}

          <Grid item xs={10}>
            <Typography variant="body2">
              {item.Carts.length > 1 ? (
                <span>
                  +{item.Carts.length} produk lain{" "}
                  <a href="#" onClick={() => setOpenProduk(!openProduk)}>
                    {openProduk ? "close" : "lihat"}
                  </a>
                </span>
              ) : null}

              <br />
              <b>Total Bayar</b>
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography variant="body2">
              <br />
              <b>Rp {item.totalHarga}</b>
            </Typography>
          </Grid>

          <hr style={{ width: "100%" }} />

          <Grid item xs={8}>
            <Typography variant="body2"></Typography>
          </Grid>

          {item.statusPesanan === "menunggu konfirmasi" ? (
            <Grid
              item
              xs={4}
              style={{
                textAlign: "right",
              }}
            >
              <Button
                variant="outlined"
                style={{ color: "green", border: "1px solid green" }}
                onClick={handleTolakPesanan}
              >
                <b>tolak pesanan</b>
              </Button>
              &ensp;
              <Button
                variant="contained"
                disableElevation
                style={{ color: "white", backgroundColor: "green" }}
                onClick={handleKonfirmasi}
              >
                terima pesanan
              </Button>
            </Grid>
          ) : item.statusPesanan === "pesanan di konfirmasi" &&
            item.statusPengiriman === "siap di kirim" ? (
            <Grid
              item
              xs={4}
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              style={{ textAlign: "right" }}
            >
              <Grid item xs={4}>
                <Typography variant="body2">
                  <b>Nomor Resi</b>
                </Typography>
              </Grid>

              <Grid item xs={8}>
                <TextField
                  value={resi}
                  onChange={(e) => setResi(e.target.value)}
                  size="small"
                  variant="outlined"
                  onKeyDown={handleInputResi}
                />
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Paper>

      <br />
    </>
  );
};

export default PenjualanCard;
