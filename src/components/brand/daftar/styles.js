import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  // Table
  table: {
    minWidth: 650,
  },
  table_container: { borderRadius: 10 },
  table_head: { backgroundColor: "#d8d8d8" },

  // Tambah Produk
  tambah_produk: { marginRight: 30, backgroundColor: "red", marginBottom: 20 },

  // Switch
  switch: {
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
}));

export default useStyles;
