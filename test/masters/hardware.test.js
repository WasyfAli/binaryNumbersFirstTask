const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [

    {h_id:"",h_name:"test",h_is_active:true},
    {h_id:15,h_name:"test",h_is_active:true},
]
let params = {    
    addHardwareTest: {
        url: `http://localhost:3800/admin/ms_hardware`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    hardwareTestList: {
        url: `http://localhost:3800/admin/ms_hardware`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleHardwareTest: {
        url: `http://localhost:3800/admin/ms_hardware?${data[1].h_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editHardwareTest: {
        url: `http://localhost:3800/admin/ms_hardware/${data[1].h_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleHardwareTest', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleHardwareTest)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('hardwareTestList', function () {
        it('should return the correct value', async function () {
            await axios(params.hardwareTestList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addHardwareTest', function () {
        it('should return the correct value', async function () {
            await axios(params.addHardwareTest)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editHardwareTest', function () {
        it('should return the correct value', async function () {
            await axios(params.editHardwareTest)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})