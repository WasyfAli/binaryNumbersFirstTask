const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
    {uom_unit:"test",uom_short_form:"test",uom_formula:123,uom_parent_id:1,uom_description:"desc",uom_is_active:"Y"},
    {uom_id:32,uom_unit:"test",uom_short_form:"test",uom_formula:123,uom_parent_id:1,uom_description:"desc",uom_is_active:"Y"},

]
let params = {    
    addUnitOfMeasurement: {
        url: `http://localhost:3800/admin/ms_unit_of_measurement`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    UnitOfMeasurementList: {
        url: `http://localhost:3800/admin/ms_unit_of_measurement`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleUnitOfMeasurement: {
        url: `http://localhost:3800/admin/ms_unit_of_measurement?${data[1].uom_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editUnitOfMeasurement: {
        url: `http://localhost:3800/admin/ms_unit_of_measurement/${data[1].uom_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleUnitOfMeasurement', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleUnitOfMeasurement)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('UnitOfMeasurementList', function () {
        it('should return the correct value', async function () {
            await axios(params.UnitOfMeasurementList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addUnitOfMeasurement', function () {
        it('should return the correct value', async function () {
            await axios(params.addUnitOfMeasurement)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editUnitOfMeasurement', function () {
        it('should return the correct value', async function () {
            await axios(params.editUnitOfMeasurement)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})