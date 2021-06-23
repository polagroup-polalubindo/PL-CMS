import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  // button

  // Kategori
  root: {
    flexGrow: 1,
  },

  form_kategori: {
    "& > *": {
      margin: theme.spacing(1),
      width: "45ch",
    },
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },

  // Daftar
  form_daftar: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },

  form_daftar_btn: {
    width: 170,
  },

  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    marginBottom: 20,
  },
  checkbox: {
    color: "red",
    "&$checked": {
      color: "red",
    },
  },
  grid_align_right: { textAlign: "right" },
  grid_border_top: { borderTop: "1px solid" },
  grid_border_left: { borderLeft: "1px solid" },
  batas_respons: { backgroundColor: "#fbc901" },
  tolak_pesanan: { color: "green", borderColor: "green" },
  terima_pesanan: { backgroundColor: "green" },
  telat: { backgroundColor: "red" },
}));

export default useStyles;
