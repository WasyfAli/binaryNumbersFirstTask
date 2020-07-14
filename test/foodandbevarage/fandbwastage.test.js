const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [

    {cinema_id:1,concession_level_id:9,rm_id:1,fw_quantity:3,uom_id:6,fw_reason:"test",fw_accountable_user_id:38,
    fw_is_approved:"",fw_approved_by:2,fw_fine_amount:"10",fw_date:"2019-11-05T11:17:00.000Z",fw_is_active:true},

    {fw_id:1,cinema_id:1,concession_level_id:9,rm_id:1,fw_quantity:2,uom_id:6,fw_reason:"Misplaced",
    fw_accountable_user_id:47,fw_is_approved:"Y",fw_approved_by:38,fw_fine_amount:"211",fw_date:"2019-10-07T18:30:00.000Z",
    fw_is_active:"Y",created_by:null,created_at:null,updated_by:null,updated_at:null,rm_code:"T123",rm_name:"Tissues",
    rm_rte:"N",rm_description:"Tissues",stock_alert_quantity_threshold:5,uom_id_threshold:6,rm_is_perishable:"N",
    rm_image_url:null,rm_is_active:"Y",cl_id:9,cl_name:"Level 1",cl_is_active:"Y",user_id:38,username:"yogeshh",
    first_name:"Yogeshh",middle_name:"H",last_name:"Kokel",email_id:"yogesh@binarnumbers.io",mobile_no:"9167044095",
    distributor_id:null,role_id:1,reporting_to:1,password:"$2a$10$OOu4NAAcl5LpUXd21ONXh.fxVcOhPRrEcYjg28OrexlmvSQ/vtapi",
    email_verified:"Y",mobile_verified:"Y",is_system:"N",is_active:"Y",current_login_date_time:"0000-00-00 00:00:00",
    last_login_date_time:"0000-00-00 00:00:00",uom_unit:"Packet",uom_short_form:"Pkt",uom_parent_id:0,uom_formula:null,
    uom_description:"Packet",uom_is_active:"Y"}
 ]
let params = {    
    addFandBWastage: {
        url: `http://localhost:3800/fnb_wastage`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[0]
    },
    fandBPricingWastageList: {
        url: `http://localhost:3800/fnb_wastages`,
        method: 'POST',
        headers: { 'Authorization': jwt_token }
    },
   viewSingleFandBWastage: {
       url: `http://localhost:3800/fnb_wastages/${data[1].fw_id}`,
        method: 'GET',
        headers: { 'Authorization': jwt_token },
        // data: data[1],
    },
    editFandBWastage: {
        url: `http://localhost:3800/fnb_wastage?${data[1].fw_id}}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
}

describe('In user controller', function () {
    this.timeout(200000);
    describe('viewSingleFandBWastage', function () {
        it('should return the correct value', async function () {
            await axios(params.viewSingleFandBWastage)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('fandBPricingWastageList', function () {
        it('should return the correct value', async function () {
            await axios(params.fandBPricingWastageList)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('addFandBWastage', function () {
        it('should return the correct value', async function () {
            await axios(params.addFandBWastage)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('editFandBWastage', function () {
        it('should return the correct value', async function () {
            await axios(params.editFandBWastage)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})