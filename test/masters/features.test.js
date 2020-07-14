const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
   
    
]
let params = {    
    addFeatures: {
        url: `http://localhost:3800/admin/ms_features`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    featuresList: {
        url: `http://localhost:3800/admin/ms_features`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleFeatures: {
        url: `http://localhost:3800/admin/ms_features?${data[1].denomination_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editFeatures: {
        url: `http://localhost:3800/admin/ms_features/${data[1].denomination_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleFeatures', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleFeatures)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('featuresList', function () {
        it('should return the correct value', async function () {
            await axios(params.featuresList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addFeatures', function () {
        it('should return the correct value', async function () {
            await axios(params.addFeatures)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editFeatures', function () {
        it('should return the correct value', async function () {
            await axios(params.editFeatures)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})