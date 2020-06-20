const frisby = require('frisby');
const Joi = frisby.Joi;

const fs = require('fs');

const baseUrl = process.env.BASEURL;

describe('', () => {

    let credentials = JSON.parse(fs.readFileSync('__tests__/users/credentials.json'));

    it('Send Email', () => {
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
            .post(baseUrl + '/users/send-mail', {
                "from" : "rajiv@betalectic.com",
                "to" : "ivkrish143007@gmail.com",
                "text" : "Test mail message",
                "subject" : "Test mail"
            })
            .expect('status', 200)
            .expect('jsonTypes', {
                message: Joi.string().required()
            })
            // .inspectResponse()
        ;
    });
});