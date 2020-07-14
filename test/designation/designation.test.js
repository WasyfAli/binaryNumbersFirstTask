const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
    { designation_id: "", designation: "testttts", designation_is_active: "false"},
    { designation_id: "10", designation: "testttts", designation_is_active: "false"},
    { designation_id: "10", designation: "testttts", designation_is_active: "false"},
]
// function makeid(length) {
//     var result = '';
//     var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     var charactersLength = characters.length;
//     for (var i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
// {"designation_id":"","designation":"testttts","designation_is_active":true}
let params = {    
    addDesignation: {
        url: `http://localhost:3800/admin/ms_designations`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    designationList: {
        url: `http://localhost:3800/admin/ms_designations/`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleDesignation: {
        url: `http://localhost:3800/admin/ms_designations/${data[1].designation_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editDesignation: {
        url: `http://localhost:3800/admin/ms_designations/${data[2].designation_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[2],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleDesignation', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleDesignation)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('designationList', function () {
        it('should return the correct value', async function () {
            await axios(params.designationList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addDesignation', function () {
        it('should return the correct value', async function () {
            await axios(params.addDesignation)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editDesignation', function () {
        it('should return the correct value', async function () {
            await axios(params.editDesignation)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})