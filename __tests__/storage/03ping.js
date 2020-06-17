const frisby = require('frisby');
const Joi = frisby.Joi;

const fs = require('fs');

const baseUrl = process.env.BASEURL;

describe('', () => {

    let credentials = JSON.parse(fs.readFileSync('__tests__/users/credentials.json'));

    it('', () => {
        return frisby
            .get(baseUrl + '/storage/ping')
            .expect('status', 200)
            .expect('jsonTypes', {
                'tenant': Joi.string().required(),  // use joi to make a schema of the expected response
                'status': Joi.string().valid('ok').required(),
                'service': Joi.string().required(),
                'executablePath': Joi.string().required()
            })
            .inspectJSON()
        ;
    });
});