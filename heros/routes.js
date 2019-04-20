const heroController = require('./controllers/hero.controller');

module.exports = (app) => {
    app.get('/api/heros/init', heroController.init)
    app.get('/api/heros/getHeros', heroController.getHeros);
};