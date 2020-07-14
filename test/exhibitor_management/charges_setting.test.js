const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
    {pas_charge_setting_name:"sett",cinema_id:1,created_at:"",created_by:"",updated_by:"",updated_at:"",
    CinemaChargesSettingList:[{pas_id:null,selectedChargeType:"Service Charge",charge_type_id:5,
    pas_start_date:"2019-11-01T12:20:00.000Z",pas_end_date:"2019-11-13T12:20:00.000Z",pas_charge_value:"123",
    pas_is_percentage:"Y",pas_is_deduction:"Y",pas_is_taxable:"Y",pas_is_shareable_with_distributor:"Y",
    pas_is_overnabove:"Y",pas_is_active:"Y",created_at:"",created_by:"",updated_by:"",updated_at:""}]},


    // {pas_charge_setting_name:"sett",cinema_id:1,created_at:"",created_by:"",updated_by:"",updated_at:"",
    // CinemaChargesSettingList:[{pas_id:null,selectedChargeType:"Service Charge",charge_type_id:5,
    // pas_start_date:"2019-11-01T12:20:00.000Z",pas_end_date:"2019-11-13T12:20:00.000Z",pas_charge_value:"123",
    // pas_is_percentage:"Y",pas_is_deduction:"Y",pas_is_taxable:"Y",pas_is_shareable_with_distributor:"Y",
    // pas_is_overnabove:"Y",pas_is_active:"Y",created_at:"",created_by:"",updated_by:"",updated_at:""}]}




]
let params = {    
    addChargesSetting: {
        url: `http://localhost:3800/api/admin/cinemacharges`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    chargesSettingList: {
        url: `http://localhost:3800/api/admin/cinemacharges`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    // viewSingleChargesSetting: {
    //     url: `http://localhost:3800/api/admin/seattype?${data[1].cinema_id}`,
    //     method: 'GET',
    //     headers: { 'Authorization': jwt_token },
    //     // data: data[1],
    // },
    // editChargesSetting: {
    //     url: `http://localhost:3800/api/admin/seattype/${data[1].cinema_id}`,
    //     method: 'PUT',
    //     headers: { 'Authorization': jwt_token },
    //     data: data[1],
    // },
}

describe('In designation controller', function () {
    this.timeout(200000);
    // describe('viewSingleChargesSetting', function () {
    //     it('should return the correct value', async function () {
    //         await axios(params.viewSingleChargesSetting)
    //             .then(res => {
    //                 assert.isObject(res.data)
    //                 assert.equal(res.data.status, true);
    //             }).catch(err => { console.log(err); assert.fail("Request Failed"); })
    //     })
    // })
    describe('chargesSettingList', function () {
        it('should return the correct value', async function () {
            await axios(params.chargesSettingList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addChargesSetting', function () {
        it('should return the correct value', async function () {
            await axios(params.addChargesSetting)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    // describe('editChargesSetting', function () {
    //     it('should return the correct value', async function () {
    //         await axios(params.editChargesSetting)
    //             .then(res => {
    //                 assert.isObject(res.data)
    //                 assert.equal(res.data.status, true);
    //             }).catch(err => { console.log(err); assert.fail("Request Failed"); })
    //     })
    // })
})