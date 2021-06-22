import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";


import TambahProduk from "./components/produk/tambah";
import DaftarProduk from "./components/produk/daftar";

import TambahMember from "./components/member/tambah";
import DaftarMember from "./components/member/daftar";

import Penjualan from "./components/penjualan";

import TransaksiKomisi from "./components/transaksi/komisi";
import TransaksiPenjualan from "./components/transaksi/penjualan";

import Login from "./components/login";

import useStyles from "./styles";

function Routes() {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Switch>
        <Route path="/login" component={Login} />
        <AuthenticatedRoute path="/produk/tambah" component={TambahProduk} />
        <AuthenticatedRoute path="/produk" component={DaftarProduk} />
        <AuthenticatedRoute path="/penjualan" component={Penjualan} />
        <AuthenticatedRoute path="/member/tambah" component={TambahMember} />
        <AuthenticatedRoute path="/member" component={DaftarMember} />
        <AuthenticatedRoute path="/transaksi/komisi" component={TransaksiKomisi} />
        <AuthenticatedRoute path="/transaksi" component={TransaksiPenjualan} />
        <Redirect from="/" to="/login" />
      </Switch>
    </main>
  );
}

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("access_token_CMS") ? (
        <Component {...props} />
      ) : (
          <Redirect to={{
            pathname: "/",
            state: { from: props.location }
          }} />
        )
    }
  />
)

export default Routes;
