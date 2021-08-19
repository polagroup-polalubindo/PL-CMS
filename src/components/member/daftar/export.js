import React, { useContext } from "react";
import { Button } from '@material-ui/core';
import ReactExport from "react-data-export";
import { CMSContext } from "../../../context/state";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const labelValue = [
  {
    label: 'No.',
    value: 'no'
  }, {
    label: 'Nama Member',
    value: 'member'
  }, {
    label: 'Tanggal Gabung',
    value: 'join'
  }, {
    label: 'Email',
    value: 'email'
  }, {
    label: 'No HP',
    value: 'hp'
  }, {
    label: 'KTP',
    value: 'ktp'
  }, {
    label: 'NPWP',
    value: 'npwp'
  }, {
    label: 'Total Pembelian',
    value: 'totalBelanja'
  }, {
    label: 'Premier',
    value: 'premier'
  }, {
    label: 'Status Member',
    value: 'status'
  }, {
    label: 'Nama Penerima Komisi',
    value: 'namaPenerimaKomisi'
  }, {
    label: 'Total Komisi',
    value: 'totalKomisi'
  }
]

export default function Export({ keyword }) {
  const { fetchDataMemberForDownload, dataMemberForDownload } = useContext(CMSContext);
  return (
    <ExcelFile filename={`Member-${Date.now()}`} element={<Button variant="outlined" style={{ marginLeft: 10 }} onClick={async () => await fetchDataMemberForDownload(keyword)} disableElevation>unduh laporan penjualan</Button>}>
      <ExcelSheet data={dataMemberForDownload} name="All">
        {
          labelValue.length > 0 && labelValue.map((el, index) => (
            <ExcelColumn label={el.label} value={el.value} key={index} />
          ))
        }
      </ExcelSheet>
    </ExcelFile>
  )
}
