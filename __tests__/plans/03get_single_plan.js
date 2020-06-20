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
            .get(baseUrl + '/orders/plans/4cbcab74-d23e-4397-81f7-3b097dc6910f/get-plan')
            .expect('status', 200)
            .expect('jsonTypes', '', {
                "tenant": Joi.string().required(),
                "uuid": Joi.string().only('4cbcab74-d23e-4397-81f7-3b097dc6910f'),
                "currency": Joi.string().required(),
                "price": Joi.string().required(),
                "title": Joi.string().required(),
                "meta": Joi.object(),
                "slug": Joi.string().required()
            })
            .inspectJSON()
        ;
    });
});