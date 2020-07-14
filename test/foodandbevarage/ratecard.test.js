const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
    {cinema_id:4,frc_name:"test",frc_amount:123,currency_id:"1",
    frc_is_active_inclusivtax:"Y",frc_net_amount:123,frc_total_amount:123,frc_pas_setting_name:"Empire",cinemaChargesList:[]},

    {id:35,cinema_id:4,frc_name:"test",frc_amount:123,frc_total_amount:123,currency_id:1,
    frc_is_active:"Y",frc_is_active_inclusivtax:"Y",curr_id:1,curr_code:"INR",curr_name:"Indian Rupees",
    curr_is_active:"Y",created_by:1,created_at:"2019-11-05T09:53:21.000Z",updated_by:1,updated_at:"2019-11-05T09:53:21.000Z",
    frc_id:35,
    frc_pas_setting_name:"Empire",frc_net_amount:123,chargesList:[],cinemaChargesList:[]}
   
]
let params = {    
    addRateCard: {
        url: `http://localhost:3800/api/admin/fnb_rate_cards`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    rateCardList: {
        url: `http://localhost:3800/api/admin/fnb_rate_cards`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
   viewSingleRateCard: {
       url: `http://localhost:3800/api/admin/fnb_rate_cards?${data[1].id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editRateCard: {
        url: `http://localhost:3800/api/admin/fnb_rate_cards/${data[1].id}}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In user controller', function () {
    this.timeout(200000);
    describe('viewSingleRateCard', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleRateCard)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('rateCardList', function () {
        it('should return the correct value', async function () {
            await axios(params.rateCardList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addRateCard', function () {
        it('should return the correct value', async function () {
            await axios(params.addRateCard)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editRateCard', function () {
        it('should return the correct value', async function () {
            await axios(params.editRateCard)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})