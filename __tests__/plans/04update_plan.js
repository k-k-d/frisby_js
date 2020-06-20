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
            .put(baseUrl + '/orders/plans/4cbcab74-d23e-4397-81f7-3b097dc6910f/update', {
                "title": "plan abc xyz1",
                "price": "9988",
                "currency": "INR",
                "meta": {
                    "key1": "value1",
                    "key2": "value1"
                }
            })
            .expect('status', 200)
            .expect('json', {
                "currency": "INR",
                "price": "9988",
                "uuid": "4cbcab74-d23e-4397-81f7-3b097dc6910f",
                "title": "plan abc xyz1",
                "meta": {
                    "key1": "value1",
                    "key2": "value1"
                },
                "slug": "plan-abc-xyz1"
            })
            .inspectJSON()
        ;
    });
});