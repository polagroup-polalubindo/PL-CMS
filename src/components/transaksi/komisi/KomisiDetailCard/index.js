import React, { useState, useContext, useEffect } from "react";
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
  Select,
  MenuItem,
  FormControl
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { CMSContext } from "../../../../context/state";

const DetailCard = ({ item, refresh }) => {
  const [dropDown, setDropDown] = useState(false);
  const [Status, setStatus] = useState(item.status)
  const { updateKomisi } = useContext(CMSContext);

  const formatRupiah = (harga = 0) => {
    let reverse = harga.toString().split('').reverse().join('');
    let ribuan = reverse.match(/\d{1,3}/g);

    return `Rp. ${ribuan.join('.').split('').reverse().join('')}`;
  }

  const changeStatus = async (e) => {
    setStatus(e.target.value)
    await updateKomisi({ status: e.target.value, id: item.id })
    await refresh()
  }

  return (
    <>
      <TableRow style={{ backgroundColor: '#f3f3f3' }}>
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
        <TableCell>{formatRupiah(item.totalKomisi)}</TableCell>
        <TableCell>
          <FormControl variant="outlined" size="small">
            <Select value={Status} onChange={changeStatus} style={{ backgroundColor: '#fff' }}>
              <MenuItem value="Menunggu Transfer">Menunggu Transfer</MenuItem>
              <MenuItem value="Sudah Transfer">Sudah Transfer</MenuItem>
              <MenuItem value="Verified">Verified</MenuItem>
            </Select>
          </FormControl>
        </TableCell>
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
                  {item.TransaksiKomisis.map((el) => (
                    <TableRow key={el.User?.id}>
                      <TableCell>{el.User?.id}</TableCell>
                      <TableCell>{el.User?.nama}</TableCell>
                      <TableCell>{el.transaksiId}</TableCell>
                      <TableCell>{el.Transaksi?.invoice}</TableCell>
                      <TableCell>{formatRupiah(el.Transaksi?.totalHarga)}</TableCell>
                      <TableCell>
                        {el.Transaksi.createdAt}
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
