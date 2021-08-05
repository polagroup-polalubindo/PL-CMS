import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  TextField,
  CardContent,
  Card,
  Typography,
  Button,
  Switch,
  withStyles,
  FormControlLabel,
} from "@material-ui/core";

import useStyles from "./styles";

import { CMSContext } from "../../../context/state";
import { useHistory } from "react-router";

function Index({ location }) {
  const classes = useStyles();
  const history = useHistory();
  const { tambahMember, ubahMember } = useContext(CMSContext);
  const [input, setInput] = useState({
    nama: null,
    phone: null,
    email: null,
    noKtp: null,
    noNPWP: null,
  });
  const [akunPremiere, setAkunPremiere] = React.useState({
    checked: true,
  });

  useEffect(() => {
    if (location.state?.data) {
      setInput({
        nama: location.state.data.nama,
        phone: location.state.data.phone,
        email: location.state.data.email,
        noKtp: location.state.data.noKtp,
        noNPWP: location.state.data.noNPWP,
      })
      setAkunPremiere({ checked: location.state.data.referralStatus })
    }
  }, [location.state])

  const send = async () => {
    let response, newData = {}
    if (location.state?.data) {
      if (input.nama !== location.state.data.nama) newData.nama = input.nama
      if (input.phone !== location.state.data.phone) newData.phone = input.phone
      if (input.email !== location.state.data.email) newData.email = input.email
      if (input.noKtp !== location.state.data.noKtp) newData.noKtp = input.noKtp
      if (input.noNPWP !== location.state.data.noNPWP) newData.noNPWP = input.noNPWP
      newData.referralStatus = akunPremiere
    } else {
      newData = { ...input, referralStatus: akunPremiere }
    }

    response = location.state?.data ? await ubahMember(location.state.data.id, newData) : await tambahMember(newData);
    if (response.message === "success") {
      history.push("/member");
    }
  };

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const IOSSwitch = withStyles((theme) => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      "&$checked": {
        transform: "translateX(16px)",
        color: theme.palette.common.white,
        "& + $track": {
          backgroundColor: "#52d869",
          opacity: 1,
          border: "none",
        },
      },
      "&$focusVisible $thumb": {
        color: "#52d869",
        border: "6px solid #fff",
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });

  const changeAkunPremiere = (event) => {
    setAkunPremiere({
      ...akunPremiere,
      [event.target.name]: event.target.checked,
    });
  };

  // ubahMember
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card className={classes.root} elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <b>{location.state?.data && 'Edit '}Biodata</b>
            </Typography>
            <Grid
              container
              spacing={3}
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Grid item xs={2}>
                <Typography variant="body2" component="p">
                  Nama
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="nama"
                  value={input.nama}
                  onChange={handleInput}
                />
              </Grid>

              <Grid item xs={2}>
                <Typography variant="body2" component="p">
                  No. Telepon
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="phone"
                  value={input.phone}
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={1}>
                <Typography variant="body2" component="p">
                  Email
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="email"
                  value={input.email}
                  onChange={handleInput}
                />
              </Grid>

              <Grid item xs={2}>
                <Typography variant="body2" component="p">
                  Nomor KTP
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="noKtp"
                  value={input.noKtp}
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={1}>
                <Typography variant="body2" component="p">
                  Nomor NPWP
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="noNPWP"
                  value={input.noNPWP}
                  onChange={handleInput}
                />
              </Grid>

              <Grid item xs={2}>
                <Typography variant="body2" component="p">
                  Akun Premiere
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <FormControlLabel
                  control={
                    <IOSSwitch
                      checked={akunPremiere.checked}
                      onChange={changeAkunPremiere}
                      name="checked"
                    />
                  }
                  label={
                    akunPremiere.checked === true ? "Aktif" : "Tidak Aktif"
                  }
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} className={classes.button}>
        <Button variant="outlined" onClick={() => history.push("/member")}>
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
    </Grid>
  );
}

export default Index;
