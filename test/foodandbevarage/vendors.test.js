const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
    {v_name:"test",v_tin_number:"11111111111",v_tax_number:"1321321",v_tax_type:"sdsad",v_address:"nerul",city_id:2,
     state_id:1,country_id:1,v_contact:"1234567899",v_email:"tetsasd@gmail.com",v_location:"india",v_is_active:true},
     {v_id:12,v_name:"test",v_tin_number:"11111111111",v_tax_number:"1321321",v_tax_type:"sdsad",v_address:"nerul",city_id:2,
     state_id:1,country_id:1,v_contact:"1234567899",v_email:"tetsasd@gmail.com",v_location:"india",v_is_active:true}
]
// {"v_name":"test","v_tin_number":"11111111111","v_tax_number":"1321321","v_tax_type":"sdsad","v_address":"nerul","city_id":2,
// "state_id":1,"country_id":1,"v_contact":"1234567899","v_email":"tetsasd@gmail.com","v_location":"india","v_is_active":true}
let params = {    
    addVendors: {
        url: `http://localhost:3800/vendors`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    vendorsList: {
        url: `http://localhost:3800/api/admin/tablelist/ms_vendors`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleVendors: {
        url: `http://localhost:3800/api/admin/tablelist/ms_vendors?${data[1].v_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editVendors: {
        url: `http://localhost:3800/vendors?${data[1].v_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In user controller', function () {
    this.timeout(200000);
    describe('viewSingleVendors', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleVendors)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('vendorsList', function () {
        it('should return the correct value', async function () {
            await axios(params.vendorsList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addVendors', function () {
        it('should return the correct value', async function () {
            await axios(params.addVendors)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editVendors', function () {
        it('should return the correct value', async function () {
            await axios(params.editVendors)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})