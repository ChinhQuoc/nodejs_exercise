let db = require('../db');

module.exports.products = (req, res) => {
    let page = parseInt(req.query.page) || 1; //nếu page k có giá trị thì mặc định là 1. này là n
    let perPage = 8; //có 8 sp trên 1 trang. Này là x

    let start = (page - 1) * perPage;
    let end = page * perPage;

    let drop = (page - 1) * perPage;

    res.render('./products/view', {
        // c1: products: db.get('products').value().slice(start, end)
        // c2
        products: db.get('products').drop(drop).take(perPage).value()
    });
};