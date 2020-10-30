
// @ts-nocheck
import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import axios, { cancelToken } from "./axios";
import { tokenType } from "../redux/authSlice";

export const getUserMe = createAsyncThunk(
  'user/getUserMe',
  async () => {
    let token = await getToken();
    console.log(token);
    const response = await axios.get('/api/market/profile/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  }
);

export const getToken = async (storage_key='@auth') => {
  try {
    let response = await AsyncStorage.getItem(storage_key);
    response = response && JSON.parse(response)
    // @ts-ignore
    return response.access_token
  } catch (error) {
    Toast.show(`failed getToken ${error.message}`);
  }
}

export const getAsyncAuth = async () => {
  try {
    let response = await AsyncStorage.getItem('@auth');
    response = response && JSON.parse(response);
    return response
  } catch (error) {
    Toast.show(`failed getAsyncToken ${error.message}`);
  }
}