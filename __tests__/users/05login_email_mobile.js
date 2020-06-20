const frisby = require('frisby');
const Joi = frisby.Joi;

const fs = require('fs');

const baseUrl = process.env.BASEURL;

describe('', () => {

    let credentials = {};

    it('Login with Email/Mobile', () =>{   // 1 - testing login with email api
        return frisby
            .post(baseUrl + '/users/auth/login', {  // post request with payload
                username: process.env.EMAIL,
                password: process.env.PASSWORD
            })
            .expect('status', 200)  // check status code
            .expect('jsonTypes', {  // check response json template with joi
                'ChallengeParameters': Joi.object().required(),
                'AuthenticationResult': Joi.object().required()
            })
            .expect('jsonTypes', 'AuthenticationResult', {  // check template of specific parameter of response again using joi schema
                "AccessToken": Joi.string().required(),
                "RefreshToken": Joi.string().required(),
                "IdToken": Joi.string().required(),
                "TokenType": Joi.string().required(),
                "ExpiresIn": Joi.number().required(),
            })
            .then((res) => {
                ({AccessToken: credentials.accessToken, RefreshToken: credentials.refreshToken, IdToken: credentials.authToken} = res.json.AuthenticationResult);   // load authentication ids
                fs.writeFileSync('__tests__/users/credentials.json', JSON.stringify(credentials, null, 4), (err) => {});
            })
        ;
    });
});