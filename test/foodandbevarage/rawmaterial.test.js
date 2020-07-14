const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
    {rm_name:"testtoday",rm_code:"132",rm_rte:"Y",rm_description:"des",
    stock_alert_quantity_threshold:"1",uom_id_threshold:14,rm_is_perishable:"Y",rm_is_active:"Y"},
    {rm_id:86,rm_name:"testodayy",rm_code:"132",rm_rte:"Y",rm_description:"des",
    stock_alert_quantity_threshold:"1",uom_id_threshold:14,rm_is_perishable:"Y",rm_is_active:"Y"},
]
// {"rm_name":"test","rm_code":"132","rm_rte":"Y"5,"rm_description":"des","stock_alert_quantity_threshold":"1",
// "uom_id_threshold":14,"rm_is_perishable":"Y","rm_is_active":"Y"}
// {"rm_id":86,"rm_code":"132","rm_name":"test","rm_rte":"Y","rm_description":"des","stock_alert_quantity_threshold":1,
// "uom_id_threshold":"Select Value","rm_is_perishable":"Y","rm_is_active":"Y"}
let params = {    
    addRawMaterial: {
        url: `http://localhost:3800/raw-material`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    rawMaterialList: {
        url: `http://localhost:3800/api/admin/tablelist/ms_raw_materials`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleRawMaterial: {
        url: `http://localhost:3800/api/admin/tablelist/ms_raw_materials?${data[1].rm_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editRawMaterial: {
        url: `http://localhost:3800/raw-material?${data[1].rm_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In user controller', function () {
    this.timeout(200000);
    describe('viewSingleRawMaterial', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleRawMaterial)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('rawMaterialList', function () {
        it('should return the correct value', async function () {
            await axios(params.rawMaterialList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addRawMaterial', function () {
        it('should return the correct value', async function () {
            await axios(params.addRawMaterial)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editRawMaterial', function () {
        it('should return the correct value', async function () {
            await axios(params.editRawMaterial)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})