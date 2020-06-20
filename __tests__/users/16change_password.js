const frisby = require('frisby');
const Joi = frisby.Joi;

const fs = require('fs');

const baseUrl = process.env.BASEURL;

describe('', () => {

    let credentials = JSON.parse(fs.readFileSync('__tests__/users/credentials.json'));

    it('Change Password', () => {
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
            .post(baseUrl + '/users/auth/change-password', {
                "old_password": process.env.PASSWORD1,
                "password": process.env.PASSWORD,
                "confirm_password": process.env.PASSWORD
            })
            .expect('status', 400)
            // .inspectResponse()
            .then(res => {
                // let temp = process.env.PASSWORD1;
                // process.env.PASSWORD1 = process.env.PASSWORD;
                // process.env.PASSWORD = temp;
            })
        ;
    });
});