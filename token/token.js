const cache = require('../cache/cache');
const axios = require('axios');

async function validate(token) {

    //Cache
    value = await cache.getCache(token);
    if (value != null) return value;

    //Sevice auth
    value = await checkToken(token);
    if (value != null) {
        await cache.setCache(token, value, 100 * 1000);
        return value;
    }

    return null;
}


async function checkToken(token) {
    try {
        let response = await axios.get('http://localhost:3001/v1/users/current', {
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