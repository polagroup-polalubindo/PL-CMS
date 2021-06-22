import React, { useState } from "react";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Collapse,
  Typography,
  IconButton,
  Box,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const DetailCard = ({ item }) => {
  const [dropDown, setDropDown] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setDropDown(!dropDown)}
          >
            {dropDown ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{item.id}</TableCell>
        <TableCell>{item?.User?.nama}</TableCell>
        <TableCell>{item.totalKomisi}</TableCell>
        <TableCell>status</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={dropDown} unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom>
                History
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>User Id</TableCell>
                    <TableCell>Member</TableCell>
                    <TableCell>Transaksi Id</TableCell>
                    <TableCell>Invoice</TableCell>
                    <TableCell>Total Transaksi</TableCell>
                    <TableCell>Tanggal Transaksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item.transaksi && item.transaksi.length > 0 &&
                    item.transaksi.map((el) => (
                      <TableRow key={el.User?.id}>
                        <TableCell>{el.User?.id}</TableCell>
                        <TableCell>{el.User?.nama}</TableCell>
                        <TableCell>{el.transaksiId}</TableCell>
                        <TableCell>{el.Transaksi?.invoice}</TableCell>
                        <TableCell>{el.Transaksi?.totalHarga}</TableCell>
                        <TableCell>
                          {el.Transaksi.createdAt.split("T")[0]}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default DetailCard;
