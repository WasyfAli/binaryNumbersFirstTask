const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [

    {crew_id:"",crew_title:"test",crew_is_active:true},
    {crew_id:9,crew_title:"test",crew_is_active:true}
]
let params = {    
    addCrews: {
        url: `http://localhost:3800/admin/ms_crew`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    crewsList: {
        url: `http://localhost:3800/admin/ms_crew`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleCrews: {
        url: `http://localhost:3800/admin/ms_crew?${data[1].crew_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editCrews: {
        url: `http://localhost:3800/admin/ms_crew/${data[1].crew_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleCrews', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleCrews)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('crewsList', function () {
        it('should return the correct value', async function () {
            await axios(params.crewsList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addCrews', function () {
        it('should return the correct value', async function () {
            await axios(params.addCrews)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editCrews', function () {
        it('should return the correct value', async function () {
            await axios(params.editCrews)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})