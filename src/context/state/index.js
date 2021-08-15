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
  userData: null,
  proses: false,
  voucher: [],
  dataKomisi: [],
};

export const CMSContext = createContext(initialState);

// export const URL_SERVER = `http://157.230.248.17`;
export const URL_SERVER = `http://localhost:4000`;

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

    if (data.data.role === "admin") {
      if (data.access_token) {
        await dispatch({ type: "FETCH_USER_DATA", payload: data.data });
        localStorage.setItem("access_token_CMS", data.access_token);
      }
    } else {
      throw { message: "Not admin" };
    }
  };

  const setUserData = (payload) => {
    dispatch({ type: "FETCH_USER_DATA", payload });
  };

  // PRODUK
  const fetchProduk = async () => {
    dispatch({ type: "SET_PROSES" });
    let data = await fetch(URL_SERVER + "/produk?all=true");
    data = await data.json();
    dispatch({ type: "FETCH_PRODUK", payload: data || [] });
  };

  const ubahStatusProduk = async (newData) => {
    const access_token = localStorage.getItem("access_token_CMS");
    await fetch(URL_SERVER + `/ubah-status-produk/${newData.id}`, {
      method: "PUT",
      headers: { access_token, "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    await fetchProduk();
  };

  const deleteproduk = async (id) => {
    const access_token = localStorage.getItem("access_token_CMS");
    await fetch(URL_SERVER + `/produk/${id}`, {
      method: "DELETE",
      headers: { access_token, "Content-Type": "application/json" },
    });
    await fetchProduk();
  };

  const tambahProduk = async (input) => {
    const access_token = localStorage.getItem("access_token_CMS");
    await Axios(URL_SERVER + "/produk", {
      method: "POST",
      headers: { access_token },
      data: input,
    });
    await fetchProduk();
  };

  const editProduk = async (id, input) => {
    const access_token = localStorage.getItem("access_token_CMS");
    await Axios(URL_SERVER + `/produk/${id}`, {
      method: "PUT",
      headers: { access_token },
      data: input,
    });
    await fetchProduk();
  };

  // MEMBER
  const fetchMember = async () => {
    dispatch({ type: "SET_PROSES" });
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + "/customer", {
      method: "GET",
      headers: { access_token, "Content-Type": "application/json" },
    });
    data = await data.json();
    dispatch({ type: "FETCH_MEMBER", payload: data || [] });
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
    await fetch(URL_SERVER + `/ubah-status-premier`, {
      method: "POST",
      headers: { access_token, "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    fetchMember();
  };

  const ubahStatus = async (newData) => {
    const access_token = localStorage.getItem("access_token_CMS");
    await fetch(URL_SERVER + `/ubah-status-customer`, {
      method: "POST",
      headers: { access_token, "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    fetchMember();
  };

  const deleteMember = async (id) => {
    const access_token = localStorage.getItem("access_token_CMS");
    await fetch(URL_SERVER + `/customer/${id}`, {
      method: "DELETE",
      headers: { access_token, "Content-Type": "application/json" },
    });
    fetchMember();
  };

  const ubahMember = async (id, newData) => {
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + `/customer/${id}`, {
      method: "PUT",
      headers: { access_token, "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    data = await data.json();
    if (data.errMessage) {
      throw data.errMessage;
    } else {
      fetchMember();
      return { message: "success" };
    }
  };

  // TRANSAKSI
  const fetchTransaksi = async () => {
    dispatch({ type: "SET_PROSES" });
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + `/transaksi`, {
      method: "GET",
      headers: { access_token, "Content-Type": "application/json" },
    });
    data = await data.json();
    dispatch({ type: "FETCH_TRANSAKSI", payload: data || [] });
  };

  const fetchTransaksiKomisi = async () => {
    dispatch({ type: "SET_PROSES" });
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + `/all-transaksi`, {
      method: "GET",
      headers: { access_token, "Content-Type": "application/json" },
    });
    data = await data.json();
    dispatch({ type: "FETCH_TRANSAKSI_KOMISI", payload: data || [] });
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
    await fetch(URL_SERVER + `/ubah-status-pembayaran`, {
      method: "POST",
      headers: { access_token, "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    fetchTransaksi();
  };

  const kirimPesanan = async (id) => {
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + `/kirim-pesanan/${id}`, {
      method: "GET",
      headers: { access_token },
    });
    data = await data.json();
    return data;
  };

  // BRAND
  const fetchBrand = async () => {
    dispatch({ type: "SET_PROSES" });
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + `/brand`, {
      method: "GET",
      headers: { access_token, "Content-Type": "application/json" },
    });
    data = await data.json();
    dispatch({ type: "FETCH_BRAND", payload: data || [] });
  };

  // KOMISI
  const fetchAllKomisi = async (payload) => {
    dispatch({ type: "SET_PROSES" });
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(
      URL_SERVER + `/all-komisi?month=${payload.month}&year=${payload.year}`,
      {
        method: "GET",
        headers: { access_token, "Content-Type": "application/json" },
      }
    );
    data = await data.json();
    dispatch({ type: "FETCH_KOMISI", payload: data || [] });
  };

  const updateKomisi = async (payload) => {
    dispatch({ type: "SET_PROSES" });
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + `/komisi/${payload.id}`, {
      method: "PUT",
      headers: { access_token, "Content-Type": "application/json" },
      body: JSON.stringify({ status: payload.status }),
    });
  };

  // VOUCHER
  const fetchVoucher = async () => {
    dispatch({ type: "SET_PROSES" });
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + "/voucher", {
      method: "GET",
      headers: { access_token, "Content-Type": "application/json" },
    });
    data = await data.json();
    dispatch({ type: "FETCH_VOUCHER", payload: data || [] });
  };

  const addVoucher = async (input) => {
    try {
      const access_token = localStorage.getItem("access_token_CMS");
      await Axios(URL_SERVER + "/voucher", {
        method: "POST",
        headers: { access_token },
        data: input,
      });
      await fetchVoucher();
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error,
        icon: "error",
      });
      return error;
    }
  };

  const editVoucher = async (id, newData) => {
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + `/voucher/${id}`, {
      method: "PUT",
      headers: { access_token, "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    data = await data.json();
    if (data.errMessage) {
      throw data.errMessage;
    } else {
      fetchVoucher();
      return { message: "success" };
    }
  };

  const fetchOneVoucher = async (id) => {
    dispatch({ type: "SET_PROSES" });
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + `/voucher/${id}`, {
      method: "GET",
      headers: { access_token, "Content-Type": "application/json" },
    });
    data = await data.json();
    dispatch({ type: "FETCH_VOUCHER", payload: data || [] });
  };

  const deleteVoucher = async (id) => {
    const access_token = localStorage.getItem("access_token_CMS");
    await fetch(URL_SERVER + `/voucher/${id}`, {
      method: "DELETE",
      headers: { access_token, "Content-Type": "application/json" },
    });
    fetchVoucher();
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
        proses: state.proses,
        voucher: state.voucher,
        dataKomisi: state.dataKomisi,

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
        ubahMember,

        // TRANSAKSI
        fetchTransaksi,
        fetchBrand,
        fetchTransaksiKomisi,
        konfirmasiTransaksi,
        tolakPesanan,
        ubahStatusPembayaran,
        kirimPesanan,

        // KOMISI
        fetchAllKomisi,
        updateKomisi,

        // VOUCHER
        fetchVoucher,
        addVoucher,
        fetchOneVoucher,
        editVoucher,
        deleteVoucher,

        autoLogin,
        login,
        setUserData,
      }}
      {...{ children }}
    />
  );
};
