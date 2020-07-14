const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
    {cine_name:"INOX Cinema",org_id:1,currency_id:null,cine_location:null,
    cine_address:"#4, 2nd Floor, Citi Mall, Oshiwara Link Road, Andheri West, Mumbai, Maharashtra 400053",
    cine_pincode:"400053",country_id:1,state_id:1,city_id:1,cine_phone:"8097026388",
    cine_email:"yogesh@binarynumbers.io",cine_screens:3,cine_latitude:"72",cine_longitude:"19",
    cine_booking_cut_off_time:null,cine_license_number:"100",cine_registration_number:"99",
    cine_operations_start_time:null,cine_operations_end_time:null,cine_is_active:true},

    {cine_id:36,cine_name:"INOX Cinema",org_id:1,currency_id:null,cine_location:null,
    cine_address:"#4, 2nd Floor, Citi Mall, Oshiwara Link Road, Andheri West, Mumbai, Maharashtra 400053",
    cine_pincode:"400053",country_id:1,state_id:1,city_id:1,cine_phone:"8097026388",
    cine_email:"yogesh@binarynumbers.io",cine_screens:3,cine_latitude:"72",cine_longitude:"19",
    cine_booking_cut_off_time:null,cine_license_number:"100",cine_registration_number:"99",
    cine_operations_start_time:null,cine_operations_end_time:null,cine_is_active:true}
]
let params = {    
    addUserShifts: {
        url: `http://localhost:3800/admin/ms_cinemas`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    userShiftsList: {
        url: `http://localhost:3800/admin/ms_cinemas`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleUserShifts: {
        url: `http://localhost:3800/admin/ms_cinemas?${data[1].cine_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editUserShifts: {
        url: `http://localhost:3800/admin/ms_cinemas/${data[1].cine_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleUserShifts', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleUserShifts)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('userShiftsList', function () {
        it('should return the correct value', async function () {
            await axios(params.userShiftsList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addUserShifts', function () {
        it('should return the correct value', async function () {
            await axios(params.addUserShifts)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editUserShifts', function () {
        it('should return the correct value', async function () {
            await axios(params.editUserShifts)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})