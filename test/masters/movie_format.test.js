const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
    {mf_id:"",mf_name:"Test",mf_is_active:true},
    {mf_id:8,mf_name:"Test",mf_is_active:true}
    
]
let params = {    
    addMovieFormat: {
        url: `http://localhost:3800/admin/ms_movie_formats`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    movieFormatList: {
        url: `http://localhost:3800/admin/ms_movie_formats`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleMovieFormat: {
        url: `http://localhost:3800/admin/ms_movie_formats?${data[1].mf_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editMovieFormat: {
        url: `http://localhost:3800/admin/ms_movie_formats/${data[1].mf_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleMovieFormat', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleMovieFormat)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('movieFormatList', function () {
        it('should return the correct value', async function () {
            await axios(params.movieFormatList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addMovieFormat', function () {
        it('should return the correct value', async function () {
            await axios(params.addMovieFormat)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editMovieFormat', function () {
        it('should return the correct value', async function () {
            await axios(params.editMovieFormat)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})