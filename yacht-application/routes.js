var yacht = require('./controller');

module.exports = (app) => {
    app.get('/get_yacht/:key', (req, res) => {
        yacht.query_yacht(req, res);
    });

    app.get('/add_yacht/:yacht', (req, res) => {
        yacht.add_yacht(req, res);
    });

    app.get('/book_yacht/:booking', (req, res) => {
        yacht.book_yacht(req, res);
    });

    app.get('/sign_company/:companysignature', (req, res) => {
        yacht.sign_company(req, res);
    });

    app.get('/sign_skipper/:skippersignature', (req, res) => {
        yacht.sign_skipper(req, res);
    });

    app.get('/get_all_yachts', (req, res) => {
        yacht.get_all_yachts(req, res);
    });
};
