import {React, createContext, useContext, useState, useEffect} from 'react'


const Crypto = createContext();

const CryptoContext = (props) => {
    const [currency, setCurrency] = useState('INR');
    const [symbol, setSymbol] = useState('₹');

    useEffect(() => {
        if(currency === 'INR') {    
            setSymbol('₹');
        } else if(currency === 'USD') {
            setSymbol('$');
        } else if(currency === 'EUR') {
            setSymbol('€');
        }
    } , [currency]);

  return (
    <Crypto.Provider value={{currency,symbol,setCurrency}}>
        {props.children}
    </Crypto.Provider>
  )
}

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto)
}