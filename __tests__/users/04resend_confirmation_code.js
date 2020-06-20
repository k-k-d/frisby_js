const frisby = require('frisby');
const Joi = frisby.Joi;

const baseUrl = process.env.BASEURL;

describe('', () => {

    it('Resend Confirmation Code', () => {
        return frisby
            .post(baseUrl + '/users/auth/resend', {
                username: process.env.EMAIL
            })
            .expect('status', 400)
            .expect('jsonTypes', {
                message: Joi.string().required(),
                code: Joi.string().required()
            })
            // .inspectJSON()
        ;
    });
});