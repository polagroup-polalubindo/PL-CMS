import React from "react";
import { TextField, TableCell, TableRow, MenuItem } from "@material-ui/core";

export const VoucherCard = ({ item, handleVerified, handleTolak }) => {
  return (
    <TableRow>
      <TableCell>{item.name}</TableCell>
    </TableRow>
  );
};
