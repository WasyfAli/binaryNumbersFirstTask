const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
    { dept_id: "", dept_name: "testttts", dept_code: "123",dept_is_active:"false"},
    { dept_id: "6", dept_name: "testttts", dept_code: "123",dept_is_active:"false"},
  
]
// function makeid(length) {
//     var result = '';
//     var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     var charactersLength = characters.length;
//     for (var i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//{"dept_id":"","dept_name":"test","dept_code":"123","dept_is_active":true}
let params = {    
    addDepartment: {
        url: `http://localhost:3800/admin/ms_departments`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    DepartmentList: {
        url: `http://localhost:3800/admin/ms_departments`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleDepartment: {
        url: `http://localhost:3800/admin/ms_departments/${data[1].dept_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editDepartment: {
        url: `http://localhost:3800/admin/ms_departments/${data[1].dept_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[2],
    },
}

describe('In department controller', function () {
    this.timeout(200000);
    describe('viewSingleDepartment', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleDepartment)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('DepartmentList', function () {
        it('should return the correct value', async function () {
            await axios(params.DepartmentList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addDepartment', function () {
        it('should return the correct value', async function () {
            await axios(params.addDepartment)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editDepartment', function () {
        it('should return the correct value', async function () {
            await axios(params.editDepartment)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})