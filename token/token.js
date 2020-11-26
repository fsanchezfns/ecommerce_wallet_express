const cache = require('../cache/cache');
const axios = require('axios');

async function validate(token) {

    //Cache
    value = await cache.getCache(token);
    if (value != null) return value;

    //Sevice auth
    value = await checkToken(token);
    if (value != null) {
        await cache.setCache(token, value, 10 * 1000);
        return value;
    }

    return null;
}


async function checkToken(token) {
    console.log('esto en check token')
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



module.exports = { validate }