const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
    {srt_id:"",srt_name:"test",srt_is_active:true},
    {srt_id:10,srt_name:"test",srt_is_active:true}
]
let params = {    
    addSeatReservationType: {
        url: `http://localhost:3800/admin/ms_seat_reserve_types`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    seatReservationTypeList: {
        url: `http://localhost:3800/admin/ms_seat_reserve_types`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleSeatReservationType: {
        url: `http://localhost:3800/admin/ms_seat_reserve_types?${data[1].srt_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editSeatReservationType: {
        url: `http://localhost:3800/admin/ms_seat_reserve_types/${data[1].srt_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleSeatReservationType', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleSeatReservationType)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('seatReservationTypeList', function () {
        it('should return the correct value', async function () {
            await axios(params.seatReservationTypeList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addSeatReservationType', function () {
        it('should return the correct value', async function () {
            await axios(params.addSeatReservationType)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editSeatReservationType', function () {
        it('should return the correct value', async function () {
            await axios(params.editSeatReservationType)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})