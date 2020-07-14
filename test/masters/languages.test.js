const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
    {lang_id:"",lang_name:"test",lang_is_active:true},
    {lang_id:11,lang_name:"test",lang_is_active:true},

    
    
]
let params = {    
    addLanguages: {
        url: `http://localhost:3800/admin/ms_language`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    languagesList: {
        url: `http://localhost:3800/admin/ms_language`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleLanguages: {
        url: `http://localhost:3800/admin/ms_language?${data[1].lang_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editLanguages: {
        url: `http://localhost:3800/admin/ms_language/${data[1].lang_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleLanguages', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleLanguages)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('languagesList', function () {
        it('should return the correct value', async function () {
            await axios(params.languagesList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addLanguages', function () {
        it('should return the correct value', async function () {
            await axios(params.addLanguages)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editLanguages', function () {
        it('should return the correct value', async function () {
            await axios(params.editLanguages)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})