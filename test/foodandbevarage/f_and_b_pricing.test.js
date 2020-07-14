const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
      
    {item_id:5,cinema_id:1,currency_id:"1",fnb_rate_card_id:22,fp_amount:150,fp_total_amount:200,
    fp_from_date:"2019-10-04T18:30:00.000Z",fp_to_date:"2019-11-04T18:30:00.000Z",fp_is_active:"N",created_at:"2019-10-05T09:40:46.000Z",
    created_by:1,updated_at:null,updated_by:null,item_code:"007",fc_id:14,recipe_id:5,item_is_veg:"Y",includes_egg:"N",
    item_image_url:"/uploads/fnb_item/1571914849952-popcorn1.jpg",recipe_code:null,
    recipe_name:"Salted Popcorn",category_id:14,recipe_is_combo:"N",recipe_expiry_days:5,recipe_description:"Salted Popcorn",recipe_is_active:"Y"},
   
    {fp_id:1,item_id:5,cinema_id:1,currency_id:"1",fnb_rate_card_id:22,fp_amount:150,fp_total_amount:200,
    fp_from_date:"2019-10-04T18:30:00.000Z",fp_to_date:"2019-11-04T18:30:00.000Z",fp_is_active:"N",created_at:"2019-10-05T09:40:46.000Z",
    created_by:1,updated_at:null,updated_by:null,item_code:"007",fc_id:14,recipe_id:5,item_is_veg:"Y",includes_egg:"N",
    item_image_url:"/uploads/fnb_item/1571914849952-popcorn1.jpg",recipe_code:null,
    recipe_name:"Salted Popcorn",category_id:14,recipe_is_combo:"N",recipe_expiry_days:5,recipe_description:"Salted Popcorn",recipe_is_active:"Y"}
]
let params = {    
    addFandBPricing: {
        url: `http://localhost:3800/ms_fnbprice`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    fandBPricingList: {
        url: `http://localhost:3800/fnb_pricing`,
        method: 'POST',
        headers: { 'Authorization': jwt_token }
    },
   viewSingleFandBPricing: {
       url: `http://localhost:3800/fnb_pricing/${data[1].fp_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editFandBPricing: {
        url: `http://localhost:3800/ms_fnbprice?${data[1].fp_id}}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In user controller', function () {
    this.timeout(200000);
    describe('viewSingleFandBPricing', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleFandBPricing)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('fandBPricingList', function () {
        it('should return the correct value', async function () {
            await axios(params.fandBPricingList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addFandBPricing', function () {
        it('should return the correct value', async function () {
            await axios(params.addFandBPricing)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editFandBPricing', function () {
        it('should return the correct value', async function () {
            await axios(params.editFandBPricing)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})