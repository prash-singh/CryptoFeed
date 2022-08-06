import React from 'react'
import './Navbar.css'
import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CryptoState } from '../CryptoContext';
import { useNavigate} from 'react-router-dom'


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function Navbar() {
  const navigate = useNavigate();
  const {currency, setCurrency} = CryptoState();
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position="static" style={{marginBottom: 20}}>
        <Container>
          <Toolbar>
            <Typography onClick={() => navigate(`/`)} variant="h6" color="inherit" className='logo'>
              CryptoFeed
            </Typography>
            <Select variant='outlined' style={{ 
              width: 100,
              height: 40,
              marginRight: 15,
            }}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"INR"} selected>INR</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Navbar