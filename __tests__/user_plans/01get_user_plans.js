const frisby = require('frisby');
const Joi = frisby.Joi;

const fs = require('fs');

const baseUrl = process.env.BASEURL;

describe('', () => {

    let credentials = JSON.parse(fs.readFileSync('__tests__/users/credentials.json'));

    it('Get User Plans', () => {
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
            .get(baseUrl + '/orders/user-plans?uuid=4cbcab74-d23e-4397-81f7-3b097dc6910f')
            // .expect('status', 200)
            // .expect('jsonTypes', {
            //     Items: Joi.array().required(),
            //     Count: Joi.number().integer().required(),
            //     ScannedCount: Joi.number().integer().required()
            // })
            // .expect('jsonTypes', 'Items.*', {
            //     "tenant": Joi.string().required(),
            //     "currency": Joi.string().required(),
            //     "price": Joi.string().required(),
            //     "title": Joi.string().required(),
            //     "meta": Joi.object(),
            //     "slug": Joi.string().required()
            // })
            .inspectJSON()
        ;
    });
});