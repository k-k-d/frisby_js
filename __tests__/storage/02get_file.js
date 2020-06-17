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
            .get(baseUrl + '/storage/show/dnypx9w-dev-11f0b519-cf02-4f35-bf29-a5b3e303e06c')
            .expect('status', 200)
            .expect('jsonTypes', {
                "purpose": Joi.string().required(),
                "tenant": Joi.string().required(),
                "path": Joi.string().required(),
                "meta": Joi.object().required(),
                "file_id": Joi.string().required(),
                "actual_path": Joi.string().required()
            })
            .inspectJSON()
        ;
    });
});