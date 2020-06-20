const frisby = require('frisby');
const Joi = frisby.Joi;

const baseUrl = process.env.BASEURL;

describe('', () => {

    it('Confirm User', () => {
        return frisby
            .post(baseUrl + '/users/auth/confirm', {
                username: process.env.MOBILE,
	            code: "531080"
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