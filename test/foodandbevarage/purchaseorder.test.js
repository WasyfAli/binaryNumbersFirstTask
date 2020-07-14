const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
        {cinema_id:4,v_id:7,po_date:"2019-11-01T06:08:00.000Z",po_total_amount:12,po_lock:true,po_is_active:true,
      vendorList:[{rm_name:"Hot Dog Bread",rm_id:"37",po_quantity:"",poi_qty:"1",uom_unit:"Litre",uom_id:2,po_total_amount:"",vendor_rate_id:23,
      poi_is_active:true,poi_price:12}]},

      {po_id:17,po_number:"808383",po_date:"2019-10-01T18:30:00.000Z",v_id:9,cinema_id:4,po_total_amount:"120",po_lock:true,
      po_is_active:true,created_at:"2019-10-22T10:40:14.000Z",created_by:1,updated_at:"2019-10-22T11:40:16.000Z",
      updated_by:1,poi_id:1,rm_id:72,vendor_rate_id:16,poi_qty:1,uom_id:2,poi_price:12,poi_is_active:"Y",
      rm_code:"",rm_name:"test",rm_rte:"Y",rm_description:"des",stock_alert_quantity_threshold:10,uom_id_threshold:1,
      rm_is_perishable:"N",rm_image_url:null,rm_is_active:"Y",uom_unit:"Litre",uom_short_form:"Lt",uom_parent_id:0,
      uom_formula:null,uom_description:"Litre",uom_is_active:"Y",v_name:"test",v_tin_number:"12345678911",
      v_tax_number:"12345",v_tax_type:"ventaxtyp",v_address:"nerulAdd",city_id:2,state_id:1,country_id:1,
      v_contact:"1234567899",v_email:"test@gmail.com",v_location:"NerLoca",v_is_active:"Y",
      purchaseOrder:[{rm_name:"test",rm_id:72,poi_qty:"1",po_quantity:"1",poi_price:"12",
      uom_unit:"Litre",uom_id:2,poi_id:1,poi_is_active:true,vendor_rate_id:16,vr_id:16,singleItemPrice:12}]}


    //  {"cinema_id":4,"v_id":7,"po_date":"2019-11-01T06:08:00.000Z","po_total_amount":12,"po_lock":true,"po_is_active":true,
    //  "vendorList":[{"rm_name":"Hot Dog Bread","rm_id":"37","po_quantity":"","poi_qty":"1","uom_unit":"Litre","uom_id":2,"po_total_amount":"","vendor_rate_id":23,"poi_is_active":true,"poi_price":12}]}
]
// {"cinema_id":2,"vendor_id":2,"rmv_is_default_vendor":"Y","rmv_is_active":"Y",
// "selectedRawMaterials":[{"name":"Hot Dog Bread","rm_id":37,"vr_qty":"1","uom_id":2,"uom_unit":"Litre","vr_rate":"12","vr_is_active":true}]}
let params = {    
    addPurchaseOrder: {
        url: `http://localhost:3800/purchase_orders`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    purchaseOrderList: {
        url: `http://localhost:3800/purchase_orders`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
   viewSinglePurchaseOrder: {
       url: `http://localhost:3800/purchase_orders?${data[1].po_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editPurchaseOrder: {
        url: `http://localhost:3800/purchase_orders?${data[1].po_id}}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In user controller', function () {
    this.timeout(200000);
    describe('viewSinglePurchaseOrder', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSinglePurchaseOrder)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('purchaseOrderList', function () {
        it('should return the correct value', async function () {
            await axios(params.purchaseOrderList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addPurchaseOrder', function () {
        it('should return the correct value', async function () {
            await axios(params.addPurchaseOrder)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editPurchaseOrder', function () {
        it('should return the correct value', async function () {
            await axios(params.editPurchaseOrder)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})