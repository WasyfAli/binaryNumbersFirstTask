const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
    {screen_id:"",cinema_id:6,screen_name:"SCREEN",screen_no_of_seats:"12",
    screen_no_of_cols:"10",screen_no_of_rows:"10",screen_format_id:1,screen_is_active:true},
    {screen_id:74,cinema_id:6,screen_name:"SCREEN",screen_no_of_seats:"12",
    screen_no_of_cols:"10",screen_no_of_rows:"10",screen_format_id:1,screen_is_active:true},


    
]
let params = {    
    addScreens: {
        url: `http://localhost:3800/admin/screens`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    screensList: {
        url: `http://localhost:3800/admin/screens`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleScreens: {
        url: `http://localhost:3800/admin/screens?${data[1].screen_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editScreens: {
        url: `http://localhost:3800/admin/screens/${data[1].screen_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleScreens', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleScreens)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('screensList', function () {
        it('should return the correct value', async function () {
            await axios(params.screensList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addScreens', function () {
        it('should return the correct value', async function () {
            await axios(params.addScreens)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editScreens', function () {
        it('should return the correct value', async function () {
            await axios(params.editScreens)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})