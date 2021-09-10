import React, { useContext, useState } from "react";
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
  Divider
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

  const { deleteBrand, URL_SERVER } = useContext(CMSContext);
  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = (input) => {
    if (input === "hapus") {
      Swal.fire({
        title: "Hapus brand permanen?",
        showCancelButton: true,
        confirmButtonText: `Hapus`,
        cancelButtonText: `Batal`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteBrand(props.row.id);
          Swal.fire("Berhasil dihapus!", "", "success");
          await props.refresh()
        }
      });
    } else if (input === "edit") {
      history.push(`/brand/${props.row.id}`, { data: props.row });
    } else {
      return null;
    }
  };

  return (
    <TableRow>
      <TableCell style={{ height: 110 }}>
        <img
          src={`${URL_SERVER}/${props.row.fotoBrand}`}
          alt={`logo-${props.row.namaBrand}`}
          width="80"
          height="auto"
        />
      </TableCell>
      <TableCell>{props.row.namaBrand}</TableCell>
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
            <p style={{ margin: '0px 0px 5px', fontWeight: 'bold', fontSize: 18 }}>Detail</p>
            <Divider />
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
