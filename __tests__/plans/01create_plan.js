const frisby = require('frisby');
const Joi = frisby.Joi;

const fs = require('fs');

const baseUrl = process.env.BASEURL;

describe('', () => {

    let credentials = JSON.parse(fs.readFileSync('__tests__/users/credentials.json'));

    it('Create Plan', () => {
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
            .post(baseUrl + '/orders/plans/create', {
                "title": "plan abc xyz",
                "price": "9988",
                "currency": "INR",
                "meta": {
                    "key1": "value",
                    "key2": "value"
                }
            })
            .expect('status', 200)
            .expect('json', {
                "currency": "INR",
                "price": "9988",
                "title": "plan abc xyz",
                "meta": {
                    "key1": "value",
                    "key2": "value"
                },
                "slug": "plan-abc-xyz"
            })
            .then((res) => {
                console.log(res.json.uuid);
            })
            // .inspectJSON()
        ;
    });
});