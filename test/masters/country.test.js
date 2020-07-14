const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
   
    {country_id:"",country_name:"test",country_code:"test",iso_code:"test",country_is_active:true},
    {country_id:"7",country_name:"test",country_code:"test",iso_code:"test",country_is_active:true}
]
let params = {    
    addCountry: {
        url: `http://localhost:3800/admin/ms_countries`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    countryList: {
        url: `http://localhost:3800/admin/ms_countries`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleCountry: {
        url: `http://localhost:3800/admin/ms_countries?${data[1].country_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editCountry: {
        url: `http://localhost:3800/admin/ms_countries/${data[1].country_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleCountry', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleCountry)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('countryList', function () {
        it('should return the correct value', async function () {
            await axios(params.countryList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addCountry', function () {
        it('should return the correct value', async function () {
            await axios(params.addCountry)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editCountry', function () {
        it('should return the correct value', async function () {
            await axios(params.editCountry)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})