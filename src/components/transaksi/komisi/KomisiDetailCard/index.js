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

  const formatRupiah = (harga) => {
    let reverse = harga.toString().split('').reverse().join('');
    let ribuan = reverse.match(/\d{1,3}/g);

    return `Rp. ${ribuan.join('.').split('').reverse().join('')}`;
  }

  return (
    <>
      <TableRow style={{ backgroundColor: '#f3f3f3' }}>
        <TableCell>
          {
            item?.transaksi && <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setDropDown(!dropDown)}
            >
              {dropDown ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          }
        </TableCell>
        <TableCell>{item.id}</TableCell>
        <TableCell>{item?.User?.nama}</TableCell>
        <TableCell>{formatRupiah(item.totalKomisi)}</TableCell>
        <TableCell>status</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ marginBottom: 50, paddingBottom: dropDown ? 10 : 0, paddingTop: dropDown ? 10 : 0 }} colSpan={6}>
          <Collapse in={dropDown} unmountOnExit style={{}}>
            <Box style={{ marginBottom: 10 }}>
              <Typography variant="h6" gutterBottom>
                History
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: '10%' }}>User Id</TableCell>
                    <TableCell style={{ width: '20%' }}>Member</TableCell>
                    <TableCell style={{ width: '15%' }}>Transaksi Id</TableCell>
                    <TableCell style={{ width: '20%' }}>Invoice</TableCell>
                    <TableCell style={{ width: '20%' }}>Total Transaksi</TableCell>
                    <TableCell style={{ width: '15%' }}>Tanggal Transaksi</TableCell>
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
                        <TableCell>{formatRupiah(el.Transaksi?.totalHarga)}</TableCell>
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
