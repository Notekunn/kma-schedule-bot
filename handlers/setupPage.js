module.exports = async function setupPage(event) {
    console.log('<setup_page>');
    try {
        const { client, psidToFbid } = this;
        const menu = require("./assets/menu");
        const domains = require('./assets/domains');
        console.log("Bắt đầu setup page....");
        const menuResult = await client.setPersistentMenu(menu);
        console.log("Setup menu... ", menuResult);
        const getStartedResult = await client.setGetStarted(JSON.stringify({ action: "GET_STARTED" }));
        console.log("Setup start button... ", getStartedResult);
        const domainsResult = await client.setWhitelistedDomains(domains);
        console.log("Setup domains... ", domainsResult);
        console.log("Setup complete");
        console.log("Kết thúc setup page....");
    } catch (error) {
        console.log("Có lỗi xảy ra khi setup page....");
        console.log(error.message);
    }
}