const frisby = require('frisby');
const Joi = frisby.Joi;

const fs = require('fs');

const baseUrl = process.env.BASEURL;

describe('', () => {

    let credentials = JSON.parse(fs.readFileSync('__tests__/users/credentials.json'));

    it('Create File', () => {
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
            .post(baseUrl + '/storage/create', {
                "path": "https://nxtbig-storage-dev.s3.ap-south-1.amazonaws.com/dywcflj-dev/uploads/da544917-3639-4ed9-b427-1c6a4104aea1",
                "purpose": "aadhaar",
                "meta": {
                    "key": "value"
                }
            })
            .expect('status', 200)
            .expect('jsonTypes', {
                "purpose": Joi.string().required(),
                "tenant": Joi.string().required(),
                "path": Joi.string().required(),
                "meta": Joi.object().required(),
                "file_id": Joi.string().required(),
                "actual_path": Joi.string().required()
            })
            .inspectJSON()
        ;
    });
});