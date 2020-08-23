const domains = [];
// cooking list domain
domains.push('https://monngonmoingay.com/');
// my server 
domains.push('https://protocol-facebook.herokuapp.com/');
// your server
const { HOST_URL } = process.env;
if (HOST_URL && !domains.includes(HOST_URL)) domains.push(HOST_URL);
module.exports = domains;