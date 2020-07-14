const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
    {production_id:"",production_name:"testtest",production_is_active:true},
  


]
let params = {    
    addModule: {
        url: `http://localhost:3800/admin/ms_production_companies`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    moduleList: {
        url: `http://localhost:3800/admin/ms_production_companies`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
   
   
}

describe('In designation controller', function () {
    this.timeout(200000);
    // describe('viewSingleModule', function () {
    //     it('should return the correct value', async function () {
    //         await axios(params.viewSingleModule)
    //             .then(res => {
    //                 assert.isObject(res.data)
    //                 assert.equal(res.data.status, true);
    //             }).catch(err => { console.log(err); assert.fail("Request Failed"); })
    //     })
    // })
    describe('moduleList', function () {
        it('should return the correct value', async function () {
            await axios(params.moduleList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addModule', function () {
        it('should return the correct value', async function () {
            await axios(params.addModule)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    // describe('editModule', function () {
    //     it('should return the correct value', async function () {
    //         await axios(params.editModule)
    //             .then(res => {
    //                 assert.isObject(res.data)
    //                 assert.equal(res.data.status, true);
    //             }).catch(err => { console.log(err); assert.fail("Request Failed"); })
    //     })
    // })
})