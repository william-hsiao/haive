import React, { FC } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom';

import { styledComponentTheme } from '@/theme';
import { routePaths } from '@/routePaths';
import { GlobalProvider } from '@/context/GlobalContext';
import SidebarLayout from '@/components/layouts/Sidebar';

import MatrixPage from '@/pages/Matrix';

const GlobalStyle = createGlobalStyle`
  html, body {
    color: ${(props) => props.theme.colours.text};
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: ${(props) => props.theme.fontSize};
    margin: 0;
    padding: 0;
  }
`;

const Sidebar = styled(SidebarLayout)`
  z-index: 150;
`;

const Main = styled.main`
  margin-left: ${(props) => props.theme.sidebarWidth};
  margin-top: ${(props) => props.theme.headerHeight};
  padding: ${(props) => props.theme.mainPadding};
  position: relative;
`;

const Header = styled.div`
  background-color: ${(props) => props.theme.colours.white};
  box-shadow: 0 0 0.5rem 0.2rem ${(props) => props.theme.colours.grey20};
  height: ${(props) => props.theme.headerHeight};
  left: ${(props) => props.theme.sidebarWidth};
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
`;

const DepartmentRouter: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        Department Home
      </Route>
      <Route path={`${path}${routePaths.matrix}`}>
        <MatrixPage />
      </Route>
      <Route path={`${path}${routePaths.teams}`}>Teams</Route>
    </Switch>
  );
};

const App: FC = () => {
  return (
    <Switch>
      <Route path={routePaths.login}>Login</Route>

      <Route path={routePaths.root}>
        <Sidebar />
        <Header />

        <Main>
          <Switch>
            <Route exact path={routePaths.root}>
              Home
            </Route>
            <Route path={routePaths.departmentId}>
              <DepartmentRouter />
            </Route>
          </Switch>
        </Main>
      </Route>
    </Switch>
  );
};

const AppWrapper: FC = () => {
  return (
    <Router>
      <ThemeProvider theme={styledComponentTheme}>
        <GlobalStyle />
        <GlobalProvider>
          <App />
        </GlobalProvider>
      </ThemeProvider>
    </Router>
  );
};

export default AppWrapper;
