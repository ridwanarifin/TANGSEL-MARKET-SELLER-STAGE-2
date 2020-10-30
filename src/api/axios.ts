import Axios from 'axios';

export const cancelToken = Axios.CancelToken.source();

export default Axios.create({
  baseURL: 'http://tangsel.ideyouth.com',
  cancelToken: cancelToken.token
})