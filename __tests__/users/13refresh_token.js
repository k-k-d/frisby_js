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
            .post(baseUrl + '/users/auth/refresh-token', {
                token: credentials.refreshToken
            })
            .expect('status', 200)
            .expect('jsonTypes', {  // check response json template with joi
                'ChallengeParameters': Joi.object().required(),
                'AuthenticationResult': Joi.object().required()
            })
            .expect('jsonTypes', 'AuthenticationResult', {  // check template of specific parameter of response again using joi schema
                "AccessToken": Joi.string().required(),
                "IdToken": Joi.string().required(),
                "TokenType": Joi.string().required(),
                "ExpiresIn": Joi.number().required(),
            })
            .then((res) => {
                ({AccessToken: credentials.accessToken, IdToken: credentials.authToken} = res.json.AuthenticationResult);   // load authentication ids
                fs.writeFileSync('__tests__/users/credentials.json', JSON.stringify(credentials, null, 4), (err) => {if(err) throw err;});
            })
        ;
    });
});