const Cache = require("cache");

cache = new Cache();

async function setCache(key, val, ttl) {
    await cache.put(key, val, ttl);

}

async function getCache(key) {
    val = await cache.get(key);
    return val;
}


async function clearCache(key) {
    await cache.del(key);

}


module.exports = { setCache, getCache, clearCache }