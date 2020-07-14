const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
  
    {aggregator_id:"",aggregator_name:"testtoday",contract_start_date:"2019-07-01",contract_end_date:"2019-07-04",
    aggregator_api_id:"123",
    aggregator_authentication_code:"121",aggregator_username:"testtoday",aggregator_password:"123456",aggregator_is_active:true},

    {aggregator_id:4,aggregator_name:"testtoday",contract_start_date:"2019-07-01",contract_end_date:"2019-07-04",
    aggregator_api_id:"123",
    aggregator_authentication_code:"121",aggregator_username:"testtoday",aggregator_password:"123456",aggregator_is_active:true}

]
let params = {    
    addAggregator: {
        url: `http://localhost:3800/admin/ms_aggregators`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    aggregatorList: {
        url: `http://localhost:3800/admin/ms_aggregators`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleAggregator: {
        url: `http://localhost:3800/admin/ms_aggregators?${data[1].aggregator_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editAggregator: {
        url: `http://localhost:3800/admin/ms_aggregators/${data[1].aggregator_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleAggregator', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleAggregator)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('aggregatorList', function () {
        it('should return the correct value', async function () {
            await axios(params.aggregatorList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addAggregator', function () {
        it('should return the correct value', async function () {
            await axios(params.addAggregator)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editAggregator', function () {
        it('should return the correct value', async function () {
            await axios(params.editAggregator)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})