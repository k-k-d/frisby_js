const frisby = require('frisby');
const Joi = frisby.Joi;

const baseUrl = process.env.BASEURL;

describe('', () => {

    it('Logout', () => {
        return frisby
            .get(baseUrl + '/users/auth/logout', {
                redirect_uri: 'http://localhost:8000/signout'
            })
            .expect('status', 400)
            // .inspectResponse()
        ;
    });
});