import { createChart, CrosshairMode } from 'lightweight-charts';
import { useEffect, useRef, useState } from 'react';
import { unix } from 'moment';

import { useSwapContext, useTokenMap } from '@serum/swap-ui';
import { chart_api_key } from '../utils';
import { useScreenSize } from '../../utils/screenSize';

const Chart = () => {
  const [data, setData] = useState<boolean>(true);
  const { fromMint, toMint } = useSwapContext();
  const tokenMap = useTokenMap();
  const fromTokenInfo = tokenMap.get(fromMint.toString());
  const toTokenInfo = tokenMap.get(toMint.toString());
  const { isLaptop } = useScreenSize();

  // eslint-disable-next-line max-len
  const chart_pair_api = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${fromTokenInfo?.symbol}&tsym=${toTokenInfo?.symbol}&limit=1000&api_key=${chart_api_key}`;
  const chartContainerRef = useRef() as any;
  const chart = useRef() as any;

  useEffect(() => {
    chartContainerRef.current.children.length > 0 ? chart.current.remove() : null;

    chart.current = createChart(chartContainerRef.current, {
      width: !isLaptop ? 520 : 0,
      height: !isLaptop ? 400 : 350,
      layout: {
        backgroundColor: '#1B2341',
        textColor: 'rgba(255, 255, 255, 0.9)',
      },
      grid: {
        vertLines: {
          color: '#334158',
        },
        horzLines: {
          color: '#334158',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      timeScale: {
        borderColor: '#485c7b',
      },
    });
    const candles = chart.current.addCandlestickSeries({
      upColor: '#4bffb5',
      downColor: '#ff4976',
      borderDownColor: '#ff4976',
      borderUpColor: '#4bffb5',
      wickDownColor: '#838ca1',
      wickUpColor: '#838ca1',
    });
    const histogram = chart.current.addHistogramSeries({
      color: '#485c7b',
      lineWidth: 2,
      priceFormat: {
        type: 'volume',
      },
      overlay: true,
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    fetch(chart_pair_api)
      .then(response => response.json())
      .then(data => {
        if (data.Response === 'Error') {
          setData(false);

          return chart.current.remove();
        }
        setData(true);
        const prepared = data?.Data?.Data?.map(({ time, low, high, open, close, volumefrom }) => {
          return {
            time: unix(time).format('YYYY-MMM-DD'),
            low,
            high,
            open,
            close,
            value: volumefrom,
          };
        });
        candles.setData(prepared);
        histogram.setData(prepared);
      })
      .catch(error => {
        console.error(error);
      });
  }, [fromMint, toMint]);

  return (
    <section>
      <div ref={chartContainerRef} className="chart-container" />
      {!data ? (
        <h1 style={{ minWidth: 580, minHeight: 400, textAlign: 'center', lineHeight: '400px' }}>
          There is no data for this pair
        </h1>
      ) : null}
    </section>
  );
};

export { Chart };
