import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import TambahVoucher from "./components/voucher/tambah";
import DaftarVoucher from "./components/voucher/daftar";

import TambahProduk from "./components/produk/tambah";
import DaftarProduk from "./components/produk/daftar";

import TambahBrand from "./components/brand/tambah";
import DaftarBrand from "./components/brand/daftar";

import TambahMember from "./components/member/tambah";
import DaftarMember from "./components/member/daftar";

import Pesanan from "./components/pesanan";

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
        <AuthenticatedRoute path="/voucher/tambah" component={TambahVoucher} />
        <AuthenticatedRoute path="/voucher/:id" component={TambahVoucher} />
        <AuthenticatedRoute path="/voucher" component={DaftarVoucher} />
        <AuthenticatedRoute path="/produk/tambah" component={TambahProduk} />
        <AuthenticatedRoute path="/produk/:id" component={TambahProduk} />
        <AuthenticatedRoute path="/produk" component={DaftarProduk} />
        <AuthenticatedRoute path="/brand/tambah" component={TambahBrand} />
        <AuthenticatedRoute path="/brand/:id" component={TambahBrand} />
        <AuthenticatedRoute path="/brand" component={DaftarBrand} />
        <AuthenticatedRoute path="/pesanan" component={Pesanan} />
        <AuthenticatedRoute path="/member/tambah" component={TambahMember} />
        <AuthenticatedRoute path="/member/:id" component={TambahMember} />
        <AuthenticatedRoute path="/member" component={DaftarMember} />
        <AuthenticatedRoute
          path="/transaksi/komisi"
          component={TransaksiKomisi}
        />
        <AuthenticatedRoute path="/transaksi" component={TransaksiPenjualan} />
        <Redirect from="/" to="/login" />
      </Switch>
    </main>
  );
}

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("access_token_CMS") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default Routes;
