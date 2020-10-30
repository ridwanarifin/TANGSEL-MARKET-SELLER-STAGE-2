import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetAuth } from '../redux/authSlice';
import { resetUser } from '../redux/userSlice';

export const deleteUserLogout = async (dispatch) => {
  await AsyncStorage.clear()
  .then(() => {
    dispatch(resetAuth());
    dispatch(resetUser());
  })
}
