import React, { useContext, useState } from "react";

import { useHistory } from "react-router-dom";

import { CMSContext } from "../../../context/state";

// MATERIAL UI
import {
  Button,
  Grid,
  Switch,
  TableCell,
  TableRow,
  MenuItem,
  TextField,
  Popover,
} from "@material-ui/core";

import MailOutlineIcon from "@material-ui/icons/MailOutline";
import ListIcon from "@material-ui/icons/List";

import useStyles from "./styles";

import Swal from "sweetalert2";

export default function Index(props, { row }) {
  const classes = useStyles();
  let newPhoneNumber = "+62";
  for (let i = 1; i < props.row.phone.length; i++) {
    newPhoneNumber += props.row.phone[i];
  }

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
    //// console.log(statusPremier);
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

  const history = useHistory();

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
      history.push({
        pathname: `/member/edit/${props.row.id}`,
        state: props.row,
      });
    } else {
      // HAPUS PASSWORD
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
            {props.row.phone[0] === "+" ? props.row.phone : newPhoneNumber}
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
        <ListIcon onClick={openAction} />
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
