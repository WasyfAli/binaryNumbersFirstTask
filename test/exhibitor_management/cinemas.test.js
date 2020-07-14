const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
    {cine_id:"",cine_name:"test",org_id:26,currency_id:2,cine_location:"test",cine_address:"asd",
    cine_pincode:"400706",country_id:1,state_id:1,city_id:1,cine_phone:"1234567891",cine_email:"test@gmail.com",
    cine_screens:"1",cine_latitude:"12",cine_longitude:"12",cine_booking_cut_off_time:"12",cine_license_number:"qwert",
    cine_registration_number:"12345",cine_operations_start_time:"12",cine_operations_end_time:"12",cine_is_active:true},
    

    {cine_id:37,cine_name:"test",org_id:26,currency_id:2,cine_location:"test",cine_address:"asd",
    cine_pincode:"400706",country_id:1,state_id:1,city_id:1,cine_phone:"1234567891",cine_email:"test@gmail.com",
    cine_screens:"1",cine_latitude:"12",cine_longitude:"12",cine_booking_cut_off_time:"12",cine_license_number:"qwert",
    cine_registration_number:"12345",cine_operations_start_time:"12",cine_operations_end_time:"12",cine_is_active:true},

    
]
let params = {    
    addCinemas: {
        url: `http://localhost:3800/admin/ms_cinemas`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    cinemasList: {
        url: `http://localhost:3800/admin/ms_cinemas`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleCinemas: {
        url: `http://localhost:3800/admin/ms_cinemas?${data[1].cine_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editCinemas: {
        url: `http://localhost:3800/admin/ms_cinemas/${data[1].cine_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleCinemas', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleCinemas)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('cinemasList', function () {
        it('should return the correct value', async function () {
            await axios(params.cinemasList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addCinemas', function () {
        it('should return the correct value', async function () {
            await axios(params.addCinemas)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editCinemas', function () {
        it('should return the correct value', async function () {
            await axios(params.editCinemas)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})