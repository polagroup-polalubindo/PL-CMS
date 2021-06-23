import React, { useEffect, useState, useContext } from 'react'
import { TextField, Button, CircularProgress, InputAdornment, Typography } from '@material-ui/core';

import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';

import Swal from 'sweetalert2';
import { CMSContext } from "../../context/state";


export default function Index(props) {
  const [Username, setUsername] = useState(null)
  const [Password, setPassword] = useState(null)
  const [Proses, setProses] = useState(false)
  const { login, userData } = useContext(CMSContext);

  useEffect(() => {
    if (localStorage.getItem('access_token_CMS')) {
      props.history.push('/produk')
    }
  }, [])


  const signin = async (e) => {
    e.preventDefault();

    setProses(true)
    try {
      await login({ email: Username, password: Password })

      if (userData) {
        if (userData.nama.toLowerCase() === 'sae') props.history.push('/transaksi')
        else if (userData.nama.toLowerCase() === 'ss') props.history.push('/pesanan')
        else props.history.push('/produk')
      } else {
        props.history.push('/produk')
      }
    } catch (err) {
      if (err = "Not admin") {
        Swal.fire({
          title: "Anda bukan admin !",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Anda bukan admin !",
          icon: "error",
        });
      }
    }

    setProses(false)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '5% 0 0 auto' }}>
      <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <Typography style={{ margin: 10, fontSize: 13 }}>SIGN IN ADMIN</Typography>

        <form noValidate autoComplete="off" onSubmit={signin} style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            id="username"
            label="Username"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end"><MailIcon /></InputAdornment>,
            }}
            style={{ marginBottom: 15 }}
            disabled={Proses}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end"><LockIcon /></InputAdornment>,
            }}
            disabled={Proses}
          />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ margin: '20px 0', width: 100, alignSelf: 'center' }}
              data-testid='buttonSignin'
              disabled={Proses}>
              Sign In </Button>
            {Proses && <CircularProgress size={24} style={{
              color: 'blue',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: -12,
              marginLeft: -12,
            }} />}
          </div>
        </form>
      </div>
    </div>
  )
}
