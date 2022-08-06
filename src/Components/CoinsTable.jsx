import React from 'react'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { CoinList } from '../config/Api';
import axios from 'axios'
import {CryptoState} from '../CryptoContext'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, LinearProgress, Table, TableCell, TableContainer, TableHead, TableBody, TableRow, TextField, Typography, Pagination } from '@mui/material';
import './CoinTable.css';



const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

function CoinsTable() {
    const navigate = useNavigate();
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [page , setPage] = useState(1);
    const {currency, symbol} = CryptoState();
    
    const fetchCoins = async () => {
        setLoading(true);
        const {data} = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    };

    useEffect( () => {
        fetchCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [currency]);

    const handleSearch = () => {
        return coins.filter( (coin) => (
            coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase())
        ));
        }
  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign: 'center'}}>
            <Typography variant="h4" style={{margin: 18, fontFamily: 'Montserrat'}}>
                Crypto Currency Prices
            </Typography>
            <TextField label="Search For CryptoCurrency" variant="outlined" style={{width: '100%', marginBottom: 20}} 
            onChange={ (e) => setSearch(e.target.value)}/>
            <TableContainer>
                {
                    loading ? (
                        <LinearProgress style={{backgroundColor: 'black'}} />
                    ) : (
                        <Table>
                            <TableHead style={{backgroundColor: "#e89e30"}}>
                                <TableRow>
                                    {
                                        ["Coin", "Price", "Market Cap", "24h"].map( (head) => (
                                            <TableCell style={{fontFamily: 'Montserrat', color: 'black', fontWeight: "700" }} key={head}>
                                                {head}
                                            </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    handleSearch().slice((page-1) * 10 , (page-1)*10+10).map( (row) => {
                                        const profit = row.price_change_percentage_24h > 0 ;

                                        return (
                                            <TableRow className='tableRow' key={row.id} onClick={() => navigate(`/coins/${row.id}`)}>
                                                <TableCell style={{fontFamily: 'Montserrat'}}>
                                                    <img src={row.image} alt={row.name} style={{width: 30, height: 30}}/>
                                                    {row.name}
                                                    {" | "}
                                                    {row.symbol.toUpperCase()}
                                                </TableCell>
                                                <TableCell style={{fontFamily: 'Montserrat'}}>
                                                {symbol}{" "}{numberWithCommas(row.current_price.toFixed(2))}
                                                </TableCell>
                                                <TableCell style={{fontFamily: 'Montserrat'}}>
                                                    {symbol}{" "}
                                                    {numberWithCommas(row.market_cap.toString().slice(0,-6))}M
                                                </TableCell>
                                                <TableCell style={{fontFamily: 'Montserrat', color: profit > 0? "green":"red"}}>
                                                    {profit && "+"}
                                                    {row.price_change_percentage_24h.toFixed(2)}%
                                                </TableCell>
                                            </TableRow>

                                        ) 
                                })}   
                            </ TableBody>
                        </Table>
                    )
                }
            </TableContainer>
            <Pagination 
            style={{padding: 10, display: 'flex', justifyContent: 'center', width: '100%'}}
            count={(handleSearch()?.length/10).toFixed(0)}
            onChange={ (_,value) => {setPage(value); window.scrollTo(0,450);}}
            variant="outlined"
            />
        </ Container>
    </ThemeProvider>
)}

export default CoinsTable;