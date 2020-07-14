const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
    { role_id: "", role_name: "asd", role_is_cinema_level: "false", role_is_active: "false"},
    { role_id: "9", role_name: "asd", role_is_cinema_level: "false", role_is_active: "false"},
    { role_id: "9", role_name: "asd", role_is_cinema_level: "false", role_is_active: "false"},
]
// function makeid(length) {
//     var result = '';
//     var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     var charactersLength = characters.length;
//     for (var i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// }
//{"role_id":"","role_name":"asd","role_is_cinema_level":true,"role_is_active":false}
let params = {    
    addRoles: {
        url: `http://localhost:3800/admin/ms_roles`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    rolesList: {
        url: `http://localhost:3800/admin/ms_roles`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleRole: {
        url: `http://localhost:3800/admin/ms_roles/${data[1].role_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editRoles: {
        url: `http://localhost:3800/admin/ms_roles/${data[2].role_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[2],
    },
}

describe('In user controller', function () {
    this.timeout(200000);
    describe('viewSingleRole', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleRole)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('rolesList', function () {
        it('should return the correct value', async function () {
            await axios(params.rolesList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addRoles', function () {
        it('should return the correct value', async function () {
            await axios(params.addRoles)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editRoles', function () {
        it('should return the correct value', async function () {
            await axios(params.editRoles)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})