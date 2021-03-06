import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import TradePage from './srm-pages/TradePage';
import OpenOrdersPage from './srm-pages/OpenOrdersPage';
import BalancesPage from './srm-pages/BalancesPage';
import ConvertPage from './srm-pages/ConvertPage';
import ListNewMarketPage from './srm-pages/ListNewMarketPage';
import NewPoolPage from './srm-pages/pools/NewPoolPage';
import PoolPage from './srm-pages/pools/PoolPage';
import PoolListPage from './srm-pages/pools/PoolListPage';
import StakingPage from './pages/staking';
// import { getTradePageUrl } from './srm-utils/markets';
import DesignSystemPage from './srm-pages/DesignSystemPage';
import SwapPage from './pages/swap';
import SwapContainer from './pages/swap/components/SwapContainer';
import WithdrawPage from './pages/withdraw';
import { LiquidityContainer } from './pages/liquidity';
import TradingView from './pages/trading-view';
// import { useConnection } from './srm-utils/connection';
// import { getAllRaydiumPoolKeys } from './utils/raydiumRequests';

export function Routes() {
  // const connection = useConnection();

  // useEffect(() => {
  //   console.log('getAllRaydiumPoolKeys() in App()..');
  //   getAllRaydiumPoolKeys(connection).then(poolKeys => {
  //     // setRaydiumPoolKeys(poolKeys);
  //     localStorage.setItem('poolKeys', JSON.stringify(poolKeys));
  //   });
  // }, []);

  return (
    <>
      <HashRouter basename={'/'}>
        <Switch>
          <Route exact path="/">
            {/* <Redirect to={getTradePageUrl()} /> */}
            <Redirect to="/swap" />
          </Route>
          <Route exact path="/market/:marketAddress">
            <TradePage />
          </Route>
          <Route exact path="/orders" component={OpenOrdersPage} />
          <Route exact path="/balances" component={BalancesPage} />
          <Route exact path="/convert" component={ConvertPage} />
          <Route exact path="/list-new-market" component={ListNewMarketPage} />
          <Route exact path="/pools">
            <PoolListPage />
          </Route>
          <Route exact path="/pools/new">
            <NewPoolPage />
          </Route>
          <Route exact path="/pools/:poolAddress">
            <PoolPage />
          </Route>
          <Route exact path="/design-system">
            <DesignSystemPage />
          </Route>
          {/* <Route exact path="/swap">
            <SwapPage />
          </Route> */}
          <Route exact path="/withdraw">
            <WithdrawPage />
          </Route>
          <Route exact path="/staking">
            <StakingPage />
          </Route>
          <SwapPage>
            <Route exact path="/swap">
              <SwapContainer location={'swap'} />
            </Route>
            <Route exact path="/liquidity">
              <LiquidityContainer />
            </Route>
            <Route exact path="/trading-view">
              <TradingView />
            </Route>
          </SwapPage>
        </Switch>
      </HashRouter>
    </>
  );
}
