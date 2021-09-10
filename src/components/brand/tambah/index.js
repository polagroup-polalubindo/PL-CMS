import React, { useContext, useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Paper,
  Radio,
  InputAdornment,
  RadioGroup,
  Switch
} from "@material-ui/core";

import Swal from "sweetalert2";

// import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

import useStyles from "./styles";
import moment from 'moment';
import SeCreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';

import { CMSContext } from "../../../context/state";
import { useHistory } from "react-router";

const animatedComponents = makeAnimated();

function Index({ location }) {
  const classes = useStyles();
  const history = useHistory();

  const { addBrand, editBrand, URL_SERVER } = useContext(CMSContext);
  const [input, setInput] = useState({
    brandId: null,
    name: "",
  });

  const [file, setFile] = useState("/img/cms/photo-product-placeholder.png");
  const [image, setImage] = useState(null);

  const handleInput = async (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    async function fetch() { }
    if (location.state?.data) {
      setInput({
        ...input,
        brandId: location.state.data.id,
        name: location.state.data.namaBrand,
      });

      if(location.state.data.fotoBrand){
        setFile(`${URL_SERVER}/${location.state.data.fotoBrand}`)
      }
    }
    fetch()
  }, [location.state]);


  const send = async () => {
    let formData = new FormData();
    if (await !validate()) {
      formData.append('namaBrand', input.name)
      if (image) formData.append('logo', image)

      if (location.state?.data) {
        let edit = await editBrand(
          location.state.data.id,
          formData)

        if (edit === 'success') {
          Swal.fire({
            title: "Edit brand berhasil",
            icon: "success",
          })
          history.push("/brand")
        }
      } else {
        let add = await addBrand(
          formData,
        );

        if (add === 'success') {
          Swal.fire({
            title: "Tambah brand berhasil",
            icon: "success",
          })
          history.push("/brand")
        }
      }
    }
  };

  const validate = () => {
    let isError = false

    if (!input.name) {
      Swal.fire({
        title: 'Nama brand belum terisi',
        icon: 'error'
      })
      isError = true
    } else if (!File) {
      Swal.fire({
        title: 'Logo belum terisi',
        icon: 'error'
      })
      isError = true
    } 
    return isError
  }

  const handleFile = (name, index) => async (e) => {
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
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.root} elevation={2}>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={2}>
              <Typography variant="body2" component="p">
                Nama Brand
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                name="name"
                value={input.name}
                onChange={handleInput}
              />
            </Grid>
          </Grid>

          <Grid
            container
            spacing={3}
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={2}>
              <Typography variant="body2" component="p">
                Logo Brand
              </Typography>
              <i style={{ margin: 0, fontSize: 12 }}>*ukuran 100px x 100px</i>
            </Grid>
            {input.brandId ? (
              <Grid item xs={10} className={classes.imgInput}>
                <label for="file-input" style={{ cursor: "pointer" }}>
                  <img
                    src={file}
                    alt="image"
                    id="img"
                    className={classes.imgTag}
                  />
                  <p
                    // className={classes.imgTag}
                    style={{
                      textAlign: "center",
                      marginTop: 0,
                      marginBottom: 0,
                      width: 100,
                    }}
                  >
                    Change foto
                  </p>
                </label>

                <input
                  id="file-input"
                  type="file"
                  accept=".jpg"
                  onChange={handleFile("image")}
                />
              </Grid>
            ) : (
              <Grid item xs={10} className={classes.imgInput}>
                <label for="file-input">
                  <img
                    src={file}
                    alt="image"
                    id="img"
                    className={classes.imgTag}
                  />
                </label>

                <input
                  id="file-input"
                  type="file"
                  accept=".jpg"
                  onChange={handleFile("image")}
                />
              </Grid>
            )}
          </Grid>

        </Paper>
      </Grid>
      <Grid item xs={12} className={classes.button}>
        <Button variant="outlined" onClick={() => history.push("/brand")}>
          Batal
        </Button>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          className={classes.button_simpan}
          onClick={send}
        >
          Simpan
        </Button>
      </Grid>
    </Grid >
  );
}

export default Index;
