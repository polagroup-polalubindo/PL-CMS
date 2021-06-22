const CMSReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PRODUK":
      return {
        ...state,
        produk: action.payload || [],
      };
    case "FETCH_MEMBER":
      return {
        ...state,
        member: action.payload || [],
      };
    case "FETCH_TRANSAKSI":
      return {
        ...state,
        transaksi: action.payload || [],
      };
    case "FETCH_BRAND":
      return {
        ...state,
        brand: action.payload || [],
      };
    case "FETCH_TRANSAKSI_KOMISI":
      return {
        ...state,
        transaksiKomisi: action.payload || [],
      };
    case "FETCH_USER_DATA":
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};

export default CMSReducer;
