import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colours: {
      white: string;
      grey10: string;
      grey20: string;
      grey30: string;
      grey40: string;
      grey50: string;
      grey60: string;
      grey70: string;
      grey80: string;
      grey90: string;
      black: string;

      primary10: string;
      primary20: string;
      primary30: string;
      primary40: string;
      primary50: string;
      primary60: string;
      primary70: string;
      primary80: string;
      primary90: string;
    };

    styles: {
      fontSize: string;

      textColour: string;
      textLightColour: string;
      textDarkColour: string;
    };

    sidebarWidth: string;
    headerHeight: string;
    mainPadding: string;
  }
}
