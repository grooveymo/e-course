/**
 * Specify theme values here
 */

const colors = {
  base: '#F5F5F0',
  warm: '#F2EEE9',
  cool: '#E8EAED',
  'light-gray': '#D0D0D0',
  'dark-gray': '#333333',
  'medium-gray': '#666666',
  'accent-1': '#6B8E9F',
  'accent-2': '#7C9885',
  'accent-3': '#B57F78',
};

const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '64px',
  xxxl: '128px',
};

const breakpoints = {
  mobile: '575px',
  tablet: '767px',
  smallDesktop: '991px',
  mediumDesktop: '1199px',
  largeDesktop: '1200px',
};

const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet})`,
  smallDesktop: `@media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.smallDesktop})`,
  mediumDesktop: `@media (min-width: ${breakpoints.smallDesktop}) and (max-width: ${breakpoints.mediumDesktop})`,
  largeDesktop: `@media (min-width: ${breakpoints.largeDesktop})`,
};

export const theme = {
  colors,
  spacing,
  breakpoints,
  media,
};
