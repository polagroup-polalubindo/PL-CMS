import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid, InputAdornment, TextField } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    borderRadius: 20,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={3}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          <b>Harga Produk</b>
        </Typography>
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={2}>
            <Typography variant="body2" component="p" gutterBottom>
              Minimal Pemesanan
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField variant="outlined" size="small" fullWidth value="1" />
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
                  <InputAdornment position="start">Rp.</InputAdornment>
                ),
              }}
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
            <Button variant="outlined" color="secondary">
              + Tambah Grosir
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
