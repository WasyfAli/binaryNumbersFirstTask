const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [

    {cinema_id:17,rc_name:"12",rc_amount:120,currency_id:"1",rc_is_active_inclusivtax:"Y",rc_net_amount:120,
    rc_total_amount:120,rc_pas_setting_name:"Viviana",cinemaChargesList:[]},
    {cinema_id:17,rc_name:"12",rc_amount:120,currency_id:"1",rc_is_active_inclusivtax:"Y",rc_net_amount:120,
    rc_total_amount:120,rc_pas_setting_name:"Viviana",cinemaChargesList:[]}

   
]
let params = {    
    addRateCard: {
        url: `http://localhost:3800/api/admin/seattype`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    rateCardList: {
        url: `http://localhost:3800/api/admin/seattype`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleRateCard: {
        url: `http://localhost:3800/api/admin/seattype?${data[1].cinema_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editRateCard: {
        url: `http://localhost:3800/api/admin/seattype/${data[1].cinema_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleSeatType', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleSeatType)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('seatTypeList', function () {
        it('should return the correct value', async function () {
            await axios(params.seatTypeList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addSeatType', function () {
        it('should return the correct value', async function () {
            await axios(params.addSeatType)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editSeatType', function () {
        it('should return the correct value', async function () {
            await axios(params.editSeatType)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})