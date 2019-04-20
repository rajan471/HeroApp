const smsController = require('./controllers/sms.controller');

module.exports = (app) => {
    app.get('/api/communication/sms/', smsController.recieveSMS)
};