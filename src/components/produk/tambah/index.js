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

function Index() {
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
  const [newSertifikasi, setNewSertifikasi] = useState([]);

  const [asuransiPengiriman, setAsuransiPengiriman] = useState("Wajib");
  const [layananPengiriman, setLayananPengiriman] = useState("Standar");

  const [openHargaGrosir, setOpenHargaGrosir] = useState(true);
  const [newHargaGrosir, setNewHargaGrosir] = useState([]);

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

  const send = async (e) => {
    if (image === null) {
      Swal.fire({
        title: "photo belum di upload",
        icon: "error",
      });
    } else if (input.sku === "" || input.sku === null) {
      Swal.fire({
        title: "data belum lengkap",
        icon: "error",
      });
    } else if (input.deskripsi.length > 255) {
      Swal.fire({
        title: "deskripsi produk max 255 character",
        icon: "error",
      });
    } else {
      const data = new FormData();
      data.append("data", JSON.stringify(input, null, 2));
      data.append("file", image);

      try {
        await tambahProduk(data);
        Swal.fire({
          title: "Tambah produk berhasil",
          icon: "success",
        });
        history.push("/produk");
      } catch (err) {
        Swal.fire({
          title: "Silahkan coba lagi",
          icon: "error",
        });
      }
    }
  };

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
                  <b>Upload Foto Produk</b>
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
                    />{" "}
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
                    <br />
                    <br />
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
                    <br />
                    <br />
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
                <TextField variant="outlined" size="small" />
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

            <Grid container spacing={5} alignItems="center">
              <Grid item xs={2} />
              <Grid item xs={10}>
                <Typography
                  variant="body2"
                  component="p"
                  gutterBottom
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setNewSertifikasi([...newSertifikasi, newSertifikasi])
                  }
                >
                  + Tambah Sertifikasi Baru
                </Typography>
                {newSertifikasi.map((id) => (
                  <div key={id}>
                    <TextField variant="outlined" size="small" />
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
                    &emsp; &emsp;
                    <Button variant="outlined" color="secondary">
                      Hapus Baris
                    </Button>
                    <br />
                    <br />
                  </div>
                ))}
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
                  value={input.minPesanan}
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
                  value={input.hargaSatuan}
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
                  value={input.discount}
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
                    onClick={() => setOpenHargaGrosir(false)}
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
                      onClick={() => setOpenHargaGrosir(true)}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>

            {openHargaGrosir === false && (
              <Grid container spacing={5} alignItems="center">
                <Grid item xs={2} />
                <Grid item xs={10}>
                  <Typography
                    variant="body2"
                    component="p"
                    gutterBottom
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      setNewHargaGrosir([...newHargaGrosir, newHargaGrosir])
                    }
                  >
                    + Tambah Harga Grosir Baru
                  </Typography>
                  {newHargaGrosir.map((i) => (
                    <>
                      <TextField
                        variant="outlined"
                        size="small"
                        name="banyaknya"
                        onChange={handleInput}
                        placeholder="Banyaknya"
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
                        onClick={() => setOpenHargaGrosir(true)}
                      >
                        Cancel
                      </Button>
                      &emsp;
                      <Button
                        variant="outlined"
                        color="secondary"
                        className={classes.buttonOutlined}
                        onClick={() => setNewHargaGrosir(newHargaGrosir - 1)}
                      >
                        Hapus Baris
                      </Button>
                      <br />
                      <br />
                    </>
                  ))}
                </Grid>
              </Grid>
            )}
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
                      checked={input.statusProduk}
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
                  value={input.stock}
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
                  value={input.weight}
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
                  value={input.panjang}
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
                  value={input.lebar}
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
                  value={input.tinggi}
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
                      checked={input.komisiStatus}
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
                  value={input.komisiLevel1}
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
          onClick={send}
        >
          Simpan
        </Button>
      </Grid>
    </Grid>
  );
}

export default Index;
