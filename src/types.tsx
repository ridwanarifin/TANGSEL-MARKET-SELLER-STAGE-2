import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Auth: undefined;
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Beranda: undefined;
  Pesanan: any;
  Notifikasi: any;
  Chat: any;
  Account: any;
};

export type HomeStackParamList = {
  HomeScreen: undefined
  JasaKirimScreen: undefined
  JasaKirimDetilScreen: {
    title: string
    data?: Array<string>
  }
  KategoriScreen: undefined

  DetilScreen: any
};

export type PesananStackParamList = {
  PesananMasukScreen: any
}

export type AuthParamList = {
  LoginScreen: undefined
  SignUpScreen: undefined
  BiodataSignUpScreen: {
    fullname?: string
    nik?: string
  } | undefined
}

/**
 * Auth Type Route & Navigation
 *  SignUpScreen
 *  LoginScreen
 */
export type SignUpScreenRouteProp = RouteProp<AuthParamList, 'SignUpScreen'>;
export type SignUpScreenNavigationProp = StackNavigationProp<AuthParamList & RootStackParamList, 'SignUpScreen'>;

export type LoginScreenRouteProp = RouteProp<AuthParamList, 'LoginScreen'>;
export type LoginScreenNavigationProp = StackNavigationProp<AuthParamList & RootStackParamList, 'LoginScreen'>;

export type BiodataSignUpScreenRouteProp = RouteProp<AuthParamList, 'BiodataSignUpScreen'>;
export type BiodataSignUpScreenNavigationProp = StackNavigationProp<AuthParamList & RootStackParamList, 'BiodataSignUpScreen'>;

/**
 * Beranda Type Route & Navigation
 *  HomeScreen
 *  JasaKirimScreen
 *  JasaKirimDetilScreen
 *
 *  DetilScreen
 */
export type HomeScreenRouteProp                 = RouteProp<HomeStackParamList, 'HomeScreen'>;
export type HomeScreenNavigationProp            = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;

export type JasaKirimScreenRouteProp            = RouteProp<HomeStackParamList, 'JasaKirimScreen'>;
export type JasaKirimNavigationProp             = StackNavigationProp<HomeStackParamList, 'JasaKirimScreen'>;

export type JasaKirimDetilScreenRouteProp       = RouteProp<HomeStackParamList, 'JasaKirimDetilScreen'>;
export type JasaKirimDetilScreenNavigationProp  = StackNavigationProp<HomeStackParamList, 'JasaKirimDetilScreen'>;

export type DetilScreenRouteProp                = RouteProp<HomeStackParamList, 'DetilScreen'>;
export type DetilScreenNavigationProp           = StackNavigationProp<HomeStackParamList, 'DetilScreen'>;
