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
import { useHistory } from "react-router";

export default function MachineCard(props) {
  const history = useHistory();
  const {
    editWarranty,
    deleteMachine
  } = useContext(CMSContext);

  const actions = [
    {
      value: "edit",
    },
    {
      value: "hapus",
    },
  ];
  const [action, setAction] = useState(props.row.statusClaim);

  const handleChangeAction = (event) => {
    setAction(event.target.value);
  };

  const handleAction = async (input) => {
    if (input === "edit") {
      history.push(`/machine/${props.row.noMachine}`, { data: props.row });
    } else if (input === "hapus") {
      Swal.fire({
        title: "Hapus mesin permanen?",
        showCancelButton: true,
        confirmButtonText: `Iya`,
        cancelButtonText: `Batal`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteMachine(props.row.noMachine)
          props.refresh()
        }
      });
    } else {
      return null;
    }
  };

  return (
    <TableRow>
      <TableCell>{props.row.noMachine}</TableCell>
      <TableCell>{props.row.invoice}</TableCell>
      <TableCell>{moment(props.row.purchaseDate).format('LL')}</TableCell>
      <TableCell>{props.row.Warranty?.id
        ? (props.row.Warranty?.hasClaim
          ? 'Sudah diklaim'
          : !props.row.Warranty?.isValid
            ? 'Garansi sudah kadaluarsa'
            : 'Belum diklaim')
        : 'Belum didaftarkan warranty'}</TableCell>
      <TableCell>
        <TextField
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
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </TableCell>
    </TableRow>
  );
}
