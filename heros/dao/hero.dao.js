const Hero = require('./models/Hero');
const heros = require('./models/heros.json');
const utilities = require('../util');
const CusError = utilities.cusError;

/**
 * This method is used to quickly setup the HERO database with some
 * default Heros in the heros.json file
 */
async function addHeros() {
    try {
        await Hero.remove({});
        let heroList = await Hero.create(heros);
        heroList = heroList.map((hero) => hero.name);
        return heroList;
    }
    catch (error) {
        throw new CusError(utilities.resType.INTERNAL_SERVER_ERROR, error.message);
    }
}

/**
 * This method retrieves the heros that matches the code.
 * @param {code} code is the Hero code
 */
async function getHerosByCode(code) {
    return Hero.find({ code }, { _id: 0 }).exec();
}

module.exports = {
    getHerosByCode,
    addHeros
}