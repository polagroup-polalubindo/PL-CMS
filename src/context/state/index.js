import React, { createContext, useReducer } from "react";
import CMSReducer from "../reducers";
import Axios from "axios";
import Swal from "sweetalert2";

const initialState = {
  isLogin: false,
  produk: [],
  totalProduk: 0,
  brand: [],
  totalBrand: 0,
  transaksi: [],
  totalTransaksi: 0,
  dataTransaksiForDownload: [],
  transaksiKomisi: [],
  member: [],
  totalMember: 0,
  dataMemberForDownload: [],
  userData: null,
  proses: false,
  dataKomisi: [],
  totalKomisi: 0,
  voucher: [],
  totalVoucher: 0,
  dataWarranty: [],
  totalWarranty: 0,
};

export const CMSContext = createContext(initialState);

export const URL_SERVER = `http://157.230.248.17`;
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
  const fetchProduk = async (query) => {
    dispatch({ type: "SET_PROSES" });
    let data = await fetch(URL_SERVER + `/produk${query || ''}`);
    data = await data.json();
    dispatch({
      type: "FETCH_PRODUK",
      payload: { data: data.data || [], totalProduk: data.totalProduk },
    });
  };

  const ubahStatusProduk = async (newData) => {
    const access_token = localStorage.getItem("access_token_CMS");
    await fetch(URL_SERVER + `/ubah-status-produk/${newData.id}`, {
      method: "PUT",
      headers: { access_token, "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
  };

  const deleteproduk = async (id) => {
    const access_token = localStorage.getItem("access_token_CMS");
    await fetch(URL_SERVER + `/produk/${id}`, {
      method: "DELETE",
      headers: { access_token, "Content-Type": "application/json" },
    });
  };

  const tambahProduk = async (input) => {
    const access_token = localStorage.getItem("access_token_CMS");
    await Axios(URL_SERVER + "/produk", {
      method: "POST",
      headers: { access_token },
      data: input,
    });
  };

  const editProduk = async (id, input) => {
    const access_token = localStorage.getItem("access_token_CMS");
    await Axios(URL_SERVER + `/produk/${id}`, {
      method: "PUT",
      headers: { access_token },
      data: input,
    });
  };

  // MEMBER
  const fetchMember = async (query) => {
    dispatch({ type: "SET_PROSES" });
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + `/customer${query || ''}`, {
      method: "GET",
      headers: { access_token, "Content-Type": "application/json" },
    });
    data = await data.json();
    dispatch({
      type: "FETCH_MEMBER",
      payload: { data: data.data, totalMember: data.totalMember },
    });
  };

  const fetchDataMemberForDownload = async (keyword) => {
    dispatch({ type: "SET_PROSES" });
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + `/customer?keyword=${keyword}`, {
      method: "GET",
      headers: { access_token, "Content-Type": "application/json" },
    });
    data = await data.json();

    let newData = [];
    data.data.forEach((el, index) => {
      let totalKomisi = 0;

      el.Komisis &&
        el.Komisis.forEach((element) => {
          totalKomisi += element.totalKomisi;
        });

      newData.push({
        no: index + 1,
        member: el.nama,
        join: el.createdAt.slice(0, 10),
        email: el.email,
        hp: el.phone,
        ktp: el.noKtp,
        npwp: el.noNPWP,
        totalBelanja: el.totalPembelian,
        premier: el.referralStatus ? "Premier" : "Tidak Premier",
        status: el.status ? "Aktif" : "Tidak Aktif",
        namaPenerimaKomisi: el.namaRekening,
        totalKomisi,
      });
    });
    dispatch({ type: "FETCH_MEMBER_FOR_DOWNLOAD", payload: { data: newData } });
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
      return { message: "success" };
    }
  };

  // TRANSAKSI
  const fetchTransaksi = async (query) => {
    dispatch({ type: "SET_PROSES" });
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + `/transaksi${query || ''}`, {
      method: "GET",
      headers: { access_token, "Content-Type": "application/json" },
    });
    data = await data.json();
    dispatch({
      type: "FETCH_TRANSAKSI",
      payload: { data: data.data, totalTransaksi: data.totalTransaksi },
    });
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

  const fetchDataTransaksiForDownload = async (query) => {
    dispatch({ type: "SET_PROSES" });
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + `/transaksi${query || ''}`, {
      method: "GET",
      headers: { access_token, "Content-Type": "application/json" },
    });
    data = await data.json();

    let newData = [];
    await data.data.forEach((el, index) => {
      newData.push({
        no: index + 1,
        orderId: el.orderNo,
        status: el.statusPengiriman,
        transactionDate: el.createdAt,
        recipient: el.namaPenerima,
        recipientNumber: el.telfonPenerima,
        recipientAddress: el.alamatPengiriman,
        invoice: el.invoice,
        resi: el.noResi || "",
        tanggalPembelian: el.createdAt,
        kurir: el.kurir,
        jenisLayanan: el.serviceKurir,
        totalShipping: el.ongkosKirim,
        insuranceFee: el.insuranceFee,
        total: el.totalHarga,
      });
    });
    dispatch({
      type: "FETCH_TRANSAKSI_FOR_DOWNLOAD",
      payload: { data: newData },
    });
  };

  // BRAND
  const fetchBrand = async (query) => {
    dispatch({ type: "SET_PROSES" });
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + `/brand${query || ''}`, {
      method: "GET",
      headers: { access_token, "Content-Type": "application/json" },
    });
    data = await data.json();
    dispatch({ type: "FETCH_BRAND", payload: { data: data.brandList || [], totalBrand: data.totalBrand } });
  };

  const deleteBrand = async (id) => {
    const access_token = localStorage.getItem("access_token_CMS");
    await fetch(URL_SERVER + `/brand/${id}`, {
      method: "DELETE",
      headers: { access_token, "Content-Type": "application/json" },
    });
    return { message: "success" };
  };

  const addBrand = async (input) => {
    try {
      const access_token = localStorage.getItem("access_token_CMS");
      await Axios(URL_SERVER + "/brand", {
        method: "POST",
        headers: { access_token },
        data: input,
      });
      return 'success'
    } catch (error) {
      Swal.fire({
        title: error,
        icon: "error",
      });
      return 'error';
    }
  };

  const editBrand = async (id, newData) => {
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + `/brand/${id}`, {
      method: "PUT",
      headers: { access_token },
      body: newData,
    });
    data = await data.json();

    if (data.errMessage) {
      return 'error';
    } else {
      return 'success'
    }
  };

  // KOMISI
  const fetchAllKomisi = async (query) => {
    dispatch({ type: "SET_PROSES" });
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + `/all-komisi${query || ''}`, {
      method: "GET",
      headers: { access_token, "Content-Type": "application/json" },
    });
    data = await data.json();
    dispatch({ type: "FETCH_KOMISI", payload: data || [] });
  };

  const updateKomisi = async (payload) => {
    dispatch({ type: "SET_PROSES" });
    const access_token = localStorage.getItem("access_token_CMS");
    await fetch(URL_SERVER + `/komisi/${payload.id}`, {
      method: "PUT",
      headers: { access_token, "Content-Type": "application/json" },
      body: JSON.stringify({ status: payload.status }),
    });
  };

  // VOUCHER
  const fetchVoucher = async (query) => {
    try {
      dispatch({ type: "SET_PROSES" });
      const access_token = localStorage.getItem("access_token_CMS");
      let data = await fetch(URL_SERVER + `/voucher${query || ''}`, {
        method: "GET",
        headers: { access_token, "Content-Type": "application/json" },
      });
      data = await data.json();

      dispatch({ type: "FETCH_VOUCHER", payload: { data: data.data || [], totalVoucher: data.totalVoucher } });
    } catch (error) {
      // console.log(error);
    }
  };

  const addVoucher = async (input) => {
    try {
      const access_token = localStorage.getItem("access_token_CMS");
      await Axios(URL_SERVER + "/voucher", {
        method: "POST",
        headers: { access_token },
        data: input,
      });
      return 'success'
    } catch (error) {
      // console.log(error.response)
      if (error.response?.data?.message === "Code Voucher Existing") {
        Swal.fire({
          title: 'Code voucher sudah terpakai',
          icon: "error",
        });
      } else {
        Swal.fire({
          title: error,
          icon: "error",
        });
      }
      return 'error';
    }
  };

  const editVoucher = async (id, newData) => {
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + `/voucher/${id}`, {
      method: "PUT",
      headers: { access_token },
      body: newData,
    });
    data = await data.json();

    if (data.errMessage) {
      return 'error';
    } else if (data.message === "Code Voucher Existing") {
      Swal.fire({
        title: 'Code voucher sudah terpakai',
        icon: "error",
      })
      return 'error';
    } else {
      return 'success'
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
    return { message: "success" };
  };

  // WARRANTY
  const fetchWarranty = async (query) => {
    dispatch({ type: "SET_PROSES" });
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + `/warranty${query || ''}`, {
      method: "GET",
      headers: { access_token, "Content-Type": "application/json" },
    });
    data = await data.json();
    dispatch({ type: "FETCH_WARRANTY", payload: { data: data.data || [], totalWarranty: data.totalWarranty } });
  };
  
  const editWarranty = async (id, newData) => {
    const access_token = localStorage.getItem("access_token_CMS");
    let data = await fetch(URL_SERVER + `/warranty/${id}`, {
      method: "PUT",
      headers: { access_token, "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    data = await data.json();

    if (data.errMessage) {
      return 'error';
    } else {
      return 'success'
    }
  };

  return (
    <CMSContext.Provider
      value={{
        URL_SERVER,
        produk: state.produk,
        totalProduk: state.totalProduk,
        brand: state.brand,
        totalBrand: state.totalBrand,
        member: state.member,
        totalMember: state.totalMember,
        dataMemberForDownload: state.dataMemberForDownload,
        transaksi: state.transaksi,
        dataTransaksiForDownload: state.dataTransaksiForDownload,
        totalTransaksi: state.totalTransaksi,
        transaksiKomisi: state.transaksiKomisi,
        userData: state.userData,
        isLogin: state.isLogin,
        proses: state.proses,
        dataKomisi: state.dataKomisi,
        totalKomisi: state.totalKomisi,
        voucher: state.voucher,
        totalVoucher: state.totalVoucher,
        dataWarranty: state.dataWarranty,
        totalWarranty: state.totalWarranty,

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
        fetchDataMemberForDownload,

        // TRANSAKSI
        fetchTransaksi,
        fetchTransaksiKomisi,
        konfirmasiTransaksi,
        tolakPesanan,
        ubahStatusPembayaran,
        kirimPesanan,
        fetchDataTransaksiForDownload,

        // KOMISI
        fetchAllKomisi,
        updateKomisi,

        // VOUCHER
        fetchVoucher,
        addVoucher,
        fetchOneVoucher,
        editVoucher,
        deleteVoucher,

        // BRAND
        fetchBrand,
        deleteBrand,
        addBrand,
        editBrand,

        // WARRANTY
        fetchWarranty,
        editWarranty,

        autoLogin,
        login,
        setUserData,
      }}
      {...{ children }}
    />
  );
};
