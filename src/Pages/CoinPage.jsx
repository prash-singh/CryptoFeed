import {React, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import { SingleCoin } from '../config/Api';
import { LinearProgress, Typography } from '@mui/material';
import axios from 'axios';
import CoinInfo from '../Components/CoinInfo';
import parse from 'html-react-parser';
import { numberWithCommas } from '../Components/CoinsTable';

function CoinPage() {

  const {id} = useParams();
  const [coin, setCoin] = useState({});
  const {currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    const {data} = await axios.get(SingleCoin(id));
    setCoin(data);
  }
  useEffect(() => {
    fetchCoins();
  }
  , [ ]);

  if(!coin.market_data) return <LinearProgress style={{backgroundColor: "gold"}}/>;

  return (
    <div className='container'>
      <div className='sidebar'>
        <img src={coin?.image.large} alt={coin.name} height="200" style={{marginBottom: 20}} />
        <Typography variant="h4" style={{marginBottom: 20}}>{coin.name}</Typography>
        <Typography variant="h5" style={{marginBottom: 20}}>{"Rank = "}{numberWithCommas(coin?.market_cap_rank)}</Typography>
        <Typography variant="h5" style={{marginBottom: 20}}>{"Price = "}{symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}</Typography>
        <Typography variant="h5" style={{marginBottom: 20}}>{"Market Cap = "}{numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6))}{"M"} </ Typography>
        <Typography variant="h6" style={{marginBottom: 20}}>{parse(coin.description.en)}</Typography>
      </div>
      <CoinInfo coin={coin} />
    </div>
  )
}

export default CoinPage