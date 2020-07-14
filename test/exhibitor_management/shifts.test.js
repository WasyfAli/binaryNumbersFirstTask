const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [

    {shift_id:"",shift_name:"test",shift_working_hrs:"5",shift_is_box_office:true,
    shift_is_fnb:true,shift_start_time:"5",shift_end_time:"10",shift_is_active:true},
    {shift_id:7,shift_name:"test",shift_working_hrs:"5",shift_is_box_office:true,
    shift_is_fnb:true,shift_start_time:"5",shift_end_time:"10",shift_is_active:true}
    
]
let params = {    
    addShifts: {
        url: `http://localhost:3800/admin/ms_shifts`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    shiftsList: {
        url: `http://localhost:3800/admin/ms_shifts`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleShifts: {
        url: `http://localhost:3800/admin/ms_shifts?${data[1].shift_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editShifts: {
        url: `http://localhost:3800/admin/ms_shifts/${data[1].shift_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleShifts', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleShifts)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('shiftsList', function () {
        it('should return the correct value', async function () {
            await axios(params.shiftsList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addShifts', function () {
        it('should return the correct value', async function () {
            await axios(params.addShifts)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editShifts', function () {
        it('should return the correct value', async function () {
            await axios(params.editShifts)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})