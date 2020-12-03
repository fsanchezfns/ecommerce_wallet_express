const cache = require('../cache/cache');
const axios = require('axios');

const cfg = require('../config/enviroment')
config = cfg.getConfig()

async function validate(token) {

    //Cache
    value = await cache.getCache(token);
    if (value != null) return value;

    //Sevice auth
    value = await checkToken(token);
    if (value == null) return null;

    await cache.setCache(token, value, 100 * 1000);
    return value;

}


async function checkToken(token) {
    try {
        let response = await axios.get(config.authServiceBaseUrl + '/v1/users/current', {
            headers: { 'Authorization': 'Bearer ' + token }
        });

        return JSON.stringify(response.data);

    } catch (error) {
        console.log('ERRORRR' + error)
        return null;

    }

}


async function invalidateSession(token) {
    await cache.clearCache(token);
    console.log('invalidateSession ' + token)
    return;
}



module.exports = { validate, invalidateSession }