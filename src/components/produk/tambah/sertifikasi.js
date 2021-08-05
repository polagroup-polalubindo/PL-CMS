import React, { useEffect, useState } from 'react'
import {
  Grid,
  Button,
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

export default function Sertifikasi({ data, deleteSertifikasi, sertifikasiIndex, handleFile, lengthData }) {
  const hiddenFileInput = React.useRef(null);
  const [File, setFile] = useState(null);

  useEffect(() => {
    if (data && data.ProdukId) {
      let pathFile = data.path && data.path.split('/')
      setFile(pathFile ? pathFile[pathFile.length - 1] : null)
    } else {
      setFile(data)
    }
  }, [data])

  return (
    <>
      <Grid style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
        <Button
          variant="outlined"
          color="transparent"
          onClick={() => hiddenFileInput.current.click()}
          style={{ width: 300 }}
        >
          {
            File
              ? (File.name
                ? `${File.name.slice(0, 15)} ... ${File.name.slice(File.name.length - 8, File.name.length)}`
                : `${File.slice(0, 15)} ... ${File.slice(File.length - 8, File.length)}`)
              : ' + Tambah File Sertifikasi'
          }
        </Button>
        <input
          ref={hiddenFileInput}
          type="file"
          accept=".pdf"
          onChange={handleFile('sertifikat', sertifikasiIndex)}
          hidden
        />
        <DeleteIcon style={{ color: "red", marginLeft: 20, cursor: 'pointer' }} onClick={() => deleteSertifikasi(sertifikasiIndex)} />
      </Grid>
    </>
  )
}
