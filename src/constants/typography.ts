export const fontFamily = {
  heading: 'var(--font-inter)',
  body: 'var(--font-inter)',
  monospace: 'var(--font-jetbrains-mono)',
} as const;

export const typography = {
  heading: {
    h1: {
      fontFamily: fontFamily.heading,
      fontSize: '48px',
      lineHeight: '48px',
      letterSpacing: '-1.5px',
      fontWeight: 600,
    },
    h2: {
      fontFamily: fontFamily.heading,
      fontSize: '30px',
      lineHeight: '30px',
      letterSpacing: '-1px',
      fontWeight: 600,
    },
    h3: {
      fontFamily: fontFamily.heading,
      fontSize: '24px',
      lineHeight: '28.8px',
      letterSpacing: '-1px',
      fontWeight: 600,
    },
    h4: {
      fontFamily: fontFamily.heading,
      fontSize: '20px',
      lineHeight: '24px',
      letterSpacing: '0px',
      fontWeight: 600,
    },
  },
  paragraph: {
    regular: {
      fontFamily: fontFamily.body,
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0px',
      fontWeight: 400,
    },
    medium: {
      fontFamily: fontFamily.body,
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0px',
      fontWeight: 500,
    },
    bold: {
      fontFamily: fontFamily.body,
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0px',
      fontWeight: 600,
    },
    small: {
      fontFamily: fontFamily.body,
      fontSize: '14px',
      lineHeight: '21px',
      letterSpacing: '0.5px',
      fontWeight: 400,
    },
    smallMedium: {
      fontFamily: fontFamily.body,
      fontSize: '14px',
      lineHeight: '21px',
      letterSpacing: '0.5px',
      fontWeight: 500,
    },
    mini: {
      fontFamily: fontFamily.body,
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: '1.5px',
      fontWeight: 400,
    },
    miniMedium: {
      fontFamily: fontFamily.body,
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: '1.5px',
      fontWeight: 500,
    },
    miniBold: {
      fontFamily: fontFamily.body,
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: '1.5px',
      fontWeight: 600,
    },
  },
  monospace: {
    fontFamily: fontFamily.monospace,
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0px',
    fontWeight: 400,
  },
} as const;

export type HeadingLevel = keyof typeof typography.heading;
export type ParagraphVariant = keyof typeof typography.paragraph;
