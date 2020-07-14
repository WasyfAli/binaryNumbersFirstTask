const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
   
    
]
let params = {    
    addBookingDiscounts: {
        url: `http://localhost:3800/admin/ms_booking_sources`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    bookingDiscountsList: {
        url: `http://localhost:3800/admin/ms_booking_sources`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleBookingDiscounts: {
        url: `http://localhost:3800/admin/ms_booking_sources?${data[1].bs_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editBookingDiscounts: {
        url: `http://localhost:3800/admin/ms_booking_sources/${data[1].bs_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleBookingDiscounts', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleBookingDiscounts)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('bookingDiscountsList', function () {
        it('should return the correct value', async function () {
            await axios(params.bookingDiscountsList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addBookingDiscounts', function () {
        it('should return the correct value', async function () {
            await axios(params.addBookingDiscounts)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editBookingDiscounts', function () {
        it('should return the correct value', async function () {
            await axios(params.editBookingDiscounts)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})