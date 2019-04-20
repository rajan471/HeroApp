const Hero = require('../dao/hero.dao');
const utilities = require('../util');
const CusError = utilities.cusError;

/**
 * This method is used to initiate the application with some default heros
 * @param {*} req is request object
 * @param {*} res is response object
 * @param {*} next is next method
 */
async function init(req, res, next) {
    try {
        let heros = await Hero.addHeros();
        let result = {
            code: utilities.resType.OK,
            message: 'Heros are set in action.',
            data: heros
        }
        utilities.handler.sendData(req, res, result);
    }
    catch (error) {
        next(error);
    }
}

/**
 * This method retrives the list of heros (with some details like name, code and phone number) from the 
 * database using the dao file.
 * 
 * @param {*} req is request object
 * @param {*} res is response object
 * @param {*} next is next method
 */
async function getHeros(req, res, next) {
    try {
        let heroCode;
        if (req.query.code && req.query.code.length > 0) {
            heroCode = req.query.code;
        }
        else {
            throw new CusError(utilities.resType.OK, 'Hero code is not provided.')
        }

        let heros = await Hero.getHerosByCode(heroCode);
        let result = {
            code: utilities.resType.OK,
            message: heros.length > 0 ? 'Heros found for the code.' : 'No heros found.',
            data: heros
        }
        utilities.handler.sendData(req, res, result);
    }
    catch (error) {
        next(error);
    }
}

module.exports = {
    getHeros,
    init
}

