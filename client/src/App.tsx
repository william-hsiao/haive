import React, { FC } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { styledComponentTheme } from '@/theme';
import { routePaths } from '@/routePaths';
import SidebarLayout from '@/components/layouts/Sidebar';

const GlobalStyle = createGlobalStyle`
  html, body {
    color: ${(props) => props.theme.text};
    font-size: ${(props) => props.theme.fontSize};
    margin: 0;
    padding: 0;
  }
`;

const Sidebar = styled(SidebarLayout)`
  z-index: 1;
`;

const Main = styled.main`
  margin-left: ${(props) => props.theme.sidebarWidth};
  margin-top: ${(props) => props.theme.headerHeight};
  padding: 2rem;
`;

const Header = styled.div`
  box-shadow: 0 0 5px 5px #c5c4c4;
  height: ${(props) => props.theme.headerHeight};
  left: ${(props) => props.theme.sidebarWidth};
  position: fixed;
  right: 0;
  top: 0;
`;

const App: FC = () => {
  return (
    <ThemeProvider theme={styledComponentTheme}>
      <GlobalStyle />

      <Router>
        <Sidebar />
        <Header />

        <Main>
          <Switch>
            <Route path={routePaths.matrix}>Matrix</Route>
            <Route path={routePaths.teams}>Teams</Route>
            <Route path={routePaths.root}>Home</Route>
          </Switch>
        </Main>
      </Router>
    </ThemeProvider>
  );
};

export default App;
