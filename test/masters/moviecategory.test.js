const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
    {mc_id:"",mc_name:"test",mc_is_active:true},
    {mc_id:7,mc_name:"test",mc_is_active:true},

    
 
]
let params = {    
    addMovieCategory: {
        url: `http://localhost:3800/admin/ms_movie_categories`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    movieCategoryList: {
        url: `http://localhost:3800/admin/ms_movie_categories`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleMovieCategory: {
        url: `http://localhost:3800/admin/ms_movie_categories?${data[1].mc_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editMovieCategory: {
        url: `http://localhost:3800/admin/ms_movie_categories/${data[1].mc_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleMovieCategory', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleMovieCategory)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('movieCategoryList', function () {
        it('should return the correct value', async function () {
            await axios(params.movieCategoryList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addMovieCategory', function () {
        it('should return the correct value', async function () {
            await axios(params.addMovieCategory)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editMovieCategory', function () {
        it('should return the correct value', async function () {
            await axios(params.editMovieCategory)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})