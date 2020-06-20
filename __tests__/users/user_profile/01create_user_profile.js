const frisby = require('frisby');
const Joi = frisby.Joi;

const fs = require('fs');

const baseUrl = process.env.BASEURL;

describe('', () => {

    let credentials = JSON.parse(fs.readFileSync('__tests__/users/credentials.json'));

    it('Create User Profile', () => {
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
            .post(baseUrl + '/users/profiles/123', {
                "full_name" : "venkata krishna inti",
                "profile_pic" : "dywcflj-dev-6211351f-941c-4bca-a854-cca9e3a0df7d",
                "display_name" : "ivk"
            })
            .expect('status', 400)
            .inspectResponse()
        ;
    });
});