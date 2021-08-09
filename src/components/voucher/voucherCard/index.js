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

  const { deleteVoucher } = useContext(CMSContext);

  // AKSI
  const actions = [{ value: "edit" }, { value: "hapus" }];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openAction = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeAction = (input) => {
    setAnchorEl(null);

    if (input === "hapus") {
      Swal.fire({
        title: "Hapus voucher permanen?",
        showCancelButton: true,
        confirmButtonText: `Hapus`,
        cancelButtonText: `Batal`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteVoucher(props.row.id);
          Swal.fire("Berhasil dihapus!", "", "success");
        }
      });
    } else {
      history.push(`/voucher/${row.id}`, { data: row });
    }
  };
  return (
    <TableRow key={props.row.code}>
      <TableCell>{props.row.name}</TableCell>
      <TableCell>{props.row.typeVoucher}</TableCell>
      <TableCell>{props.row.discountMax}</TableCell>
      <TableCell>{props.row.usageQuota}</TableCell>
      <TableCell>A</TableCell>
      <TableCell>B</TableCell>
      <TableCell>
        <div
          style={{
            backgroundColor:
              row.periode === "Akan Datang" ? "#ffdede" : "#deffe6",
            color: row.periode === "Akan Datang" ? "red" : "green",
            padding: 5,
          }}
        >
          C
        </div>
        {props.row.periodeStart}
        <br />
        {props.row.periodeEnd}
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
