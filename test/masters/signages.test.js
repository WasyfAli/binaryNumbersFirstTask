const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
    {st_id:"",st_name:"testtodday",st_is_active:true},
    {st_id:10,st_name:"testtodday",st_is_active:true},
    
]
let params = {    
    addSignages: {
        url: `http://localhost:3800/admin/ms_signage_types`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    signagesList: {
        url: `http://localhost:3800/admin/ms_signage_types`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleSignages: {
        url: `http://localhost:3800/admin/ms_signage_types?${data[1].st_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editSignages: {
        url: `http://localhost:3800/admin/ms_signage_types/${data[1].st_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleSignages', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleSignages)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('signagesList', function () {
        it('should return the correct value', async function () {
            await axios(params.signagesList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addSignages', function () {
        it('should return the correct value', async function () {
            await axios(params.addSignages)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editSignages', function () {
        it('should return the correct value', async function () {
            await axios(params.editSignages)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})