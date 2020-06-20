const frisby = require('frisby');
const Joi = frisby.Joi;

const baseUrl = process.env.BASEURL;

describe('', () => {

    it('Reset Password', () => {
        return frisby
            .post(baseUrl + '/users/auth/reset-password', {
                username: process.env.MOBILE,
	            code: "235388"
            })
            .expect('status', 422)
            .expect('jsonTypes', {
                message: Joi.string().required(),
                errors: Joi.object().required()
            })
            .expect('jsonTypes', 'errors', {password: Joi.string().required()})
            // .inspectResponse()
        ;
    });
});