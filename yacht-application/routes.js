
var yacht = require('./controller');

module.exports = (app) => {

    app.get('/add_Yacht/:yacht', (req, res)=>{
        yacht.add_Yacht(req, res);
    })
    app.get('/get_all_yachts', (req, res) => {
        yacht.get_all_yachts(req, res);
        
    });
    
    app.get('/book_yacht/:booking', (req, res) => {
        yacht.book_yacht(req, res);
    });

    app.get('/sign_company/:signaturec', (req, res) => {
        yacht.sign_company(req, res);
    });

    app.get('/sign_skipper/:signatures', (req, res) => {
        yacht.sign_skipper(req, res);
    });
    
    app.get('/remove_booking/:key', (req, res) => {
        yacht.remove_booking(req, res);
    });
}
