import React, { useContext, useState } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import {
  TableCell,
  TableRow,
  TextField,
  MenuItem,
  Modal,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { CMSContext } from "../../../context/state";
import Swal from "sweetalert2";
import useStyles from "./styles";

export default function VoucherCard(props) {
  const history = useHistory();
  const classes = useStyles();

  const actions = [
    {
      value: "pilih aksi",
    },
    {
      value: "detil",
    },
    {
      value: "edit",
    },
    {
      value: "hapus",
    },
  ];
  const [action, setAction] = useState("pilih aksi");
  const [open, setOpen] = useState(false);

  const handleChangeAction = (event) => {
    setAction(event.target.value);
  };

  const { deleteVoucher } = useContext(CMSContext);
  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = (input) => {
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
          await props.refresh()
        }
      });
    } else if (input === "edit") {
      history.push(`/voucher/${props.row.id}`, { data: props.row });
    } else if (input === "detil") {
      setOpen(true);
    } else {
      return null;
    }
  };

  return (
    <TableRow>
      <TableCell>{props.row.name}</TableCell>
      <TableCell>{props.row.code}</TableCell>
      <TableCell>{props.row.typeVoucher}</TableCell>
      <TableCell>
        {props.row.periodeStart}
        <br />
        {props.row.periodeEnd}
      </TableCell>
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes.detil}>
            <List>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary="Maksimal Diskon"
                  secondary={props.row.discountMax}
                />
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary="Minimal Pembelian"
                  secondary={props.row.minimumPurchase}
                />
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary="Kuota Pemakaian"
                  secondary={props.row.usageQuota}
                />
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary="Berlaku Untuk"
                  secondary={
                    props.row.forAll === true
                      ? "Semua Produk"
                      : "Produk Tertentu"
                  }
                />
              </ListItem>
            </List>
          </div>
        </Modal>
      </TableCell>
    </TableRow>
  );
}
