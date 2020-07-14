const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
    {buc_id:"",buc_category_name:"testtoday",buc_is_active:true},
   
    {buc_id:4,buc_category_name:"test"}

   
]
let params = {    
    addBookingUserCategory: {
        url: `http://localhost:3800/admin/ms_booking_user_categories`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    bookingUserCategoryList: {
        url: `http://localhost:3800/admin/ms_booking_user_categories`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleBookingUserCategory: {
        url: `http://localhost:3800/admin/ms_booking_user_categories?${data[1].buc_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editBookingUserCategory: {
        url: `http://localhost:3800/admin/ms_booking_user_categories/${data[1].buc_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleBookingUserCategory', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleBookingUserCategory)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('bookingUserCategoryList', function () {
        it('should return the correct value', async function () {
            await axios(params.bookingUserCategoryList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addBookingUserCategory', function () {
        it('should return the correct value', async function () {
            await axios(params.addBookingUserCategory)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editBookingUserCategory', function () {
        it('should return the correct value', async function () {
            await axios(params.editBookingUserCategory)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})