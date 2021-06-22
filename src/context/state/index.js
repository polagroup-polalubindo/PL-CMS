import React, { createContext, useReducer } from "react";
import CMSReducer from "../reducers";
import Axios from "axios";
import Swal from "sweetalert2";

const initialState = {
  isLogin: false,
  produk: [],
  brand: [],
  transaksi: [],
  transaksiKomisi: [],
  member: [],
  userData: null
};

export const CMSContext = createContext(initialState);

export const URL_SERVER = `http://157.230.248.17`;
// const URL_SERVER = `http://localhost:80`;
// export const URL_SERVER = `http://localhost:4000`;

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(CMSReducer, initialState);
  //// console.log(state, "global state");

  // AUTHENTICATION
  const autoLogin = async () => {
    const loginData = {
      email: "admin@mail.com",
      password: "1234",
    };
    let data = await fetch(URL_SERVER + `/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });
    data = await data.json();
    localStorage.setItem("access_token_CMS", data.access_token);
    dispatch({ type: "FETCH_USER_DATA", payload: data.data });
  };

  const login = async (payload) => {
    let data = await fetch(URL_SERVER + `/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    data = await data.json();

    if (data.access_token) {
      localStorage.setItem("access_token_CMS", data.access_token);
      dispatch({ type: "FETCH_USER_DATA", payload: data.data });
    }
  };

  const setUserData = (payload) => {
    dispatch({ type: "FETCH_USER_DATA", payload });
  }

  // PRODUK
  const fetchProduk = async () => {
    let data = await fetch(URL_SERVER + "/produk");
    data = await data.json();
    dispatch({ type: "FETCH_PRODUK", payload: data });
  };

  const ubahStatusProduk = async (newData) => {
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + `/ubah-status-produk/${newData.id}`, {
      method: "PUT",
      headers: { access_token, "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    data = await data.json();
    fetchProduk();
  };

  const deleteproduk = async (id) => {
    const access_token = localStorage.getItem("access_token_CMS");
    const data = await fetch(URL_SERVER + `/produk/${id}`, {
      method: "DELETE",
      headers: { access_token, "Content-Type": "application/json" },
    });
    fetchProduk();
  };

  const tambahProduk = async (input) => {
    const access_token = localStorage.getItem("access_token_CMS");
    const data = await Axios(URL_SERVER + "/produk", {
      method: "POST",
      headers: { access_token },
      data: input,
    });
    fetchProduk();
  };

  const editProduk = async (id, newData) => {
    const access_token = localStorage.getItem("access_token_CMS");
    await fetch(URL_SERVER + `/produk/${id}`, {
      method: "PUT",
      headers: { access_token, "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    fetchProduk();
  };

  // MEMBER
  const fetchMember = async () => {
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + "/customer", {
      method: "GET",
      headers: { access_token, "Content-Type": "application/json" },
    });
    //// console.log(data, "<<<");
    data = await data.json();
    dispatch({ type: "FETCH_MEMBER", payload: data });
  };

  const tambahMember = async (input) => {
    try {
      const access_token = localStorage.getItem("access_token_CMS");
      let data = await fetch(URL_SERVER + "/add-customer", {
        method: "POST",
        headers: { access_token, "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      data = await data.json();
      if (data.errMessage) {
        throw data.errMessage;
      } else {
        fetchMember();
        return { message: "success" };
      }
    } catch (error) {
      Swal.fire({
        title: error,
        icon: "error",
      });
      return error;
    }
  };

  const ubahStatusPremiere = async (newData) => {
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + `/ubah-status-premier`, {
      method: "POST",
      headers: { access_token, "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    //// console.log(data);
    fetchMember();
  };

  const ubahStatus = async (newData) => {
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + `/ubah-status-customer`, {
      method: "POST",
      headers: { access_token, "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    //// console.log(data);
    fetchMember();
  };

  const deleteMember = async (id) => {
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + `/customer/${id}`, {
      method: "DELETE",
      headers: { access_token, "Content-Type": "application/json" },
    });
    //// console.log(data);
    fetchMember();
  }

  // TRANSAKSI
  const fetchTransaksi = async () => {
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + `/transaksi`, {
      method: "GET",
      headers: { access_token, "Content-Type": "application/json" },
    });
    data = await data.json();
    dispatch({ type: "FETCH_TRANSAKSI", payload: data });
  };

  const fetchTransaksiKomisi = async () => {
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + `/all-transaksi`, {
      method: "GET",
      headers: { access_token, "Content-Type": "application/json" },
    });
    data = await data.json();
    dispatch({ type: "FETCH_TRANSAKSI_KOMISI", payload: data });
  };

  const konfirmasiTransaksi = async (newData) => {
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + `/konfirmasi-transaksi`, {
      method: "POST",
      headers: { access_token, "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    data = await data.json();
    fetchTransaksi();

    return data;
  };

  const tolakPesanan = async (newData) => {
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + `/tolak-pesanan`, {
      method: "POST",
      headers: { access_token, "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    data = await data.json();
    return data;
  };

  const ubahStatusPembayaran = async (newData) => {
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + `/ubah-status-pembayaran`, {
      method: "POST",
      headers: { access_token, "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    fetchTransaksi();
  };

  const inputResi = async (newData) => {
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + `/input-resi`, {
      method: "POST",
      headers: { access_token, "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    data = await data.json();
    return data;
  };

  // BRAND
  const fetchBrand = async () => {
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + `/brand`, {
      method: "GET",
      headers: { access_token, "Content-Type": "application/json" },
    });
    data = await data.json();
    dispatch({ type: "FETCH_BRAND", payload: data });
  };

  return (
    <CMSContext.Provider
      value={{
        produk: state.produk,
        brand: state.brand,
        member: state.member,
        transaksi: state.transaksi,
        transaksiKomisi: state.transaksiKomisi,
        userData: state.userData,
        isLogin: state.isLogin,

        // PRODUK
        fetchProduk,
        ubahStatusProduk,
        deleteproduk,
        tambahProduk,
        editProduk,

        // MEMBER
        fetchMember,
        tambahMember,
        ubahStatusPremiere,
        ubahStatus,
        deleteMember,

        // TRANSAKSI
        fetchTransaksi,
        fetchBrand,
        fetchTransaksiKomisi,
        konfirmasiTransaksi,
        tolakPesanan,
        ubahStatusPembayaran,
        inputResi,

        autoLogin,
        login,
        setUserData,
      }}
      {...{ children }}
    />
  );
};
