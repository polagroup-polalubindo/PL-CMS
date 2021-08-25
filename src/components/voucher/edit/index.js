import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Paper,
  Radio,
  InputAdornment,
} from "@material-ui/core";

import Swal from "sweetalert2";

// import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

import useStyles from "./styles";

import { CMSContext } from "../../../context/state";
import { useHistory } from "react-router";

function Index(props) {
  const classes = useStyles();
  const history = useHistory();

  const { addVoucher } = useContext(CMSContext);
  const [input, setInput] = useState({
    code: "",
  });
  const handleInput = async (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setInput({ code: props.location.state.code });
  }, []);

  const send = async () => {
    const response = await addVoucher(input);
    if (response.message === "success") {
      history.push("/voucher");
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
                Kode Voucher
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                name="code"
                value={input.code}
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
        <Button variant="outlined">Simpan & Tambah Baru</Button>
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
    </Grid>
  );
}

export default Index;
