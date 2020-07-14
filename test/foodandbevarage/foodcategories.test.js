const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
    {fc_category:"testuesday",fc_parent_id:14,fc_is_active:true,
    fc_icon_url:"/uploads/food_category/1572937493767-download.png",fc_icon_active_url:"/uploads/food_category/1572937500310-download.png"},
    {fc_id:35,fc_category:"testuesday",fc_parent_id:14,fc_is_active:true,
    fc_icon_url:"/uploads/food_category/1572937493767-download.png",fc_icon_active_url:"/uploads/food_category/1572937500310-download.png"},
  
]
// {"fc_category":"testuesdayy","fc_parent_id":14,"fc_is_active":"N",
// "fc_icon_url":"/uploads/food_category/1572937670278-download.png","fc_icon_active_url":"/uploads/food_category/1572937678233-download.png",
// "fc_id":35}
//  {fc_category:"testuesday",fc_parent_id:14,fc_is_active:true,
//  fc_icon_url:"/uploads/food_category/1572937493767-download.png",fc_icon_active_url:"/uploads/food_category/1572937500310-download.png"}
let params = {    
    addfoodcategories: {
        url: `http://localhost:3800/food_categories`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    foodcategoriesList: {
        url: `http://localhost:3800/api/admin/tablelist/ms_food_categories`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    viewSinglefoodcategories: {
        url: `http://localhost:3800/api/admin/tablelist/ms_food_categories?${data[1].fc_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editfoodcategories: {
        url: `http://localhost:3800/food_categories?${data[1].fc_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In designation controller', function () {
    this.timeout(200000);
    describe('viewSinglefoodcategories', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSinglefoodcategories)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('foodcategoriesList', function () {
        it('should return the correct value', async function () {
            await axios(params.foodcategoriesList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addfoodcategories', function () {
        it('should return the correct value', async function () {
            await axios(params.addfoodcategories)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editfoodcategories', function () {
        it('should return the correct value', async function () {
            await axios(params.editfoodcategories)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})