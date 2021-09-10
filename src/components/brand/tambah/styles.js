import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  // member
  tambah_member: { marginBottom: 20, backgroundColor: "red" },

  // card
  root: {
    minWidth: 275,
    borderRadius: 20,
    padding: "20px 25px",
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

  // switch
  switchRoot: {
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

  // table
  table: {
    minWidth: 650,
  },
  table_container: { borderRadius: 20 },
  table_head: { backgroundColor: "#A9A9A9" },

  //   Radio
  checkbox: {
    "&$checkedBox": {
      color: "red",
    },
  },
  checkedBox: {},

  // button
  button: {
    "& > *": {
      margin: theme.spacing(1),
    },
    textAlign: "right",
  },

  button_simpan: { backgroundColor: "red" },

  imgInput: {
    "& > input": {
      visibility: "hidden",
      width: 0,
      height: 0,
    },
  },
  imgTag: {
    width: 100,
    height: 'auto',
    // margin: 20,
    marginBottom: 0
  },

  //   Switch
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
