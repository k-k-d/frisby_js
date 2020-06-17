const frisby = require('frisby');
const Joi = frisby.Joi;

const fs = require('fs');

const baseUrl = process.env.BASEURL;

describe('', () => {

    let credentials = JSON.parse(fs.readFileSync('__tests__/users/credentials.json'));

    it('', () => {
        return frisby
            .setup({
                request: {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-Api-Key': credentials.accessToken,
                        'Authorization': credentials.authToken
                    }
                }
            })
            .get(baseUrl + '/storage/pre-signed-url')
            .expect('status', 200)
            .expect('jsonTypes', {
                "url": Joi.string().required(),
                "path": Joi.string().required(),
            })
            .inspectJSON()
        ;
    });
});