const frisby = require('frisby');
const Joi = frisby.Joi;

const baseUrl = process.env.BASEURL;

describe('', () => {

    it('Login with Google', () => {
        return frisby
            .get(baseUrl + '/users/auth/login-with-google', {
                redirect_uri: 'http://localhost:8000/auth-success'
            })
            .expect('status', 400)
            // .inspectResponse()
        ;
    });
});