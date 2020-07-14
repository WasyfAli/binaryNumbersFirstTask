const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
    {cinema_id:2,screen_id:61,sst_id:null,sst_seat_type:"test",sst_seat_color_code:"#000000",
    sst_no_of_seats:"12",sst_is_active:"Y",created_at:"2019-11-07T11:44:32.058Z",created_by:1},

    {cinema_id:2,screen_id:61,sst_id:45,sst_seat_type:"test",sst_seat_color_code:"#000000",
    sst_no_of_seats:"13",sst_is_active:"Y",updated_at:null,updated_by:null,created_by:2019,
    created_at:"0000-00-00 00:00:00",screen_name:"Screen Vox1",screen_no_of_seats:100,screen_no_of_cols:30,
    screen_no_of_rows:40,screen_format_id:2,screen_is_active:"Y",cine_id:2,org_id:1,cine_name:"Vox",
    cine_token:null,cine_location:null,cine_address:"a",city_id:1,state_id:1,country_id:1,cine_screens:3,
    cine_thumbnail:null,cine_phone:"12",cine_email:"a@gmail.com",cine_latitude:"72",cine_longitude:"19",
    cine_pincode:"40000",cine_booking_cut_off_time:null,currency_id:null,cine_interval_time:null,
    cine_cleaning_time:null,cine_registration_number:"12",cine_license_number:"12",cine_operations_start_time:null,
    cine_operations_end_time:null,cine_advertisement_time:null,cine_is_active:"Y"}
]
let params = {    
    addSeatType: {
        url: `http://localhost:3800/api/admin/seattype`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    seatTypeList: {
        url: `http://localhost:3800/api/admin/seattype`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleSeatType: {
        url: `http://localhost:3800/api/admin/seattype?${data[1].cinema_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editSeatType: {
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