import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import {
  Checkbox,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  TableCell,
  TableRow,
  Switch,
} from "@material-ui/core";
import { CMSContext } from "../../../context/state";
import Swal from 'sweetalert2';

const ProdukCard = ({ row, history }) => {
  const { ubahStatusProduk, deleteproduk, editProduk } = useContext(CMSContext);
  const [checked, setChecked] = useState(false);

  const [produkStatus, setProdukStatus] = useState(false);

  const [data, setData] = useState({
    hargaSatuan: row.hargaSatuan,
    stock: row.stock,
  })

  const handleStatus = () => {
    setProdukStatus(!produkStatus);
    ubahStatusProduk({
      statusProduk: !produkStatus,
      id: row.id,
    });
  };

  useEffect(() => {
    setProdukStatus(row.statusProduk)
  }, [row])

  const actions = [
    {
      value: "edit",
    },
    {
      value: "hapus",
    },
  ];

  const handleAction = (input) => {
    if (input === "hapus") {
      Swal.fire({
        title: 'Hapus produk permanen?',
        showCancelButton: true,
        confirmButtonText: `Hapus`,
        cancelButtonText: `Batal`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteproduk(row.id);
          Swal.fire('Berhasil dihapus!', '', 'success')
        }
      })
    } else {
      history.push(`/produk/${row.id}`, { data: row })
    }
  };

  const formatRupiah = (harga) => {
    let reverse = harga.toString().split('').reverse().join('');
    let ribuan = reverse.match(/\d{1,3}/g);

    return `Rp. ${ribuan.join('.').split('').reverse().join('')}`;
  }

  return (
    <TableRow key={row.id}>
      <TableCell>
        <Checkbox
          checked={checked}
          onChange={(e) => setChecked(e.target.value)}
          inputProps={{ "aria-label": "Checkbox" }}
        />
      </TableCell>
      <TableCell>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <img
              src={row.fotoProduk}
              alt={row.namaProduk}
              width="50"
              height="50"
            />
          </Grid>
          <Grid item xs={9}>
            {row.namaProduk}
            <br />
            SKU: {row.sku}
          </Grid>
        </Grid>
      </TableCell>
      <TableCell>{formatRupiah(row.hargaSatuan)}</TableCell>
      <TableCell>{row.stock}</TableCell>
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
