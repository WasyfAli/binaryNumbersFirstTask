const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
   
    {g_id:"",g_name:"test",g_is_active:true},
    {g_id:14,g_name:"test",g_is_active:true}
 
]
let params = {    
    addGenre: {
        url: `http://localhost:3800/admin/ms_genre`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    genreList: {
        url: `http://localhost:3800/admin/ms_genre`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleGenre: {
        url: `http://localhost:3800/admin/ms_genre?${data[1].g_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editGenre: {
        url: `http://localhost:3800/admin/ms_genre/${data[1].g_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleGenre', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleGenre)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('genreList', function () {
        it('should return the correct value', async function () {
            await axios(params.genreList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addGenre', function () {
        it('should return the correct value', async function () {
            await axios(params.addGenre)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editGenre', function () {
        it('should return the correct value', async function () {
            await axios(params.editGenre)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})