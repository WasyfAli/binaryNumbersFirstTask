const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
    {fc_id:3,item_code:"1234",recipe_id:2,
    item_is_veg:true,item_is_recipe:"",item_image_url:"/uploads/fnb_item/1572946423451-download.png",includes_egg:true},

    {item_id:21,item_code:"12333",fc_id:1,recipe_id:21,item_is_veg:true,includes_egg:true,
    item_image_url:"/uploads/fnb_item/1572946905113-download.png",
    created_by:null,created_at:null,updated_by:1,updated_at:"0000-00-00 00:00:00",
    recipe_code:"123",recipe_name:"test",category_id:19,recipe_is_combo:"Y",recipe_expiry_days:12,
    recipe_description:"testdes",recipe_is_active:"Y",fc_category:"Beverages",fc_parent_id:0,
    fc_icon_url:"/uploads/food_category/1570705783167-beverages.png",fc_icon_active_url:null,fc_is_active:"Y"}
]
let params = {    
    addFandBItems: {
        url: `http://localhost:3800/fnb_items`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    fandBItemsList: {
        url: `http://localhost:3800/fnb_items`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
   viewSingleFandBItems: {
       url: `http://localhost:3800/recipe/${data[1].item_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editFandBItems: {
        url: `http://localhost:3800/fnb_items?${data[1].item_id}}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In user controller', function () {
    this.timeout(200000);
    describe('viewSingleFandBItems', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleFandBItems)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('fandBItemsList', function () {
        it('should return the correct value', async function () {
            await axios(params.fandBItemsList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addFandBItems', function () {
        it('should return the correct value', async function () {
            await axios(params.addFandBItems)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editFandBItems', function () {
        it('should return the correct value', async function () {
            await axios(params.editFandBItems)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})