const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
    {rating_id:"",rating:"test",rating_is_active:true},
    {rating_id:"6",rating:"test",rating_is_active:true},
]
let params = {    
    addRating: {
        url: `http://localhost:3800/admin/ms_ratings`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    ratingList: {
        url: `http://localhost:3800/admin/ms_ratings`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleRating: {
        url: `http://localhost:3800/admin/ms_ratings?${data[1].rating_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editRating: {
        url: `http://localhost:3800/admin/ms_ratings/${data[1].rating_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleRating', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleRating)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('ratingList', function () {
        it('should return the correct value', async function () {
            await axios(params.ratingList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addRating', function () {
        it('should return the correct value', async function () {
            await axios(params.addRating)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editRating', function () {
        it('should return the correct value', async function () {
            await axios(params.editRating)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})