const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
    {cinema_id:2,vendor_id:2,rmv_is_default_vendor:"Y",rmv_is_active:"Y",
     selectedRawMaterials:[{name:"Hot Dog Bread",rm_id:37,vr_qty:"1",uom_id:2,uom_unit:"Litre",vr_rate:"12",vr_is_active:true}]},
     {rmv_id:42,cinema_id:2,vendor_id:2,rmv_is_default_vendor:"Y",rmv_is_active:"Y",
     selectedRawMaterials:[{name:"Hot Dog Bread",rm_id:37,vr_qty:"1",uom_id:2,uom_unit:"Litre",vr_rate:"12",vr_is_active:true}]},


    //  {"cinema_id":1,"vendor_id":9,"rmv_id":"42","rmv_is_default_vendor":"Y","rmv_is_active":"Y","selectedRawMaterials":
    //  [{"name":"test","rm_id":72,"rmv_id":39,"vr_id":16,"vr_qty":1,"vr_rate":12,"vr_is_active":true,"uom_unit":"Litre"}]}
]
// {"cinema_id":2,"vendor_id":2,"rmv_is_default_vendor":"Y","rmv_is_active":"Y",
// "selectedRawMaterials":[{"name":"Hot Dog Bread","rm_id":37,"vr_qty":"1","uom_id":2,"uom_unit":"Litre","vr_rate":"12","vr_is_active":true}]}
let params = {    
    addVendorsMapping: {
        url: `http://localhost:3800/ln_vendor_mapping`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    vendorsMappingList: {
        url: `http://localhost:3800/ln_vendor_mapping`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleVendorsMapping: {
        url: `http://localhost:3800/api/admin/tablelist/ln_raw_material_vendors?${data[1].rmv_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editVendorsMapping: {
        url: `http://localhost:3800/ln_vendor_mapping?${data[1].rmv_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In user controller', function () {
    this.timeout(200000);
    describe('viewSingleVendorsMapping', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleVendorsMapping)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('vendorsMappingList', function () {
        it('should return the correct value', async function () {
            await axios(params.vendorsMappingList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addVendorsMapping', function () {
        it('should return the correct value', async function () {
            await axios(params.addVendorsMapping)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editVendorsMapping', function () {
        it('should return the correct value', async function () {
            await axios(params.editVendorsMapping)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})