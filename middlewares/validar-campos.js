

const { validationResult } = require ('express-validator')

const validarCampos = (req,res,next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) { // Empty = que no hay errores
        return res.status(400).json(errors)
    }
    next();
}

module.exports = {
    validarCampos
}