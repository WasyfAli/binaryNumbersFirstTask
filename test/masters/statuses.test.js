const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [

    {s_id:"",s_status_code:"test",
    s_status_display:"Dependent",s_is_show_status:true,s_is_booking_status:true,s_is_active:true},

    {s_id:19,s_status_code:"test",
    s_status_display:"Dependent",s_is_show_status:true,s_is_booking_status:true,s_is_active:true}
   
    
]
let params = {    
    addStatuses: {
        url: `http://localhost:3800/admin/ms_statuses`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    statusesList: {
        url: `http://localhost:3800/admin/ms_statuses`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleStatuses: {
        url: `http://localhost:3800/admin/ms_statuses?${data[1].s_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editStatuses: {
        url: `http://localhost:3800/admin/ms_statuses/${data[1].s_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleStatuses', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleStatuses)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('statusesList', function () {
        it('should return the correct value', async function () {
            await axios(params.statusesList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addStatuses', function () {
        it('should return the correct value', async function () {
            await axios(params.addStatuses)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editStatuses', function () {
        it('should return the correct value', async function () {
            await axios(params.editStatuses)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})