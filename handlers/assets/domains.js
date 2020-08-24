const domains = [];
// cooking list domain
domains.push('https://monngonmoingay.com');
// my server 
domains.push('https://protocol-facebook.herokuapp.com');
// your server
const { HOST_URL } = process.env;
const your_server = HOST_URL.trim('/');
if (your_server && !domains.includes(your_server)) domains.push(your_server);
module.exports = domains;