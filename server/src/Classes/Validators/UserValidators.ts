import { check } from 'express-validator'

/** Built validator for 'Store' method in 'UserController' */
export const ValidateCreateUser = [     
    check('user_name')
        .not().isEmpty().withMessage('key value cannot be empty')
        .exists().withMessage('key is required')
        .isLength({min: 3}).withMessage('must be greater than 3'),
    check('user_id')
        .not().isEmpty().withMessage('key value cannot be empty')
        .isLength({min: 6}).withMessage('must be greater than 6')
        .exists().withMessage('key is required'),
    check('mail')
        .not().isEmpty().withMessage('key value cannot be empty')
        .exists().withMessage('key is required')
        .isEmail().withMessage('Field must be an email'),
    check('birthDay')
        .not().isEmpty().withMessage('key value cannot be empty')
        .isNumeric().withMessage('must be a number')
        .exists().withMessage('key is required'),
];

export const ValidateDeleteUser = [
    check('user_id')
        .not().isEmpty().withMessage('key value cannot be empty')
        .isLength({min: 6}).withMessage('must be greater than 6')
        .exists().withMessage('key is required'),
]