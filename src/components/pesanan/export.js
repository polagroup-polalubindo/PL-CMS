import React, { useContext } from "react";
import { Button } from '@material-ui/core';
import ReactExport from "react-data-export";
import { CMSContext } from "../../context/state";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const labelValue = [
  {
    label: 'No.',
    value: 'no'
  }, {
    label: 'Order Id',
    value: 'orderId'
  }, {
    label: 'Invoice',
    value: 'invoice'
  }, {
    label: 'Transaction Date',
    value: 'transactionDate'
  }, {
    label: 'Order Status',
    value: 'status'
  }, {
    label: 'Recipient',
    value: 'recipient'
  }, {
    label: 'Recipient Number',
    value: 'recipientNumber'
  }, {
    label: 'Recipient Address',
    value: 'recipientAddress'
  }, {
    label: 'Courier',
    value: 'kurir'
  }, {
    label: 'Jenis Layanan',
    value: 'jenisLayanan'
  }, {
    label: 'Total Shipping Fee (Rp.)',
    value: 'totalShipping'
  }, {
    label: 'Insurance Fee (Rp.)',
    value: 'insuranceFee'
  }, {
    label: 'Total Amount (Rp.)',
    value: 'total'
  }, {
    label: 'Resi',
    value: 'resi'
  },
]

export default function Export({ keyword, range, date, status }) {
  const { fetchDataTransaksiForDownload, dataTransaksiForDownload } = useContext(CMSContext);

  const getData = async () => {
    let query = `?keyword=${keyword}&range=${range}&date=${date}&status=verified`
    if (status !== 'semua pesanan') {
      if (status === "pesanan di tolak") {
        query += `&statusPesanan=${status}`
      } else if (status === "pesanan baru") {
        query += `&statusPesanan=menunggu konfirmasi`
      } else {
        query += `&statusPengiriman=${status}`
      }
    }
    await fetchDataTransaksiForDownload(query)
  }

  return (
    <ExcelFile filename={`Pesanan-${range}-${date}-${Date.now()}`} element={<Button variant="outlined" style={{ marginLeft: 10 }} onClick={getData} disableElevation>unduh laporan penjualan</Button>}>
      <ExcelSheet data={dataTransaksiForDownload} name="All">
        {
          labelValue.length > 0 && labelValue.map((el, index) => (
            <ExcelColumn label={el.label} value={el.value} key={index} />
          ))
        }
      </ExcelSheet>
    </ExcelFile>
  )
}
