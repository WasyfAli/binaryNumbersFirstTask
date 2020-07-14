const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
    {image_setting_id:"",image_setting_name:"test",
    image_setting_height:"13",image_setting_width:"10",image_setting_ratio:"1",image_setting_is_active:true},
    {image_setting_id:25,image_setting_name:"test",
    image_setting_height:"13",image_setting_width:"10",image_setting_ratio:"1",image_setting_is_active:true}
]
let params = {    
    addImageSetting: {
        url: `http://localhost:3800/admin/ms_image_settings`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    imageSettingList: {
        url: `http://localhost:3800/admin/ms_image_settings`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSingleImageSetting: {
        url: `http://localhost:3800/admin/ms_image_settings?${data[1].image_setting_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editImageSetting: {
        url: `http://localhost:3800/admin/ms_image_settings/${data[1].image_setting_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSingleImageSetting', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleImageSetting)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('imageSettingList', function () {
        it('should return the correct value', async function () {
            await axios(params.imageSettingList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addImageSetting', function () {
        it('should return the correct value', async function () {
            await axios(params.addImageSetting)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editImageSetting', function () {
        it('should return the correct value', async function () {
            await axios(params.editImageSetting)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})