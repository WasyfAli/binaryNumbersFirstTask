const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
    {country_id:7,currency_id:1,denomination_value:"10",denomination_is_active:"Y"},

    {denomination_id:12,denomination_value:"100",denomination_is_active:"Y",country_id:7,country_name:"test",
    curr_id:1,curr_code:"INR",
    created_at:"2019-11-06T11:10:05.000Z",created_by:1,updated_at:null,updated_by:null,currency_id:1}
    
]
let params = {    
    addDenominations: {
        url: `http://localhost:3800/api/admin/denominations`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    denominationsList: {
        url: `http://localhost:3800/api/admin/denominations`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleDenominations: {
        url: `http://localhost:3800/api/admin/denominations?${data[1].denomination_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editDenominations: {
        url: `http://localhost:3800/api/admin/denominations/${data[1].denomination_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleDenominations', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleDenominations)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('denominationsList', function () {
        it('should return the correct value', async function () {
            await axios(params.denominationsList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addDenominations', function () {
        it('should return the correct value', async function () {
            await axios(params.addDenominations)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editDenominations', function () {
        it('should return the correct value', async function () {
            await axios(params.editDenominations)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})