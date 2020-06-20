const frisby = require('frisby');
const Joi = frisby.Joi;

const baseUrl = process.env.BASEURL;

describe('', () => {

    it('Register with Email/Mobile', () => {
        return frisby
            .post(baseUrl + '/users/auth/register', {
                username: process.env.MOBILE,
	            password: process.env.PASSWORD,
	            confirm_password: process.env.PASSWORD
            })
            .expect('status', 400)
            .expect('jsonTypes', {
                message: Joi.string().required(),
                code: Joi.string().required()
            })
            .inspectResponse()
        ;
    });
});