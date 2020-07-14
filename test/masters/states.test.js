const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
   
    {state_id:"",state_name:"test",state_code:"12",country_id:1,state_is_active:true},
    {state_id:19,state_name:"test",state_code:"12",country_id:1,state_is_active:true}
 
]
let params = {    
    addState: {
        url: `http://localhost:3800/admin/ms_states`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    stateList: {
        url: `http://localhost:3800/admin/ms_states`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleState: {
        url: `http://localhost:3800/admin/ms_states?${data[1].state_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editState: {
        url: `http://localhost:3800/admin/ms_states/${data[1].state_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleState', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleState)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('stateList', function () {
        it('should return the correct value', async function () {
            await axios(params.stateList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addState', function () {
        it('should return the correct value', async function () {
            await axios(params.addState)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editState', function () {
        it('should return the correct value', async function () {
            await axios(params.editState)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})