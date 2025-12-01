// 토스 디자인 시스템 스타일 테마

export const colors = {
  // Primary
  primary: '#3182F6',
  primaryHover: '#1B64DA',
  primaryPressed: '#1957C2',

  // Grayscale
  gray900: '#191F28',
  gray800: '#333D4B',
  gray700: '#4E5968',
  gray600: '#6B7684',
  gray500: '#8B95A1',
  gray400: '#B0B8C1',
  gray300: '#C9CDD2',
  gray200: '#E5E8EB',
  gray100: '#F2F4F6',
  gray50: '#F9FAFB',

  // Semantic
  white: '#FFFFFF',
  background: '#F9FAFB',
  error: '#F04452',
  success: '#14C276',
  warning: '#FFAA00',

  // Weather
  sunny: '#FFB900',
  cloudy: '#8B95A1',
  rainy: '#3182F6',
  snowy: '#E5E8EB'
};

export const typography = {
  // Heading
  h1: {
    fontSize: '32px',
    fontWeight: '700',
    lineHeight: '42px'
  },
  h2: {
    fontSize: '24px',
    fontWeight: '700',
    lineHeight: '32px'
  },
  h3: {
    fontSize: '20px',
    fontWeight: '600',
    lineHeight: '28px'
  },

  // Body
  body1: {
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '24px'
  },
  body2: {
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '20px'
  },

  // Label
  label1: {
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '24px'
  },
  label2: {
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '20px'
  },

  // Caption
  caption: {
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '16px'
  }
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px'
};

export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  round: '9999px'
};

export const shadows = {
  small: '0 1px 3px rgba(0, 0, 0, 0.12)',
  medium: '0 4px 16px rgba(0, 0, 0, 0.08)',
  large: '0 8px 24px rgba(0, 0, 0, 0.12)'
};

export const transitions = {
  fast: '0.15s ease-in-out',
  normal: '0.2s ease-in-out',
  slow: '0.3s ease-in-out'
};
