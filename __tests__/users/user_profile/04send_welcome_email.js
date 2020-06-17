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
            .post(baseUrl + '/users/send-welcome-mail')
            .expect('status', 200)
            .expect('jsonTypes', {
                "ResponseMetadata": Joi.object().required(),
                "MD5OfMessageBody": Joi.string().required(),
                "MessageId": Joi.string().required(),
                "SequenceNumber": Joi.string().required()
            })
            .expect('jsonTypes', "ResponseMetadata", {"RequestId": Joi.string().required()})
        ;
    });
});