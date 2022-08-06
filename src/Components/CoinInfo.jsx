import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/Api";
import { chartDays } from "../config/Data";
import { CryptoState } from "../CryptoContext";
import SelectButton from '../Components/SelectButton'
import {ThemeProvider} from '@mui/material/styles';
import {CircularProgress, createTheme} from '@mui/material';
import {Line} from 'react-chartjs-2'
import { Chart, CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend } from 'chart.js';


  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


function CoinInfo({coin}) {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag,setflag] = useState(false);

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);


  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        {
          !historicData | flag===false ? (
            <CircularProgress size={250} thickness={1} style={{color: "gold"}} />
          ) : (
            <>
              <Line 
                data={{
                  labels: historicData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days === 1 ? time : date.toLocaleDateString();
                  }),
                  datasets: [
                    {
                      data: historicData.map((coin) => coin[1]),
                      label: `Price ( Past ${days} Days ) in ${currency}`,
                      borderColor: "#EEBC1D",
                    },
                  ],
                }}
                options={{
                  elements: {
                    point: {
                      radius: 1,
                    },
                  },
                }}
                />
            <div style={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
              marginTop: 20
            }}>
                {
                  chartDays.map((day) => (
                    <SelectButton
                    value={day.value}
                    onClick={() => setDays(day.value)}
                    selected={days === day.value}
                    >
                      {day.label}
                    </SelectButton>
                  ))
                }
            </div>
            </>
          )
        }
      </div>
    </ThemeProvider>
  )
}

export default CoinInfo