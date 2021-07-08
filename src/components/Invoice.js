import React from 'react';
import { Button } from '@material-ui/core';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';

import LubindoImg from '../assets/lubindo.png';


const styles = StyleSheet.create({
  page: {
    padding: '60px 40px',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 18,
    paddingBottom: 15,
    borderBottom: '1px dashed #a8a8a8'
  },
  tableHeader: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#f6f6f6'
  },
  record: {
    display: 'flex',
    flexDirection: 'row'
  },
  fieldNamaProduk: {
    padding: 10,
    width: '41%',
    fontSize: 9,
    display: 'flex',
    justifyContent: 'center',
    color: '#565656'
  },
  fieldJumlah: {
    padding: 10,
    width: '12%',
    fontSize: 9,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#565656'
  },
  fieldBerat: {
    padding: 10,
    width: '12%',
    fontSize: 9,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#565656'
  },
  fieldHargaBarang: {
    padding: 10,
    width: '17%',
    fontSize: 9,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#565656'
  },
  fieldSubtotal: {
    padding: 10,
    width: '18%',
    fontSize: 9,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#565656'
  },
  container: {
    marginTop: 10,
    border: '1px dashed #a8a8a8',
    padding: 10,
    borderRadius: 5
  }
});

export default function Invoice(props) {
  function getDate(args) {
    args = new Date(args)
    const months = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember'
    ];

    return `${args.getDate()} ${months[args.getMonth()]} ${args.getFullYear()}`;
  }

  function formatRupiah(harga) {
    let reverse = harga.toString().split('').reverse().join('');
    let ribuan = reverse.match(/\d{1,3}/g);

    return `Rp. ${ribuan.join('.').split('').reverse().join('')}`;
  }

  if (props.data) return (
    <PDFDownloadLink document={<Document>
      {
        props.data.map((el, index) =>
          <Page size="A4" style={styles.page} >
            <View id="header" style={styles.header}>
              <View style={{ width: '60%' }}>
                <Image source={LubindoImg} style={{ width: 110, height: 30, marginBottom: 10 }} />
                <Text style={{ fontSize: 9, marginBottom: 5 }}>Nomor Invoice : {el.invoice}</Text>
                <Text style={{ fontSize: 9, marginBottom: 5, color: '#585858' }}>Diterbitan atas nama:</Text>
                <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
                  <Text style={{ fontSize: 9, width: 50 }}>Penjual</Text>
                  <Text style={{ fontSize: 9, color: '#585858' }}>PT Pola Pulindo</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Text style={{ fontSize: 9, width: 50 }}>Tanggal</Text>
                  <Text style={{ fontSize: 9, color: '#585858' }}>{getDate(el.createdAt)}</Text>
                </View>
              </View>
              <View style={{ width: '40%' }}>
                <Text style={{ fontSize: 10, marginBottom: 5 }}>Tujuan Pengiriman:</Text>
                <Text style={{ fontSize: 9, marginBottom: 3 }}>{el.namaPenerima}</Text>
                <Text style={{ fontSize: 9, color: '#585858' }}>{el.alamatPengiriman}</Text>
                <Text style={{ fontSize: 9, color: '#585858' }}>{el.telfonPenerima}</Text>
              </View>
            </View>

            <View id="table" style={{ border: '1px dashed #a8a8a8', borderRadius: 5 }}>
              <View id="table-header" style={styles.tableHeader} >
                <View style={{ ...styles.fieldNamaProduk, color: 'black' }}>
                  <Text>Nama Produk</Text>
                </View>
                <View style={{ ...styles.fieldJumlah, color: 'black' }}>
                  <Text>Jumlah</Text>
                </View>
                <View style={{ ...styles.fieldBerat, color: 'black' }}>
                  <Text>Berat</Text>
                </View>
                <View style={{ ...styles.fieldHargaBarang, color: 'black' }}>
                  <Text>Harga Barang</Text>
                </View>
                <View style={{ ...styles.fieldSubtotal, color: 'black' }}>
                  <Text>Subtotal</Text>
                </View>
              </View>
              <View id="table-body">
                {
                  el.Carts.map(cart =>
                    <View style={styles.record}>
                      <View style={styles.fieldNamaProduk}>
                        <Text>{cart?.Produk?.namaProduk}</Text>
                      </View>
                      <View style={styles.fieldJumlah}>
                        <Text>{cart.qty}</Text>
                      </View>
                      <View style={styles.fieldBerat}>
                        <Text>{cart?.Produk?.weight} gr</Text>
                      </View>
                      <View style={styles.fieldHargaBarang}>
                        {
                          cart.Produk.discount
                            ? <Text>{formatRupiah(cart.Produk.hargaSatuan - ((cart.Produk.discount / 100) * cart.Produk.hargaSatuan))}</Text>
                            : <Text>{formatRupiah(cart.Produk?.hargaSatuan)}</Text>
                        }
                      </View>
                      <View style={styles.fieldSubtotal}>
                        {
                          cart.Produk.discount
                            ? <Text>{formatRupiah((cart.Produk.hargaSatuan - ((cart.Produk.discount / 100) * cart.Produk.hargaSatuan)) * cart.qty)}</Text>
                            : <Text>{formatRupiah(cart.Produk?.hargaSatuan * cart.qty)}</Text>
                        }
                      </View>
                    </View>
                  )
                }
                <View id="subtotal" style={styles.record}>
                  <View style={{
                    padding: 10,
                    width: '82%',
                    fontSize: 10,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end'
                  }}>
                    <Text>Subtotal Harga Barang</Text>
                  </View>

                  <View style={{ ...styles.fieldSubtotal, color: 'black' }}>
                    <Text>{formatRupiah(el.totalHarga - el.ongkosKirim)}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View id="footer" style={{ display: 'flex', flexDirection: 'row' }}>
              <View style={{ width: '60%' }} />
              <View style={{ width: '40%' }}>
                <View id="ongkir" style={styles.container}>
                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #a8a8a8', paddingBottom: 10, marginBottom: 10 }}>
                    <Text style={{ fontSize: 9, color: '#565656', marginBottom: 2 }}>{el.kurir === 'tiki' ? 'TIKI' : 'JNE'} - {el.serviceKurir}</Text>
                    <Text style={{ fontSize: 9, color: '#565656' }}>{formatRupiah(el.ongkosKirim)}</Text>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 10, marginBottom: 2 }}>Subtotal Ongkos Kirim</Text>
                    <Text style={{ fontSize: 10 }}>{formatRupiah(el.ongkosKirim)}</Text>
                  </View>
                </View>

                <View id="totalBelanja" style={{ border: '1px solid #a8a8a8', padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, borderRadius: 5 }}>
                  <Text style={{ fontSize: 10, marginBottom: 2 }}>Total Belanja</Text>
                  <Text style={{ fontSize: 10 }}>{formatRupiah(el.totalHarga)}</Text>
                </View>
              </View>
            </View>
          </Page>
        )}
    </Document>} fileName={`Invoice-${Date.now()}.pdf`}>
      {({ blob, url, loading, error }) => <Button variant="outlined" color="secondary" style={{ width: '100%', marginRight: 20 }} disabled={props.data.length === 0 || loading}>
        Unduh Invoice
      </Button>}
    </PDFDownloadLink>
  )
  else return null
};
