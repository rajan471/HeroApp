const utilities = require('../util');
const CusError = utilities.cusError;
const ipc = require('../ipc');

/**
 * This function recieves the SMS code and then look for available HEROS and alert them. 
 * @param {*} req is request object
 * @param {*} res is response object
 * @param {*} next is next method
 */
async function recieveSMS(req, res, next) {
    try {
        let code = null;
        if (req.query.code && req.query.code.length > 2 && req.query.code.match(/(?:0\ )/)) {
            code = req.query.code.split(' ')[1];
        }
        else {
            throw new CusError(utilities.resType.OK, 'code should be provided as \'0 <code>\' ');
        }
        let heros = await ipc.getHeros(code);
        heros = JSON.parse(heros).data;
        let names = heros.map((hero) => hero.name);


        // Alert heros by SMS or call;
        // let phoneNos = heros.map((hero) => '+' + hero.phone.countryCode + hero.phone.number);

        let result = {
            code: utilities.resType.OK,
            message: heros.length > 0 ? `${names} have been alerted.` : 'No heros found.'
        }
        utilities.handler.sendData(req, res, result);
    }
    catch (error) {
        next(error);
    }
}
module.exports = { recieveSMS }