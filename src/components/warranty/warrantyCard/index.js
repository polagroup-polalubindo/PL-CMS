import React, { useContext, useState } from "react";
import {
  TableCell,
  TableRow,
  TextField,
  MenuItem,
} from "@material-ui/core";
import { CMSContext } from "../../../context/state";
import Swal from "sweetalert2";
import moment from 'moment';

export default function VoucherCard(props) {
  const {
    editWarranty
  } = useContext(CMSContext);

  const actions = [
    {
      value: "Pengajuan",
      label: "Pengajuan",
    },
    {
      value: "Sedang diproses",
      label: "Proses",
    },
    {
      value: "Sudah diklaim",
      label: "Selesai Diklaim",
    },
  ];
  const [action, setAction] = useState(props.row.statusClaim);

  const handleChangeAction = (event) => {
    setAction(event.target.value);
  };

  const handleAction = async (input) => {
    if (input === "Sedang diproses") {
      await editWarranty(props.row.id, { statusClaim: input })
      await props.refresh()
    } else if (input === "Sudah diklaim") {
      Swal.fire({
        title: "Apa proses klaim sudah selesai?",
        showCancelButton: true,
        confirmButtonText: `Iya`,
        cancelButtonText: `Batal`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await editWarranty(props.row.id, { statusClaim: input })
          props.refresh()
        }
      });
    } else {
      return null;
    }
  };

  return (
    <TableRow>
      <TableCell>{props.row.User.nama}</TableCell>
      <TableCell>{props.row.invoice}</TableCell>
      <TableCell>{props.row.noMachine}</TableCell>
      <TableCell>{moment(props.row.purchaseDate).format('LL')}</TableCell>
      <TableCell>{props.row.purchasePlace}</TableCell>
      <TableCell>
        {
          props.row.statusClaim === 'Pengajuan' || props.row.statusClaim === 'Sedang diproses'
            ? <TextField
              select
              variant="outlined"
              size="small"
              value={action}
              onChange={handleChangeAction}
            >
              {actions.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  onClick={() => handleAction(option.value)}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            : props.row.statusClaim
        }
      </TableCell>
    </TableRow>
  );
}
