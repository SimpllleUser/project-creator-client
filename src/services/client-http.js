import axios from 'axios';

axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
export default axios;