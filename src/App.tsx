/* eslint-disable */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import styled, { DefaultTheme, ThemeProvider } from 'styled-components';
import { Outlet, useLocation } from 'react-router-dom';
import { ERROR_ACCESS } from 'common_resources/ErrorMessage';
import { LightTheme, DarkTheme } from 'common_resources/Theme';
import { useRecoilState } from 'recoil';
import { totalManagerAtom } from 'recoil/TotalAtom';
import TopNavBar from 'components/common_res/TopNavBar';
import RightPannel from 'components/common_res/RightPannel';
import { IWindowScreenInfo } from 'definition/CommonDefinition';

const AppContainer = styled.div`
  width: 100vw;
  height: auto;
  position: relative;
`

function App() {
  const {access_fail} = ERROR_ACCESS;
  const [totalManager, setTotalManager] = useRecoilState(totalManagerAtom);
  const [themeValue, setThemeValue] = useState<boolean>(false);

  const location = useLocation();

  const [screenHeight, setScreenHeight] = useState<IWindowScreenInfo>({wheight : 0});
  useLayoutEffect(()=>{
    const _height = window.innerHeight;
    setScreenHeight({wheight : _height})
  }, [])
  useEffect(()=>{
    let _totalManager = JSON.parse(JSON.stringify(totalManager));
    _totalManager.wheight = window.innerHeight;
    setTotalManager(_totalManager);
  }, [])
  return (
    <ThemeProvider theme={!themeValue ? DarkTheme : LightTheme}>
      <AppContainer>
        {
          location.pathname !== '/login'
          &&
          <TopNavBar setThemeValue={setThemeValue} themeValue={themeValue}/>
        }
        {/* {
          location.pathname !== '/login'
          &&
          <RightPannel />
        } */}
        <Outlet 
          context={{
            windowinfo : screenHeight
          }}
        />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
