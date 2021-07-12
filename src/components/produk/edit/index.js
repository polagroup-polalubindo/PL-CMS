import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  FormControlLabel,
  Switch,
  MenuItem,
  Button,
  FormControl,
  RadioGroup,
  Radio,
} from "@material-ui/core";

import useStyles from "./styles";

import { CMSContext } from "../../../context/state";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

function Index(props) {
  const classes = useStyles();
  const history = useHistory();
  const { brand, fetchBrand, tambahProduk } = useContext(CMSContext);
  const [file, setFile] = useState("/img/cms/photo-product-placeholder.png");
  const [image, setImage] = useState(null);

  const [weight, setWeight] = useState("gram");

  const [openUrlVideo, setOpenUrlVideo] = useState(true);
  const [openUrlTDS, setOpenUrlTDS] = useState(true);
  const [openUrlMSDS, setOpenUrlMSDS] = useState(true);
  const [openUrlSertifikasi, setOpenUrlSertifikasi] = useState(true);

  const [asuransiPengiriman, setAsuransiPengiriman] = useState("Wajib");
  const [layananPengiriman, setLayananPengiriman] = useState("Standar");

  const [openHargaGrosir, setHargaGrosir] = useState(true);

  const [input, setInput] = useState({
    fotoProduk: null,
    namaProduk: "",
    brandId: null,
    deskripsi: "",
    minPesanan: 1,
    hargaSatuan: 0,
    hargaGrosir: 0,
    statusProduk: false,
    stock: 0,
    sku: "",
    weight: 0,
    panjang: 0,
    lebar: 0,
    tinggi: 0,
    komisiStatus: false,
    komisiLevel1: 0,
    komisiLevel2: 0,
    komisiLevel3: 0,
    levelKomisi: 0,

    urlVideo: "",
    urlTDS: "",
    urlMSDS: "",
    urlSertifikasi: "",

    asuransiPengiriman: "Wajib",
    layananPengiriman: "Standar",

    preOrder: false,

    banyaknya: "",
    hargaSatuanGrosir: "",
  });

  useEffect(() => {
    fetchBrand();
  }, []);

  const weights = [
    {
      value: "gram",
    },
    {
      value: "kilogram",
    },
  ];

  const allAsuransiPengiriman = [
    {
      value: "Wajib",
    },
    {
      value: "Opsional",
    },
  ];

  const allLayananPengiriman = [
    {
      value: "Standar",
    },
    {
      value: "Custom",
    },
  ];

  const handleInput = (e) => {
    if (
      e.target.name !== "namaProduk" &&
      e.target.name !== "brandId" &&
      e.target.name !== "deskripsi" &&
      e.target.name !== "sku" &&
      e.target.name !== "urlVideo" &&
      e.target.name !== "urlTDS" &&
      e.target.name !== "urlMSDS" &&
      e.target.name !== "urlSertifikasi" &&
      e.target.name !== "banyaknya" &&
      e.target.name !== "hargaSatuanGrosir"
    ) {
      if (!isNaN(e.target.value)) {
        setInput({ ...input, [e.target.name]: e.target.value });
      }
    } else {
      setInput({ ...input, [e.target.name]: e.target.value });
    }
  };

  const handleChangeWeight = (event) => {
    setWeight(event.target.value);
  };

  const handleAsuransiPengiriman = (event) => {
    setAsuransiPengiriman(event.target.value);
  };

  const handleLayananPengiriman = (event) => {
    setLayananPengiriman(event.target.value);
  };

  const handleImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      let reader = new FileReader();
      reader.onload = (e) => {
        setFile(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Grid
      container
      spacing={3}
      direction="row"
      justify="flex-start"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Card className={classes.root} elevation={2}>
          <Grid container>
            <Grid item xs={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <b>Ganti Foto Produk</b>
                </Typography>
                <Typography variant="body2" component="p">
                  ukuran 700px x 700px
                </Typography>
              </CardContent>
            </Grid>
            <Grid item xs={9} className={classes.imgInput}>
              <label for="file-input">
                <img
                  src={file}
                  alt="Placeholder"
                  id="img"
                  className={classes.imgTag}
                />
              </label>
              <input
                id="file-input"
                type="file"
                accept=".jpg"
                onChange={handleImage}
                value={props.location.state.fotoProduk}
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card className={classes.root} elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <b>Informasi Produk</b>
            </Typography>
            <Grid container spacing={5} alignItems="flex-start">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Nama Produk
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  helperText={`${input.namaProduk?.length}/255`}
                  name="namaProduk"
                  onChange={handleInput}
                  value={props.location.state.namaProduk}
                />
              </Grid>
            </Grid>
            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Brand
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  size="small"
                  select
                  className={classes.brandWidth}
                  name="brandId"
                  onChange={handleInput}
                  value={props.location.state.brandId}
                  selec
                >
                  {brand &&
                    brand.length > 0 &&
                    brand.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.namaBrand}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card className={classes.root} elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <b>Detil Produk</b>
            </Typography>
            <Grid container spacing={5} alignItems="flex-start">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Deskripsi Produk
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  helperText={`${input.deskripsi?.length}/255`}
                  multiline
                  rows={10}
                  name="deskripsi"
                  onChange={handleInput}
                  value={props.location.state.deskripsi}
                />
              </Grid>
            </Grid>

            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Video Produk
                </Typography>
              </Grid>
              <Grid item xs={10}>
                {openUrlVideo ? (
                  <Button
                    variant="outlined"
                    color="transparent"
                    onClick={() => setOpenUrlVideo(false)}
                  >
                    + Tambah URL Video
                  </Button>
                ) : (
                  <>
                    <TextField
                      variant="outlined"
                      size="small"
                      fullWidth
                      name="urlVideo"
                      onChange={handleInput}
                    />
                    <br /> <br />
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => setOpenUrlVideo(true)}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>

            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  TDS Produk
                </Typography>
              </Grid>
              <Grid item xs={4}>
                {openUrlTDS ? (
                  <Button
                    variant="outlined"
                    color="transparent"
                    onClick={() => setOpenUrlTDS(false)}
                  >
                    + Tambah URL TDS
                  </Button>
                ) : (
                  <>
                    <TextField
                      variant="outlined"
                      size="small"
                      fullWidth
                      name="urlTDS"
                      onChange={handleInput}
                    />
                    <br /> <br />
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => setOpenUrlTDS(true)}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </Grid>
              <Grid item xs={2}>
                <Typography
                  align="right"
                  variant="body2"
                  component="p"
                  gutterBottom
                >
                  MSDS Produk
                </Typography>
              </Grid>
              <Grid item xs={4}>
                {openUrlMSDS ? (
                  <Button
                    variant="outlined"
                    color="transparent"
                    onClick={() => setOpenUrlMSDS(false)}
                  >
                    + Tambah URL MSDS
                  </Button>
                ) : (
                  <>
                    <TextField
                      variant="outlined"
                      size="small"
                      fullWidth
                      name="urlMSDS"
                      onChange={handleInput}
                    />
                    <br /> <br />
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => setOpenUrlMSDS(true)}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>

            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Sertifikasi
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  size="small"
                  helperText={
                    <Typography
                      variant="body2"
                      component="p"
                      gutterBottom
                      style={{ cursor: "pointer" }}
                    >
                      + Tambah Sertifikasi Baru
                    </Typography>
                  }
                />
                &emsp; &emsp;
                {openUrlSertifikasi === true ? (
                  <Button
                    variant="outlined"
                    color="transparent"
                    onClick={() => setOpenUrlSertifikasi(false)}
                  >
                    + Tambah URL Sertifikasi
                  </Button>
                ) : (
                  <>
                    <TextField
                      variant="outlined"
                      size="small"
                      name="urlSertifikasi"
                      onChange={handleInput}
                    />
                    &emsp; &emsp;
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => setOpenUrlSertifikasi(true)}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card className={classes.root} elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <b>Harga Produk</b>
            </Typography>
            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Minimum Pemesanan
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={props.location.state.minPesanan}
                  name="minPesanan"
                  onChange={handleInput}
                />
              </Grid>
            </Grid>

            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Harga Satuan
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        className={classes.inputAdornment}
                      >
                        <p className={classes.colorTextWhite}>Rp.</p>
                      </InputAdornment>
                    ),
                    style: {
                      paddingLeft: "0",
                    },
                  }}
                  name="hargaSatuan"
                  value={props.location.state.hargaSatuan}
                  onChange={handleInput}
                />
              </Grid>
            </Grid>

            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Diskon
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        className={classes.inputAdornment}
                      >
                        <p className={classes.colorTextWhite}>%</p>
                      </InputAdornment>
                    ),
                    style: {
                      paddingRight: "0",
                    },
                  }}
                  name="discount"
                  value={props.location.state.discount}
                  onChange={handleInput}
                />
              </Grid>
            </Grid>

            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Harga Grosir
                </Typography>
              </Grid>
              <Grid item xs={10}>
                {openHargaGrosir ? (
                  <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.buttonOutlined}
                    onClick={() => setHargaGrosir(false)}
                  >
                    + Tambah Grosir
                  </Button>
                ) : (
                  <>
                    <TextField
                      variant="outlined"
                      size="small"
                      name="banyaknya"
                      onChange={handleInput}
                      placeholder="Banyaknya"
                      helperText={
                        <Typography
                          variant="body2"
                          component="p"
                          gutterBottom
                          style={{ cursor: "pointer" }}
                        >
                          + Tambah Harga Grosir Baru
                        </Typography>
                      }
                    />
                    &emsp;
                    <TextField
                      variant="outlined"
                      size="small"
                      name="hargaSatuanGrosir"
                      onChange={handleInput}
                      placeholder="Harga Satuan"
                    />
                    &emsp;
                    <Button
                      variant="outlined"
                      color="secondary"
                      className={classes.buttonOutlined}
                      onClick={() => setHargaGrosir(true)}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card className={classes.root} elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <b>Pengelolaan Produk</b>
            </Typography>
            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Status Produk
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={props.location.state.statusProduk}
                      onChange={() =>
                        setInput({
                          ...input,
                          statusProduk: !input.statusProduk,
                        })
                      }
                      focusVisibleClassName={classes.focusVisible}
                      disableRipple
                      classes={{
                        root: classes.switch,
                        switchBase: classes.switchBase,
                        thumb: classes.thumb,
                        track: classes.track,
                        checked: classes.checked,
                      }}
                    />
                  }
                  label="Aktif"
                />
              </Grid>
            </Grid>

            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Stok Produk
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="stock"
                  value={props.location.state.stock}
                  onChange={handleInput}
                />
              </Grid>
            </Grid>

            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  SKU
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="sku"
                  onChange={handleInput}
                  value={props.location.state.sku}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card className={classes.root} elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <b>Berat & Pengiriman</b>
            </Typography>
            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Berat Produk
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  select
                  value={weight}
                  onChange={handleChangeWeight}
                >
                  {weights.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="weight"
                  value={props.location.state.weight}
                  onChange={handleInput}
                />
              </Grid>
            </Grid>

            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Ukuran
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Panjang"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        className={classes.inputAdornment}
                      >
                        <p className={classes.colorTextWhite}>cm</p>
                      </InputAdornment>
                    ),
                    style: {
                      paddingRight: "0",
                    },
                  }}
                  name="panjang"
                  value={props.location.state.panjang}
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Lebar"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        className={classes.inputAdornment}
                      >
                        <p className={classes.colorTextWhite}>cm</p>
                      </InputAdornment>
                    ),
                    style: {
                      paddingRight: "0",
                    },
                  }}
                  name="lebar"
                  value={props.location.state.lebar}
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Tinggi"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        className={classes.inputAdornment}
                      >
                        <p className={classes.colorTextWhite}>cm</p>
                      </InputAdornment>
                    ),
                    style: {
                      paddingRight: "0",
                    },
                  }}
                  name="tinggi"
                  value={props.location.state.tinggi}
                  onChange={handleInput}
                />
              </Grid>
            </Grid>

            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Asuransi Pengiriman
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    defaultValue={asuransiPengiriman}
                    value={asuransiPengiriman}
                    onChange={handleAsuransiPengiriman}
                  >
                    {allAsuransiPengiriman.map((option) => (
                      <FormControlLabel
                        control={
                          <Radio
                            classes={{
                              root: classes.checkbox,
                              checked: classes.checkedBox,
                            }}
                          />
                        }
                        key={option.value}
                        label={option.value}
                        value={option.value}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Layanan Pengiriman
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    defaultValue={layananPengiriman}
                    value={layananPengiriman}
                    onChange={handleLayananPengiriman}
                  >
                    {allLayananPengiriman.map((option) => (
                      <FormControlLabel
                        control={
                          <Radio
                            classes={{
                              root: classes.checkbox,
                              checked: classes.checkedBox,
                            }}
                          />
                        }
                        key={option.value}
                        label={option.value}
                        value={option.value}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Preorder
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={input.preOrder}
                      onChange={() =>
                        setInput({
                          ...input,
                          preOrder: !input.preOrder,
                        })
                      }
                      focusVisibleClassName={classes.focusVisible}
                      disableRipple
                      classes={{
                        root: classes.switch,
                        switchBase: classes.switchBase,
                        thumb: classes.thumb,
                        track: classes.track,
                        checked: classes.checked,
                      }}
                    />
                  }
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card className={classes.root} elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <b>Komisi</b>
            </Typography>
            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Status
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={props.location.state.komisiStatus}
                      onChange={() =>
                        setInput({
                          ...input,
                          komisiStatus: !input.komisiStatus,
                        })
                      }
                      focusVisibleClassName={classes.focusVisible}
                      disableRipple
                      classes={{
                        root: classes.switch,
                        switchBase: classes.switchBase,
                        thumb: classes.thumb,
                        track: classes.track,
                        checked: classes.checked,
                      }}
                    />
                  }
                  label="Aktif"
                />
              </Grid>
            </Grid>

            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Berlaku Sebesar
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  variant="outlined"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        className={classes.inputAdornment}
                      >
                        <p className={classes.colorTextWhite}>%</p>
                      </InputAdornment>
                    ),
                    style: {
                      paddingRight: "0",
                    },
                  }}
                  name="komisiLevel1"
                  value={props.location.state.komisi}
                  onChange={handleInput}
                  fullWidth
                />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2" component="p" gutterBottom>
                  Nama Level Komisi&emsp;&emsp;Level 1
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Berlaku Sebesar
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  variant="outlined"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        className={classes.inputAdornment}
                      >
                        <p className={classes.colorTextWhite}>%</p>
                      </InputAdornment>
                    ),
                    style: {
                      paddingRight: "0",
                    },
                  }}
                  name="komisiLevel2"
                  value={input.komisiLevel2}
                  onChange={handleInput}
                  fullWidth
                />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2" component="p" gutterBottom>
                  Nama Level Komisi&emsp;&emsp;Level 2
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2}>
                <Typography variant="body2" component="p" gutterBottom>
                  Berlaku Sebesar
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  variant="outlined"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        className={classes.inputAdornment}
                      >
                        <p className={classes.colorTextWhite}>%</p>
                      </InputAdornment>
                    ),
                    style: {
                      paddingRight: "0",
                    },
                  }}
                  name="komisiLevel3"
                  value={input.komisiLevel3}
                  onChange={handleInput}
                  fullWidth
                />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2" component="p" gutterBottom>
                  Nama Level Komisi&emsp;&emsp;Level 3
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} className={classes.buttonGroup}>
        <Button variant="outlined" onClick={() => history.push("/produk")}>
          Batal
        </Button>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          className={classes.buttonContained}
        >
          Simpan
        </Button>
      </Grid>
    </Grid>
  );
}

export default Index;
