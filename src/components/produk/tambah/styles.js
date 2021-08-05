import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  // Upload Image
  imgInput: {
    "& > input": {
      visibility: "hidden",
      width: 0,
      height: 0,
    },
  },
  imgTag: { width: "180px", height: "auto" },

  // Brand
  brandWidth: { width: "40%" },

  // Button
  buttonGroup: {
    "& > *": {
      margin: theme.spacing(1),
    },
    textAlign: "right",
  },
  buttonContained: { backgroundColor: "red" },
  buttonOutlined: { color: "red", border: "1px solid red" },

  //   Cards
  root: {
    minWidth: 275,
    borderRadius: 20,
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

  //   Radio
  checkbox: {
    "&$checkedBox": {
      color: "red",
    },
  },
  inputAdornment: {
    backgroundColor: "#acacac",
    height: "2.5rem",
    maxHeight: "3rem",
    padding: 15,
  },
  colorTextWhite: { color: "white" },

  brandWidth: {
    maxWidth: 250,
    width: "100%",
  },
  imgTag: {
    maxWidth: 150,
    margin: 20,
  },
}));

export default useStyles;
