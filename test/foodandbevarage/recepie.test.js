const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
    {recipe_code:"123",recipe_name:"test",category_id:4,recipe_is_combo:true,
    recipe_expiry_days:"10",recipe_description:"des",recipe_is_active:true,
    selectedRecipe:[{raw_material_id:4,ri_quantity:"1",uom_id:1,raw_material_name:"Samosa",
    uom_unit:"Kilogram",ri_is_countable:true,ri_is_active:true}]},

    {recipe_id:13,recipe_code:"123",recipe_name:"test",category_id:4,recipe_is_combo:true,
    recipe_expiry_days:"10",recipe_description:"des",recipe_is_active:true,
    selectedRecipe:[{raw_material_id:4,ri_quantity:"1",uom_id:1,raw_material_name:"Samosa",
    uom_unit:"Kilogram",ri_is_countable:true,ri_is_active:true}]},


    // {"recipe_id":26,"recipe_code":"123","recipe_name":"testt","category_id":4,"recipe_is_combo":true,"recipe_expiry_days":10,
    // "recipe_description":"des","recipe_is_active":true,"created_at":null,"created_by":null,"updated_at":"0000-00-00 00:00:00",
    // "updated_by":1,"ri_id":122,"raw_material_id":4,"ri_quantity":1,"uom_id":1,"ri_is_countable":"Y","ri_is_active":"Y",
    // "fc_id":4,"fc_category":"Snacks","fc_parent_id":0,"fc_icon_url":null,"fc_icon_active_url":null,"fc_is_active":"Y",
    // "rm_id":4,"rm_code":null,"rm_name":"Samosa","rm_rte":"N","rm_description":"Samosa","stock_alert_quantity_threshold":5,
    // "uom_id_threshold":1,"rm_is_perishable":"N","rm_image_url":null,"rm_is_active":"Y","uom_unit":"Kilogram",
    // "uom_short_form":"Kg","uom_parent_id":null,"uom_formula":null,"uom_description":"Kilogram","uom_is_active":"Y",
    // "selectedRecipe":[{"ri_id":122,"raw_material_id":4,"ri_quantity":1,"uom_id":1,"raw_material_name":"Samosa",
    // "uom_unit":"Kilogram","ri_is_countable":true,"ri_is_active":true}]}

    //   {recipe_code:"123",recipe_name:"test",category_id:4,recipe_is_combo:true,
    //   recipe_expiry_days:"10",recipe_description:"des",recipe_is_active:true,
    //   selectedRecipe:[{raw_material_id:4,ri_quantity:"1",uom_id:1,raw_material_name:"Samosa",
    //   uom_unit:"Kilogram",ri_is_countable:true,ri_is_active:true}]}
   
]
let params = {    
    addRecipes: {
        url: `http://localhost:3800/recipes`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    recipesList: {
        url: `http://localhost:3800/api/admin/tablelist/ms_recipes`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
   viewSingleRecipes: {
       url: `http://localhost:3800/recipe/${data[1].recipe_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editRecipes: {
        url: `http://localhost:3800/recipes?${data[1].recipe_id}}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In user controller', function () {
    this.timeout(200000);
    describe('viewSingleRecipes', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleRecipes)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('recipesList', function () {
        it('should return the correct value', async function () {
            await axios(params.recipesList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addRecipes', function () {
        it('should return the correct value', async function () {
            await axios(params.addRecipes)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editRecipes', function () {
        it('should return the correct value', async function () {
            await axios(params.editRecipes)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})