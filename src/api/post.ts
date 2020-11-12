// @ts-nocheck
import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { cancelToken } from "./axios";
import _ from 'lodash';
import qs from 'querystring';
import { getUserMe, getUserMeDispatch } from "./get";

export const postRegisterMarket = createAsyncThunk(
  'users/postRegisterMarket',
  async ({
    email,
    password,
    c_password,
    nik,
    province,
    regency,
    avatar
  }, { signal, rejectWithValue }) => {
    signal.addEventListener('abort', function () {
      cancelToken.cancel();
    })
    try {
      const response = await axios.post(
        '/api/register-market',
        qs.stringify({
          email,
          password,
          c_password,
          nik,
          province,
          regency,
          avatar
        })
      )
      return response.data
    } catch (error) {
      if (!error.response && !error.response.data) {
        return rejectWithValue(error)
      }
      return rejectWithValue(error.response.data)
    }
  }
);

export const postLoginMarket = createAsyncThunk(
  'users/loginMarket',
  async (formData: { email: string, password: string }) => {
    try {
      const response = await axios.post('/api/auth/jwt/create', qs.stringify(formData))
      await AsyncStorage.setItem('@auth', JSON.stringify(_.assign(response.data, formData)))
      return response.data
    } catch (error) {
      if (!error.response && !error.response.data) {
        return rejectWithValue(error)
      }
      return rejectWithValue(error.response.data)
    }
  }
);

export const postLogin = (formData) => {
  return new Promise((resolve, reject) => {
    axios.post(
      '/api/login-market',
      qs.stringify(formData)
    )
    .then(response => {
      if (response.data) {
        AsyncStorage.setItem('@auth', JSON.stringify(_.assign(response.data, formData)))
        resolve(response.data);
      }
    })
    .catch(err => { reject(err) })
  })
}
