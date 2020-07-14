const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
  
    {cinema_id:1,screen_id:36,schedule_show_id:2,refund_reason_id:7,scd_is_active:"Y",md_id:1},
    
    {cine_name:"Test",cine_id:1,screen_name:"Screen 1",screen_id:36,scd_is_active:"Y",scd_id:3,
    ss_id:3,ss_start_show_time:"4:00 PM",ss_start_date:"2019-10-09T18:30:00.000Z",movie_details_id:10,
    rr_reason:"Booked different movie",refund_reason_id:2,
    created_at:"2019-08-30T11:21:30.000Z",created_by:1,updated_at:null,updated_by:null,cinema_id:1,md_id:10}
    
]
let params = {    
    addRefund: {
        url: `http://localhost:3800/api/admin/refund`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    refundList: {
        url: `http://localhost:3800/api/admin/refund`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleRefund: {
        url: `http://localhost:3800/api/admin/refund?${data[1].scd_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editRefund: {
        url: `http://localhost:3800/api/admin/refund/${data[1].scd_id}`,
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