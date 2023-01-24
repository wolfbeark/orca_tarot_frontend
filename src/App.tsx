/* eslint-disable */
import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import { Outlet, useLocation } from 'react-router-dom';
import { ERROR_ACCESS } from 'common_resources/ErrorMessage';
import { LightTheme } from 'common_resources/Theme';
import { useRecoilState } from 'recoil';
import { totalManagerAtom } from 'recoil/TotalAtom';
import TopNavBar from 'components/common_res/TopNavBar';
import RightPannel from 'components/common_res/RightPannel';

const AppContainer = styled.div`
  width: 100vw;
  height: auto;
  position: relative;
`

function App() {
  const {access_fail} = ERROR_ACCESS;
  const [totalManager, setTotalManager] = useRecoilState(totalManagerAtom);
  const location = useLocation();
  useEffect(()=>{
    let _totalManager = JSON.parse(JSON.stringify(totalManager));
    _totalManager.wheight = window.innerHeight;
    setTotalManager(_totalManager);
  }, [])
  return (
    <ThemeProvider theme={LightTheme}>
      <AppContainer>
        {
          location.pathname !== '/login'
          &&
          <TopNavBar />
        }
        {/* {
          location.pathname !== '/login'
          &&
          <RightPannel />
        } */}
        <Outlet />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
