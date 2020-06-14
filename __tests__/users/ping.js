const frisby = require('frisby');
const Joi = frisby.Joi;

const baseUrl = process.env.BASEURL;

describe('', () => {
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
});