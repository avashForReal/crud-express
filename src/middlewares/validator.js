const { check, validationResult } = require("express-validator")

const newUserValidationRules = () => {
    return [
        check('name')
            .not()
            .isEmpty()
            .trim()
            .withMessage('Name is required'),
        check('email')
            .trim()
            .isEmail()
            .withMessage('Valid email is required'),
        check('password')
            .trim()
            .isLength({ min: 6 })
            .withMessage('Password is required and must be at least 6 characters'),
        check('address')
            .not() //required
            .isEmpty() //check if empty
            .trim()
            .isString()
            .withMessage('Address is required'),
    ]
}

const updateUserValidationRules = () => {
    return [
        check('name')
            .trim()
            .optional() //can be skipped
            .notEmpty() //but cannot be empty
            .withMessage('Name cannot be empty and is required'),
        check('email')
            .isEmail()
            .optional()
            .withMessage('Email cannot be empty and valid email is required'),
        check('password')
            .trim()
            .optional()
            .isLength({ min: 6 })
            .withMessage('Password cannot be empty and must be at least 6 characters'),
        check('address')
            .trim()
            .optional()
            .notEmpty()
            .withMessage('Address cannot be empty and is required'),
    ]
}


const validate = (req, res, next) => {

    const errors = validationResult(req)

    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    newUserValidationRules,
    updateUserValidationRules,
    validate
}