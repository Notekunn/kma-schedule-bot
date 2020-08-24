const axios = require('axios').default;
const api = axios.create({
    baseURL: process.env.SCHEDULE_SERVER,
    headers: {
        'Content-Type': 'application/json'
    }
});
module.exports = {
    api
}