import React, { useContext, useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  Paper,
} from "@material-ui/core";

import Swal from "sweetalert2";

import useStyles from "./styles";

import { CMSContext } from "../../../context/state";
import { useHistory } from "react-router";


function Index({ location }) {
  const classes = useStyles();
  const history = useHistory();

  const { addMachine, editMachine, fetchProduk, produk, URL_SERVER } = useContext(CMSContext);
  const [input, setInput] = useState({
    noMachine: null,
    invoice: "",
    purchaseDate: "",
  });

  const handleInput = async (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const send = async () => {
    if (await !validate()) {
      let formData = {
        noMachine: input.noMachine,
        invoice: input.invoice,
        purchaseDate: input.purchaseDate,
      }

      if (location.state?.data) {
        let edit = await editMachine(
          location.state.data.noMachine,
          formData)

        if (edit === 'success') {
          Swal.fire({
            title: "Edit mesin berhasil",
            icon: "success",
          })
          history.push("/machine")
        }
      } else {
        let add = await addMachine(
          formData,
        );

        if (add === 'success') {
          Swal.fire({
            title: "Tambah mesin berhasil",
            icon: "success",
          })
          history.push("/machine")
        }
      }
    }
  };

  const validate = () => {
    let isError = false

    if (!input.noMachine) {
      Swal.fire({
        title: 'Nomor mesin belum terisi',
        icon: 'error'
      })
      isError = true
    } else if (!input.invoice) {
      Swal.fire({
        title: 'Invoice belum terisi',
        icon: 'error'
      })
      isError = true
    } else if (!input.purchaseDate) {
      Swal.fire({
        title: 'Tanggal pembelian belum terisi',
        icon: 'error'
      })
      isError = true
    }
    return isError
  }

  useEffect(() => {
    async function fetch() { }
    console.log(location.state?.data)
    if (location.state?.data) {
      setInput({
        ...input,
        noMachine: location.state.data.noMachine,
        invoice: location.state.data.invoice,
        purchaseDate: `${new Date(location.state.data.purchaseDate).getFullYear()}-${new Date(location.state.data.purchaseDate).getMonth() + 1 < 10 ? `0${new Date(location.state.data.purchaseDate).getMonth() + 1}` : new Date(location.state.data.purchaseDate).getMonth() + 1}-${new Date(location.state.data.purchaseDate).getDate() < 10 ? `0${new Date(location.state.data.purchaseDate).getDate()}` : new Date(location.state.data.purchaseDate).getDate()}`
      });
      console.log(`${new Date(location.state.data.purchaseDate).getFullYear()}-${new Date(location.state.data.purchaseDate).getMonth() + 1 < 10 ? `0${new Date(location.state.data.purchaseDate).getMonth() + 1}` : new Date(location.state.data.purchaseDate).getMonth() + 1}-${new Date(location.state.data.purchaseDate).getDate() < 10 ? `0${new Date(location.state.data.purchaseDate).getDate()}` : new Date(location.state.data.purchaseDate).getDate()} `)
    }
    fetch()
  }, [location.state]);

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
                Nomor Mesin
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                name="noMachine"
                value={input.noMachine}
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
                Invoice
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                name="invoice"
                value={input.invoice}
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
                Tanggal Pembelian
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                type="date"
                name="purchaseDate"
                value={input.purchaseDate}
                onChange={handleInput}
              />
            </Grid>
          </Grid>

        </Paper>
      </Grid>
      <Grid item xs={12} className={classes.button}>
        <Button variant="outlined" onClick={() => history.push("/voucher")}>
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
