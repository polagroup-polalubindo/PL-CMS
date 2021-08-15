const CMSReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PRODUK":
      return {
        ...state,
        produk: action.payload || [],
        proses: false,
      };
    case "FETCH_MEMBER":
      return {
        ...state,
        member: action.payload || [],
        proses: false,
      };
    case "FETCH_VOUCHER":
      return {
        ...state,
        voucher: action.payload || [],
        proses: false,
      };
    case "FETCH_TRANSAKSI":
      return {
        ...state,
        transaksi: action.payload || [],
        proses: false,
      };
    case "FETCH_BRAND":
      return {
        ...state,
        brand: action.payload || [],
        proses: false,
      };
    case "FETCH_TRANSAKSI_KOMISI":
      return {
        ...state,
        transaksiKomisi: action.payload || [],
        proses: false,
      };
    case "FETCH_USER_DATA":
      return {
        ...state,
        userData: action.payload,
        proses: false,
      };
    case "FETCH_KOMISI":
      return {
        ...state,
        dataKomisi: action.payload || [],
        proses: false,
      };
    case "SET_PROSES":
      return {
        ...state,
        proses: true,
      };
    default:
      return state;
  }
};

export default CMSReducer;
