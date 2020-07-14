const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
  
    {cinema_id:1,concession_level_id:10,hardware_id:15,hs_username:"TEST",hs_password:"123456",hs_cpu_id:"133",hs_remarks:"TEST",
    hs_hardware_name:"TEST",hs_connection_port:"13231",hs_is_active:"Y",hs_is_disabled:"N",hs_installed_by:"TEST",
    hs_installed_at:"2019-11-07T13:34:59.146Z",created_at:null,created_by:null},
    {h_id:17,cinema_id:1,concession_level_id:10,hardware_id:15,hs_username:"TEST",hs_password:"123456",hs_cpu_id:"133",hs_remarks:"TEST",
    hs_hardware_name:"TEST",hs_connection_port:"13231",hs_is_active:"Y",hs_is_disabled:"N",hs_installed_by:"TEST",
    hs_installed_at:"2019-11-07T13:34:59.146Z",created_at:null,created_by:null}

]
let params = {    
    addHardwaresSettings: {
        url: `http://localhost:3800/api/admin/hardwaresetting`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    hardwaresSettingsList: {
        url: `http://localhost:3800/api/admin/hardwaresetting`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleHardwaresSettings: {
        url: `http://localhost:3800/api/admin/hardwaresetting?${data[1].h_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editHardwaresSettings: {
        url: `http://localhost:3800/api/admin/hardwaresetting/${data[1].h_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleHardwaresSettings', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleHardwaresSettings)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('hardwaresSettingsList', function () {
        it('should return the correct value', async function () {
            await axios(params.hardwaresSettingsList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addHardwaresSettings', function () {
        it('should return the correct value', async function () {
            await axios(params.addHardwaresSettings)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editHardwaresSettings', function () {
        it('should return the correct value', async function () {
            await axios(params.editHardwaresSettings)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})