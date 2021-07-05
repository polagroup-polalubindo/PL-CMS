import React from 'react';
import { Button } from '@material-ui/core';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image, Font } from '@react-pdf/renderer';

import LubindoImg from '../assets/lubindo.png';
import TikiImg from '../assets/tiki.png';
import JneImg from '../assets/jne.png';


// Register Font
Font.register({
  family: "Roboto",
  fonts: [
    {
      src:
        "https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmYUtfCRc4EsA.woff2",
      fontWeight: 900
    }
  ]
});

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: '20px',
  },
  container: {
    border: '1px dashed gray',
    minHeight: 210
  },
  header: {
    padding: '8px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid gray',
    fontFamily: 'Roboto',
  },
  body: {
    padding: '5px 10px',
  }
});


export default function LabelPengiriman(props) {
  if (props.data) return (
    <PDFDownloadLink document={<Document>
      <Page size="A4" style={styles.page} >
        {
          props.data.map((el, index) =>
            <View style={{
              width: '50%',
              paddingRight: index % 2 === 0 ? '10px' : '0px',
              paddingLeft: index % 2 === 1 ? '10px' : '0px',
              paddingBottom: '20px'
            }}>
              <View style={styles.container}>
                <View style={styles.header}>
                  <Image source={LubindoImg} style={{ width: 80, height: 20 }} />
                  <Text style={{ fontSize: 11, fontFamily: 'Roboto', fontWeight: 900 }}>Non Tunai</Text>
                </View>
                <View style={styles.body}>
                  <View>
                    <Text style={{ fontSize: 7 }} >{el.invoice}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
                      <View style={{ width: '20%' }}>
                        <View style={{ height: 30 }}>
                          <Image source={el.kurir === 'tiki' ? TikiImg : JneImg} style={{ width: 40, height: 12, marginTop: 5 }} />
                        </View>
                      </View>
                      <View style={{ width: '30%', paddingLeft: 3 }}>
                        <View style={{ height: 28 }}>
                          <Text style={{ fontSize: 9, color: '#585858', marginBottom: 2 }}>{el.kurir === 'tiki' ? 'TIKI' : 'JNE'}</Text>
                          <Text style={{ fontSize: 9 }}>{el.serviceKurir}</Text>
                        </View>
                        <View style={{ height: 28 }}>
                          <Text style={{ fontSize: 9, color: '#585858', marginBottom: 2 }}>Ongkir</Text>
                          <Text style={{ fontSize: 9 }}>Rp. {el.ongkosKirim}</Text>
                        </View>
                      </View>
                      {/* <View style={{ width: '50%', paddingLeft: 10, backgroundColor: 'green' }}>
                        <Text>Barcode</Text>
                      </View> */}
                    </View>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View style={{ width: '50%' }}>
                      <Text style={{ fontSize: 9, color: '#585858', marginBottom: 2 }}>Kepada:</Text>
                      <Text style={{ fontSize: 9, marginBottom: 2 }}>{el.namaPenerima}</Text>
                      <Text style={{ fontSize: 9, color: '#585858' }}>{el.alamatPengiriman}</Text>
                      <Text style={{ fontSize: 9, color: '#585858' }}>{el.telfonPenerima}</Text>
                    </View>
                    <View style={{ width: '50%', paddingLeft: 10 }}>
                      <Text style={{ fontSize: 9, color: '#585858', marginBottom: 2 }}>Dari:</Text>
                      <Text style={{ fontSize: 9 }}>PT Pola Lubindo</Text>
                      <Text style={{ fontSize: 9, color: '#585858'}}>Jl. Penjernihan I No. 40, Bendungan Hilir, Tanah Abang, Jakarta Pusat, 10210</Text>
                      <Text style={{ fontSize: 9, color: '#585858' }}>+6221 5712644</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )
        }
      </Page>
    </Document>} fileName={`Resi-${Date.now()}.pdf`}>
      {({ blob, url, loading, error }) => <Button variant="outlined" color="secondary" style={{ width: '100%' }} disabled={props.data.length === 0 || loading}>
        Unduh Label Pengiriman
      </Button>}
    </PDFDownloadLink>

  )
  else return null
};
