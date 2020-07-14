const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [

    {h_id:"",h_name:"test",h_is_active:true},
    {h_id:15,h_name:"test",h_is_active:true},
]
let params = {    
    addCurrencies: {
        url: `http://localhost:3800/admin/ms_hardware`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    currenciesList: {
        url: `http://localhost:3800/admin/ms_hardware`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleCurrencies: {
        url: `http://localhost:3800/admin/ms_hardware?${data[1].h_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editCurrencies: {
        url: `http://localhost:3800/admin/ms_hardware/${data[1].h_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleCurrencies', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleCurrencies)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('currenciesList', function () {
        it('should return the correct value', async function () {
            await axios(params.currenciesList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addCurrencies', function () {
        it('should return the correct value', async function () {
            await axios(params.addCurrencies)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editCurrencies', function () {
        it('should return the correct value', async function () {
            await axios(params.editCurrencies)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})