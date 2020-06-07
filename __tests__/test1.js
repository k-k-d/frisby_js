const frisby = require('frisby');
const Joi = frisby.Joi;

const baseUrl = 'https://dnypx9w-dev.nbd.betalectic.tech';

describe('', () => {

    let accessToken, refreshToken, authToken;

    it ('Successful Ping', () => {  // 0 - testing ping api
        return frisby
            .get(baseUrl + '/users/ping')   // get request
            .expect('status', 200)  // check status code
            .expect('jsonTypes', {  // check response json template
                'tenant': Joi.string().required(),  // use joi to make a schema of the expected response
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

    frisby.globalSetup({    // setup headers for all future tests
        request: {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    });

    it('Login API returns the 3 tokens for authorization', () =>{   // 1 - testing login with email api
        return frisby
            .post(baseUrl + '/users/auth/login', {  // post request with payload
                username: "krishna@betalectic.com",
                password: "Krishna@09"
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
                ({AccessToken: accessToken, RefreshToken: refreshToken, IdToken: authToken} = res.json.AuthenticationResult);   // load authentication ids
            })
        ;
    });

    

    it('User details returns the correct data', () => { // 2 - testing get user api
        return frisby
            .setup({    // set up headers with authentication details before sending requests
                request: {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-Api-Key': accessToken,
                        'Authorization': authToken
                    }
                }
            })
            .get(baseUrl + '/users/account/me') // get request
            .expect('status', 200)  // check status code
            .expect('jsonTypes', {  // check if response compares with expected template
                'full_name': Joi.string().required()
            })
        ;
    });
});