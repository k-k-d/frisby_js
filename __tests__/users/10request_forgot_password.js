const frisby = require('frisby');
const Joi = frisby.Joi;

const baseUrl = process.env.BASEURL;

describe('', () => {

    it('', () => {
        return frisby
            .post(baseUrl + '/users/auth/request-forgot-password', {
                username: process.env.MOBILE,
            })
            .expect('status', 500)
            .inspectResponse()
        ;
    });
});