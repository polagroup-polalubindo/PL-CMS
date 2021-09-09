import React, { useContext, useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import {
  Grid,
  MenuItem,
  TextField,
  TableCell,
  TableRow,
  Switch,
} from "@material-ui/core";
import { CMSContext } from "../../../context/state";
import Swal from "sweetalert2";

const ProdukCard = (props, { row }) => {
  const history = useHistory();

  const { ubahStatusProduk, deleteproduk } = useContext(CMSContext);
  // const [checked, setChecked] = useState(false);

  const [produkStatus, setProdukStatus] = useState(false);

  const handleStatus = () => {
    setProdukStatus(!produkStatus);
    ubahStatusProduk({
      statusProduk: !produkStatus,
      id: props.row.id,
    });
  };

  useEffect(() => {
    setProdukStatus(props.row.statusProduk);
  }, [props.row]);

  //// console.log(row);
  const actions = [
    {
      value: "edit",
    },
    {
      value: "hapus",
    },
  ];

  const handleAction = (input) => {
    //// console.log(input);
    if (input === "hapus") {
      Swal.fire({
        title: "Hapus produk permanen?",
        showCancelButton: true,
        confirmButtonText: `Hapus`,
        cancelButtonText: `Batal`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteproduk(props.row.id);
          Swal.fire("Berhasil dihapus!", "", "success");
        }
      });
    } else {
      history.push(`/produk/${props.row.id}`, { data: props.row });

      // history.push('/produk/tambah', { data: row })
      // editProduk(props.row.id, { stock: data.stock, hargaSatuan: data.hargaSatuan });
    }
  };

  const formatRupiah = (harga = 0) => {
    let reverse = harga.toString().split("").reverse().join("");
    let ribuan = reverse.match(/\d{1,3}/g);

    return `Rp. ${ribuan.join(".").split("").reverse().join("")}`;
  };

  return (
    <TableRow key={props.row.id}>
      {/* <TableCell>
        <Checkbox
          checked={checked}
          onChange={(e) => setChecked(e.target.value)}
          inputProps={{ "aria-label": "Checkbox" }}
        />
      </TableCell> */}
      <TableCell>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <img
              src={props.row.fotoProduk}
              alt={props.row.namaProduk}
              width="50"
              height="50"
            />
          </Grid>
          <Grid item xs={9}>
            {props.row.namaProduk}
            <br />
            SKU: {props.row.sku}
          </Grid>
        </Grid>
      </TableCell>
      <TableCell>{formatRupiah(props.row.hargaSatuan || 0)}</TableCell>
      <TableCell>{props.row.stock}</TableCell>
      <TableCell>
        <Switch checked={produkStatus} onChange={handleStatus} />
      </TableCell>
      <TableCell>
        <TextField select variant="outlined" size="small">
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
};

export default withRouter(ProdukCard);
