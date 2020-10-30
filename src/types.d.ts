
declare type Mode = 'adaptive' | 'exact';
declare global {
  namespace ReactNativePaper {
      interface ThemeFont {
          fontFamily: string;
          fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
      }
      interface ThemeFonts {
          regular: ThemeFont;
          medium: ThemeFont;
          light: ThemeFont;
          thin: ThemeFont;
      }
      interface ThemeColors {
          primary: string;
          background: string;
          surface: string;
          accent: string;
          error: string;
          text: string;
          onSurface: string;
          onBackground: string;
          disabled: string;
          placeholder: string;
          backdrop: string;
          notification: string;
          link: string;
          textLink: string,
      }
      interface ThemeAnimation {
          scale: number;
      }
      interface Theme {
          dark: boolean;
          mode?: Mode;
          roundness: number;
          colors: ThemeColors;
          fonts: ThemeFonts;
          animation: ThemeAnimation;
      }
  }
}
export {};