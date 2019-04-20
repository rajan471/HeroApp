const request = require('request-promise-native');
const HeroAPI = process.env.HERO_API;

async function getHeros(code) {
    console.log(HeroAPI + 'getHeros?code=' + code);
    return request.get({
        url: HeroAPI + 'getHeros?code=' + code,
    });
}

module.exports = {
    getHeros
}