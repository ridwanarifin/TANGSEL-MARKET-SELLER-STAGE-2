import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Auth: undefined;
  Root: undefined;
  NotFound: undefined;
  JasaKirimModal: any;
};

export type BottomTabParamList = {
  Beranda: undefined;
  Pesanan: any;
  Notifikasi: any;
  Chat: any;
  Account: any;
};

export type AuthParamList = {
  LoginScreen: undefined
  SignUpScreen: undefined
  BiodataSignUpScreen: {
    fullname?: string
    nik?: string
  } | undefined
}

export type HomeStackParamList = {
  HomeScreen: any
  KategoriScreen: undefined

  DetilScreen: any
};

export type PesananStackParamList = {
  PesananMasukScreen: any
  DetilPesananScreen: any
}

export type JasaKirimModalParamList = {
  JasaKirimModalScreen: any
  JasaKirimModalDetilScreen: any
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
export type HomeScreenRouteProp                 = RouteProp<HomeStackParamList, 'HomeScreen'> & JasaKirimModalRouteProp;
export type HomeScreenNavigationProp            = StackNavigationProp<HomeStackParamList, 'HomeScreen'> & JasaKirimModalNavigationProp;

export type DetilScreenRouteProp                = RouteProp<HomeStackParamList, 'DetilScreen'>;
export type DetilScreenNavigationProp           = StackNavigationProp<HomeStackParamList, 'DetilScreen'>;


/**
 * Pesanan Type Route & Navigation
 *  PesananMasuk
 *  DetilPesanan
 */
export type PesananMasukScreenRouteProp         = RouteProp<PesananStackParamList, 'PesananMasukScreen'>;
export type PesananMasukScreenNavigationProp    = StackNavigationProp<PesananStackParamList, 'PesananMasukScreen'>;

export type DetilPemesananScreenRouteProp       = RouteProp<PesananStackParamList, 'DetilPesananScreen'>;
export type DetilPemesananScreenNavigationProp  = StackNavigationProp<PesananStackParamList, 'DetilPesananScreen'> & JasaKirimModalNavigationProp;


/**
 * JasaKirimModal Type Route & Navigation
 *  JasaKirim
 */
export type JasaKirimModalRouteProp = RouteProp<JasaKirimModalParamList & RootStackParamList, 'JasaKirimModal'>;
export type JasaKirimModalNavigationProp = StackNavigationProp<JasaKirimModalParamList & RootStackParamList, 'JasaKirimModal'>;
