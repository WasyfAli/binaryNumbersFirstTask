const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
    {pm_id:"",pm_payment_mode:"test",pm_is_active:true},
    {pm_id:11,pm_payment_mode:"test",pm_is_active:true},


]
let params = {    
    addPaymentMode: {
        url: `http://localhost:3800/admin/ms_payment_modes`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    paymentModeList: {
        url: `http://localhost:3800/admin/ms_payment_modes`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSinglePaymentMode: {
        url: `http://localhost:3800/admin/ms_payment_modes?${data[1].pm_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editPaymentMode: {
        url: `http://localhost:3800/admin/ms_payment_modes/${data[1].pm_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSinglePaymentMode', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSinglePaymentMode)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('paymentModeList', function () {
        it('should return the correct value', async function () {
            await axios(params.paymentModeList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addPaymentMode', function () {
        it('should return the correct value', async function () {
            await axios(params.addPaymentMode)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editPaymentMode', function () {
        it('should return the correct value', async function () {
            await axios(params.editPaymentMode)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})