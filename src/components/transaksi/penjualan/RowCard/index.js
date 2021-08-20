import React from "react";
import { TextField, TableCell, TableRow, MenuItem } from "@material-ui/core";

export const RowCard = ({ item, handleVerified, handleTolak }) => {
  return (
    <TableRow>
      <TableCell>{item.createdAt}</TableCell>
      <TableCell>{item.id}</TableCell>
      <TableCell>{item.Carts[0]?.User?.nama}</TableCell>
      <TableCell>{item.invoice}</TableCell>
      <TableCell>{item.metodePembayaran}</TableCell>
      <TableCell>{item.namaRekening}</TableCell>
      <TableCell>{item.bankAsal}</TableCell>
      <TableCell>{item.bankTujuan}</TableCell>
      <TableCell>Rp. {item.totalHarga}</TableCell>
      <TableCell>{item.statusPembayaran}</TableCell>
      {item.statusPembayaran === "menunggu konfirmasi" ? (
        <TableCell>
          <TextField
            id="outlined-select-currency"
            select
            variant="outlined"
            size="small"
          >
            <MenuItem value="verified" onClick={() => handleVerified(item)}>
              Verified
            </MenuItem>
            <MenuItem value="tolak" onClick={() => handleTolak(item)}>
              Tolak
            </MenuItem>
          </TextField>
        </TableCell>
      ) : (
        ""
      )}
    </TableRow>
  );
};
