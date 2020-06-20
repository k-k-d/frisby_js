const frisby = require('frisby');
const Joi = frisby.Joi;

const fs = require('fs');

const baseUrl = process.env.BASEURL;

describe('', () => {

    let credentials = JSON.parse(fs.readFileSync('__tests__/users/credentials.json'));

    it('Get User', () => { // 2 - testing get user api
        return frisby
            .setup({    // set up headers with authentication details before sending requests
                request: {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-Api-Key': credentials.accessToken,
                        'Authorization': credentials.authToken
                    }
                }
            })
            .get(baseUrl + '/users/account/me') // get request
            .expect('status', 200)  // check status code
            .expect('jsonTypes', {
                "tenant": Joi.string().required()
            })
            // .inspectJSON()
        ;
    });
});