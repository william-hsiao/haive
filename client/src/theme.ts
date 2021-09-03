import { createGlobalStyle, css } from 'styled-components';

const colours = {
  transparent: 'transparent',
  white: '#FFFFFF',
  grey10: '#F8F9FA',
  grey20: '#E9ECEF',
  grey30: '#DEE2E6',
  grey40: '#CED4DA',
  grey50: '#ADB5BD',
  grey60: '#6C757D',
  grey70: '#495057',
  grey80: '#343A40',
  grey90: '#212529',
  black: '#000000',

  primary10: '#CAF0F8',
  primary20: '#ADE8F4',
  primary30: '#90E0EF',
  primary40: '#00B4D8',
  primary50: '#00B4D8',
  primary60: '#0096C7',
  primary70: '#0077B6',
  primary80: '#023E8A',
  primary90: '#03045E',

  text: '#2e444e',
  textLight: '#fff',
  textDark: '#000',
};

const styles = {
  fontSize: '14px',
  fontFamily: '"Open Sans", Tahoma, Geneva, Verdana, sans-serif',

  borderRadius: '0.25rem',

  textColour: colours.grey80,
  textLightColour: colours.white,
  textDarkColour: colours.black,
};

const mixins = {
  outline: css`
    outline: none;

    &:active,
    &:focus {
      box-shadow: 0 0 3px ${() => colours.primary40} inset;
    }
  `,
};

export const styledComponentTheme = {
  colours,
  styles,
  mixins,

  navSidebarWidth: '6rem',
  innerSidebarWidth: '15rem',
  headerHeight: '5rem',
};

export const GlobalStyle = createGlobalStyle`
  html, body {
    color: ${(props) => props.theme.styles.textColour};
    font-family: ${(props) => props.theme.styles.fontFamily};
    font-size: ${(props) => props.theme.styles.fontSize};
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    ${(props) => props.theme.mixins.outline}
  }
`;
