import React, { useContext, useState } from "react";

import { useHistory } from "react-router-dom";

import { CMSContext } from "../../../context/state";

// MATERIAL UI
import {
  Grid,
  Switch,
  TableCell,
  TableRow,
  MenuItem,
  Popover,
} from "@material-ui/core";

import MailOutlineIcon from "@material-ui/icons/MailOutline";
import ListIcon from "@material-ui/icons/List";

import useStyles from "./styles";

import Swal from "sweetalert2";

export default function Index(props, { row }) {
  const classes = useStyles();
  const history = useHistory();

  let newPhoneNumber = row.phone;
  if (newPhoneNumber[0] === " ") newPhoneNumber = newPhoneNumber.slice(1);

  if (newPhoneNumber.slice(0, 1) === "0")
    newPhoneNumber = `+62${newPhoneNumber.slice(1)}`;
  else if (newPhoneNumber.slice(0, 2) === "62")
    newPhoneNumber = `+${newPhoneNumber}`;
  else if (newPhoneNumber.slice(0, 5) === "(+62)")
    newPhoneNumber = `+62${newPhoneNumber.slice(6)}`;
  else if (newPhoneNumber.slice(0, 6) === "(+62) ")
    newPhoneNumber = `+62${newPhoneNumber.slice(7)}`;
  else if (newPhoneNumber.slice(0, 4) === "(62)")
    newPhoneNumber = `+62${newPhoneNumber.slice(5)}`;
  else if (newPhoneNumber.slice(0, 5) === "(62) ")
    newPhoneNumber = `+62${newPhoneNumber.slice(6)}`;
  // else if (newPhoneNumber.slice(0, 3) === '+62') newPhoneNumber = newPhoneNumber
  else newPhoneNumber = newPhoneNumber;

  const { ubahStatusPremiere, ubahStatus, deleteMember } =
    useContext(CMSContext);

  // PREMIERE
  const [statusPremier, setPremiereStatus] = useState(
    props.row.statusPremier === "aktif" && props.row.referralStatus
      ? true
      : false
  );
  const handlePremiereStatus = () => {
    setPremiereStatus(!statusPremier);
    ubahStatusPremiere(
      !statusPremier === true
        ? { statusPremier: "aktif", referralStatus: 1, id: props.row.id }
        : { statusPremier: null, referralStatus: null, id: props.row.id }
    );
  };

  // STATUS
  const [status, setStatus] = useState(
    props.row.status === true ? true : false
  );
  const handleStatus = () => {
    setStatus(!status);
    ubahStatus({ status: !status });
  };

  // LEVEL
  const levels = [
    {
      value: "Level 1",
    },
  ];
  const [level, setLevel] = React.useState("Level 1");
  const handleLevel = (event) => {
    setLevel(event.target.value);
  };

  // AKSI
  const actions = [
    { value: "edit" },
    { value: "hapus" },
    { value: "reset password" },
  ];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openAction = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeAction = (input) => {
    setAnchorEl(null);

    if (input === "hapus") {
      Swal.fire({
        title: "Hapus user permanen?",
        showCancelButton: true,
        confirmButtonText: `Hapus`,
        cancelButtonText: `Batal`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteMember(props.row.id);
          Swal.fire("Berhasil dihapus!", "", "success");
        }
      });
    } else if (input === "edit") {
      history.push(`/member/${row.id}`, { data: row });
    }
  };
  return (
    <TableRow key={props.row.nama}>
      <TableCell>{props.row.nama}</TableCell>
      <TableCell>{props.row.createdAt.split("T")[0]}</TableCell>
      <TableCell>
        <Grid container alignItems="center">
          <Grid
            item
            xs={3}
            onClick={() =>
              window.open(
                `https://api.whatsapp.com/send?phone=${newPhoneNumber}&text=hi`,
                "_blank"
              )
            }
            style={{ cursor: "pointer" }}
          >
            <img src="/img/cms/WhatsApp.svg" alt="WhatsApp" width="30" />
          </Grid>
          <Grid item xs={9}>
            <p
              onClick={() =>
                window.open(
                  `https://api.whatsapp.com/send?phone=${newPhoneNumber}&text=hi`,
                  "_blank"
                )
              }
              style={{ margin: 0, cursor: "pointer", color: "blue" }}
            >
              {row.phone[0] === "+" ? row.phone : newPhoneNumber}
            </p>
          </Grid>
          <Grid item xs={3}>
            <MailOutlineIcon />
          </Grid>
          <Grid item xs={9}>
            {props.row.email}
          </Grid>
        </Grid>
      </TableCell>
      <TableCell>{props.row.noKtp}</TableCell>
      <TableCell>{props.row.noNPWP}</TableCell>
      <TableCell>Rp.{props.row.Komisis[0]?.totalKomisi}</TableCell>
      <TableCell>
        Rp.{props.row.totalPembelian === null ? 0 : props.row.totalPembelian}
      </TableCell>
      <TableCell>{props.row.statusPremier}</TableCell>
      {/* <TableCell>
        <TextField
          select
          variant="outlined"
          value={level}
          size="small"
          onChange={handleLevel}
        >
          {levels.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </TableCell>
      <TableCell>
        <Grid container alignItems="center">
          <Grid item xs={12}>
            {props.row.discount} produk
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined">ubah</Button>
          </Grid>
        </Grid>
      </TableCell> */}
      <TableCell>
        <Switch
          focusVisibleClassName={classes.focusVisible}
          disableRipple
          classes={{
            root: classes.root,
            switchBase: classes.switchBase,
            thumb: classes.thumb,
            track: classes.track,
            checked: classes.checked,
          }}
          checked={statusPremier}
          onChange={handlePremiereStatus}
        />
      </TableCell>
      <TableCell>
        <Switch
          focusVisibleClassName={classes.focusVisible}
          disableRipple
          classes={{
            root: classes.root,
            switchBase: classes.switchBase,
            thumb: classes.thumb,
            track: classes.track,
            checked: classes.checked,
          }}
          checked={status}
          onChange={handleStatus}
        />
      </TableCell>
      <TableCell>
        <ListIcon onClick={openAction} style={{ cursor: "pointer" }} />
        <Popover
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={closeAction}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {actions.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              onClick={() => closeAction(option.value)}
            >
              {option.value}
            </MenuItem>
          ))}
        </Popover>
      </TableCell>
    </TableRow>
  );
}
