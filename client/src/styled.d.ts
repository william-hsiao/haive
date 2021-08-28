import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string;
    primaryLight: string;
    primaryDark: string;

    text: string;
    primaryText: string;
    primaryLightText: string;

    fontSize: string;

    sidebarWidth: string;
    headerHeight: string;
  }
}
