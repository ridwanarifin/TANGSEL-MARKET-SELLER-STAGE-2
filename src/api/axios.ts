import Axios from 'axios';

export const cancelToken = Axios.CancelToken.source();

const SERVER = 'http://tangsel.ideyouth.com'
const LOCAL = 'http://127.0.0.1:8000'
export default Axios.create({
  baseURL: LOCAL,
  cancelToken: cancelToken.token
})