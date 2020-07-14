const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [

    {ct_id:"",ct_name:"1",ct_code:"1",ct_is_active:true},
    {ct_id:52,ct_name:"1",ct_code:"1",ct_is_active:true}
]
let params = {    
    addChargeTypes: {
        url: `http://localhost:3800/admin/ms_charge_types`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    chargeTypesList: {
        url: `http://localhost:3800/admin/ms_charge_types`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleChargeTypes: {
        url: `http://localhost:3800/admin/ms_charge_types?${data[1].ct_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editChargeTypes: {
        url: `http://localhost:3800/admin/ms_charge_types/${data[1].ct_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleChargeTypes', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleChargeTypes)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('chargeTypesList', function () {
        it('should return the correct value', async function () {
            await axios(params.chargeTypesList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addChargeTypes', function () {
        it('should return the correct value', async function () {
            await axios(params.addChargeTypes)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editChargeTypes', function () {
        it('should return the correct value', async function () {
            await axios(params.editChargeTypes)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})