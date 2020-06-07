const frisby = require('frisby');
const Joi = frisby.Joi;

const baseUrl = 'https://dnypx9w-dev.nbd.betalectic.tech';

describe('', () => {

    let accessToken, refreshToken, authToken;

    it ('Successful Ping', () => {
        return frisby
            .get(baseUrl + '/users/ping')
            .expect('status', 200)
            .expect('jsonTypes', {
                'tenant': Joi.string().required(),
                'status': Joi.string().valid('ok').required(),
                'service': Joi.string().required(),
                'a': Joi.number().required(),
                'b': Joi.number().required(),
                'sum': Joi.number().required()
            })
            .then((res) => {
                expect(res.json.a + res.json.b).toEqual(res.json.sum);
            })
        ;
    });

    frisby.globalSetup({
        request: {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    });

    it('Login API returns the 3 tokens for authorization', () =>{   // 1 - testing login with email api
        return frisby
            .post(baseUrl + '/users/auth/login', {
                username: "krishna@betalectic.com",
                password: "Krishna@09"
            })
            .expect('status', 200)
            .expect('jsonTypes', {
                'ChallengeParameters': Joi.object().required(),
                'AuthenticationResult': Joi.object().required()
            })
            .expect('jsonTypes', 'AuthenticationResult', {
                "AccessToken": Joi.string().required(),
                "RefreshToken": Joi.string().required(),
                "IdToken": Joi.string().required(),
                "TokenType": Joi.string().required(),
                "ExpiresIn": Joi.number().required(),
            })
            .then((res) => {
                ({AccessToken: accessToken, RefreshToken: refreshToken, IdToken: authToken} = res.json.AuthenticationResult);   // load authentication ids
            })
        ;
    });

    

    it('User details returns the correct data', () => { // 2 - testing get user api
        return frisby
            .setup({
                request: {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-Api-Key': accessToken,
                        'Authorization': authToken
                    }
                }
            })
            .get(baseUrl + '/users/account/me')
            .expect('status', 200)
            .expect('jsonTypes', {
                'full_name': Joi.string().required()
            })
        ;
    });
});