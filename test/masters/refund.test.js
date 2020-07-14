const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
    {rr_id:"",rr_reason:"test",rr_is_active:true},
    {rr_id:6,rr_reason:"test",rr_is_active:true}

]
let params = {    
    addRefund: {
        url: `http://localhost:3800/admin/ms_refund_reasons`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
  refundList: {
        url: `http://localhost:3800/admin/ms_refund_reasons`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleRefund: {
        url: `http://localhost:3800/admin/ms_refund_reasons?${data[1].rr_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editRefund: {
        url: `http://localhost:3800/admin/ms_refund_reasons/${data[1].rr_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleRefund', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleRefund)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('refundList', function () {
        it('should return the correct value', async function () {
            await axios(params.refundList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addRefund', function () {
        it('should return the correct value', async function () {
            await axios(params.addRefund)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editRefund', function () {
        it('should return the correct value', async function () {
            await axios(params.editRefund)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})