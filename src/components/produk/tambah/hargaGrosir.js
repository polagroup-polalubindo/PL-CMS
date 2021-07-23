import React, { Component } from 'react'
import {
  Grid,
  Typography,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

export default class hargaGrosir extends Component {
  state = {
    newHargaGrosir: []
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== prevProps.data) {
      this.setState({ newHargaGrosir: this.props.data })
    }
  }

  addHargaGrosir = async () => {
    let newData = this.state.newHargaGrosir
    newData.push({
      banyaknya: '',
      harga: ''
    })
    this.setState({ newHargaGrosir: newData })
    this.props.handleSetHargaGrosir(this.state.newHargaGrosir)
  }

  deleteHargaGrosir = async (index) => {
    let newData = this.state.newHargaGrosir
    newData.splice(index, 1)
    this.setState({ newHargaGrosir: newData })
    this.props.handleSetHargaGrosir(this.state.newHargaGrosir)
  }

  handleInputHargaGrosir = (name, index) => async (e) => {
    let newData = this.state.newHargaGrosir
    if (!isNaN(e.target.value)) {
      newData[index][name] = e.target.value
    }
    this.setState({ newHargaGrosir: newData })
    this.props.handleSetHargaGrosir(this.state.newHargaGrosir)
  }

  render() {
    return (
      <Grid>
        {
          this.state.newHargaGrosir.map((el, index) =>
            <Grid style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
              <TextField
                variant="outlined"
                size="small"
                name="banyaknya"
                onChange={this.handleInputHargaGrosir('banyaknya', index)}
                placeholder="Banyaknya"
                value={el.banyaknya || el.banyak}
              />
              &emsp;
              <TextField
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      style={{
                        backgroundColor: "#acacac",
                        height: "2.5rem",
                        maxHeight: "3rem",
                        padding: 15,
                      }}
                    >
                      <p style={{ color: 'white' }}>Rp.</p>
                    </InputAdornment>
                  ),
                  style: {
                    paddingLeft: "0",
                  },
                }}
                name="harga"
                value={el.harga}
                onChange={this.handleInputHargaGrosir('harga', index)}
                placeholder="Harga Satuan"

              />

              &emsp;
              <DeleteIcon style={{ color: 'red', cursor: 'pointer' }} onClick={() => this.deleteHargaGrosir(index)} />
            </Grid>
          )
        }


        <Typography
          variant="body2"
          component="p"
          style={{ cursor: "pointer", margin: '8px 0px' }}
          onClick={this.addHargaGrosir}
        >
          + Tambah Harga Grosir Baru
        </Typography>
      </Grid>
    )
  }
}
