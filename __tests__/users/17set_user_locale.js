const frisby = require('frisby');
const Joi = frisby.Joi;

const fs = require('fs');

const baseUrl = process.env.BASEURL;

describe('', () => {

    let credentials = JSON.parse(fs.readFileSync('__tests__/users/credentials.json'));

    it('Set User Locale', () => {
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
            .post(baseUrl + '/users/account/set-locale', {
                locale: 'as'
            })
            .expect('status', 200)
            .expect('jsonTypes', {
                "id": Joi.number().required(),
                "uuid": Joi.string().required(),
                "tenant": Joi.string().required(),
                "cognito_sub": Joi.string().required(),
                "email_phone": Joi.string().required(),
                "flow": Joi.string().required(),
                "json_data": Joi.string().allow(null),
                "createdAt": Joi.string().required(),
                "updatedAt": Joi.string().required(),
                "deletedAt": Joi.string().allow(null)
            })
            // .inspectJSON()
        ;
    });
});