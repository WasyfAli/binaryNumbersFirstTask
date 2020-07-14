const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
  
    {currency_id:"1",float_id:null,float_amount_given:"120",manager_user_id:1,operator_user_id:16,
    hardware_setting_id:10,shift_id:1,float_is_active:"Y",created_at:null,created_by:null},

    {float_id:11,float_amount_given:"121",manager_user_id:1,operator_user_id:16,currency_id:1,
    shift_id:1,hardware_setting_id:10,float_is_active:"Y",curr_code:"INR",hs_hardware_name:"POS Machine",
    shift_name:"Morning",created_by:1,updated_by:null,created_at:"2019-11-07T12:36:16.000Z",updated_at:null,
    operator_user:"Jay Mewada",manager_user:"Super Admin"}
    
]
let params = {    
    addFloatAmount: {
        url: `http://localhost:3800/api/admin/cinemafloatamount`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    floatAmountList: {
        url: `http://localhost:3800/api/admin/cinemafloatamount`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleFloatAmount: {
        url: `http://localhost:3800/api/admin/cinemafloatamount?${data[1].float_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editFloatAmount: {
        url: `http://localhost:3800/api/admin/cinemafloatamount/${data[1].float_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleFloatAmount', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleFloatAmount)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('floatAmountList', function () {
        it('should return the correct value', async function () {
            await axios(params.floatAmountList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addFloatAmount', function () {
        it('should return the correct value', async function () {
            await axios(params.addFloatAmount)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editFloatAmount', function () {
        it('should return the correct value', async function () {
            await axios(params.editFloatAmount)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})