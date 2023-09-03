import axios from 'axios'

const myaxios = axios.create({
    baseURL: 'http://big-event-vue-api-t.itheima.net'

})

export default myaxios