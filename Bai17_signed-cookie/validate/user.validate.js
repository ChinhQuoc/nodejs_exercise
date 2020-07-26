// this is middleware
module.exports.createUser = (req, res, next) => {
    let errors = [];
    if (!req.body.name) {
        errors.push('Name is required!');
    }

    if (!req.body.phone) {
        errors.push('Phone is required!');
    }

    if (errors.length) {
        res.render('users/create', {
            errors: errors,
            values: req.body
        });

        return;
    }
    res.locals.succes = true; // chuyển biến succes từ middleware này sang middleware sau (user.controller)
    next();
};