const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
   
    {bs_id:"",bs_source:"test",bs_is_active:true},
    {bs_id:6,bs_source:"test",bs_is_active:true}
]
let params = {    
    addBookingSource: {
        url: `http://localhost:3800/admin/ms_booking_sources`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    bookingSourceList: {
        url: `http://localhost:3800/admin/ms_booking_sources`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleBookingSource: {
        url: `http://localhost:3800/admin/ms_booking_sources?${data[1].bs_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editBookingSource: {
        url: `http://localhost:3800/admin/ms_booking_sources/${data[1].bs_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleBookingSource', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleBookingSource)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('bookingSourceList', function () {
        it('should return the correct value', async function () {
            await axios(params.bookingSourceList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addBookingSource', function () {
        it('should return the correct value', async function () {
            await axios(params.addBookingSource)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editBookingSource', function () {
        it('should return the correct value', async function () {
            await axios(params.editBookingSource)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})