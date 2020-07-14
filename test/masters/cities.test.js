const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
   
    {city_id:"",city_name:"test",city_latitude:"101",city_longitude:"120",country_id:1,state_id:1,city_is_active:true},
    {city_id:"4",city_name:"test",city_latitude:"101",city_longitude:"120",country_id:1,state_id:1,city_is_active:true}
 
]
let params = {    
    addCities: {
        url: `http://localhost:3800/admin/ms_cities`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    citiesList: {
        url: `http://localhost:3800/admin/ms_cities`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleCities: {
        url: `http://localhost:3800/admin/ms_cities?${data[1].city_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editCities: {
        url: `http://localhost:3800/admin/ms_cities/${data[1].city_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleCities', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleCities)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('citiesList', function () {
        it('should return the correct value', async function () {
            await axios(params.citiesList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addCities', function () {
        it('should return the correct value', async function () {
            await axios(params.addCities)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editCities', function () {
        it('should return the correct value', async function () {
            await axios(params.editCities)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})