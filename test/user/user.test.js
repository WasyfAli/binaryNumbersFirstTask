const assert = require('chai').assert;
const axios = require('axios');
var jwt_token = require('../token');
jwt_token = jwt_token.jwt_token;
let data = [
    { username: "superadmin", password: "Smi@123" },
    { username: makeid(6), user_profile_image_url: "/uploads/users/1572427647166-instagram_PNG3.png", first_name: "Test", middle_name: "Test", last_name: "Test", email_id: "yogesh@binarynumbers.io", mobile_no: '98' + Math.floor(Math.random() * 100000000).toString(), cinema_id: 1, role_id: 9, password: "Yogesh123", zipcode: "400053", up_employee_code: "", up_dob: "2019-10-01T09:23:00.000Z", up_doj: "2019-10-01T09:23:00.000Z", "up_address1": "#4, 2nd Floor, Citi Mall, Oshiwara Link Road, Andheri West, Mumbai, Maharashtra 400053", "up_alt_contact_no": '98' + Math.floor(Math.random() * 100000000).toString(), "designation_id": 9, "gender_id": 1, "city_id": 1, "state_id": 1, "country_id": 1, "department_id": 2, "d_id": 7, "flag": { "isDistributor": true } },
    { user_id: 87, username: makeid(6), user_profile_image_url: "/uploads/users/1572427647166-instagram_PNG3.png", first_name: "Test", middle_name: "Test", last_name: "Test", email_id: "yogesh@binarynumbers.io", mobile_no: '98' + Math.floor(Math.random() * 100000000).toString(), cinema_id: 1, role_id: 9, password: "Yogesh123", zipcode: "400053", up_employee_code: "", up_dob: "2019-10-01T09:23:00.000Z", up_doj: "2019-10-01T09:23:00.000Z", "up_address1": "#4, 2nd Floor, Citi Mall, Oshiwara Link Road, Andheri West, Mumbai, Maharashtra 400053", "up_alt_contact_no": '98' + Math.floor(Math.random() * 100000000).toString(), "designation_id": 9, "gender_id": 1, "city_id": 1, "state_id": 1, "country_id": 1, "department_id": 2, "d_id": 7, "flag": { "isDistributor": true } },
]

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

let params = {
    login: {
        url: `http://localhost:3800/userslogin`,
        method: 'POST',
        data: data[0]
    },
    userslist: {
        url: `http://localhost:3800/users`,
        method: 'GET',
        headers: { 'Authorization': jwt_token }
    },
    adduser: {
        url: `http://localhost:3800/users`,
        method: 'POST',
        headers: { 'Authorization': jwt_token },
        data: data[1],
    },
    edituser: {
        url: `http://localhost:3800/users/${data[2].user_id}`,
        method: 'PUT',
        headers: { 'Authorization': jwt_token },
        data: data[2],
    },
}

describe('In user controller', function () {
    this.timeout(200000);
    describe('userlogin', function () {
        it('should return the correct value', async function () {
            await axios(params.login)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('userslist', function () {
        it('should return the correct value', async function () {
            await axios(params.userslist)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('adduser', function () {
        it('should return the correct value', async function () {
            await axios(params.adduser)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
    describe('edituser', function () {
        it('should return the correct value', async function () {
            await axios(params.edituser)
                .then(res => {
                    assert.isObject(res.data)
                    assert.equal(res.data.status, true);
                }).catch(err => { console.log(err); assert.fail("Request Failed"); })
        })
    })
})