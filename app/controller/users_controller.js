'use strict'
var jwt_token = require('jsonwebtoken')
var sendmail = require('@/app/util/mail/sendmail');
const jwtDecode = require('jwt-decode')
var momentTimeZone = require('moment-timezone');
var bcrypt = require('bcryptjs');
var validator = require('validator')
var sql = require('@/app/database.js')
const uuidv4 = require('uuid/v4')
var Users = require('@/model/users_model')
const async = require('async');
var moment = require('moment');
const { getGlobalOption } = require('@/app/helper/collection');
import { sqlPaginate, sqlTableCount } from '@/helper/collection';

var token
exports.list_all_users = function (req, res) {
    Users.getAllUsers(req, function (err, task, counts) {
        if (err) {
            res.status(200).json({
                status: false,
                message: "Internal Server Error"
            });
        } else if (task.length > 0) {
            res.status(200).json({
                status: true,
                // message: "",
                data: task,
                totalRows: counts
            });
        } else {
            res.status(200).json({
                status: false,
                message: "No Records Found"
            });
        }
    });
};

exports.list_all_aggregator_users = function (req, res) {
    Users.getAllAggreagatorUsers(req, function (err, task, counts) {
        if (err) {
            res.status(200).json({
                status: false,
                message: "Internal Server Error"
            });
        } else if (task.length > 0) {
            res.status(200).json({
                status: true,
                // message: "",
                data: task,
                totalRows: counts
            });
        } else {
            res.status(200).json({
                status: false,
                message: "No Records Found"
            });
        }
    });
}

exports.list_all_modules = function (req, res) {
    console.log('req.body :', req.body);
    let FirstArray = []
    let ActiveModules = []
    let SecondArray = []
    let ThirdArray = []
    let payload = req.body
    console.log('payload :', payload);
    async.waterfall([
        function (callback) {
            let SQLSelectQuery = `SELECT module_category_id,module_name FROM ms_module_category`
            global.sql.query(SQLSelectQuery, function (error, result) {
                if (error) {
                    callback(null, false, { status: false, message: "Database SQL Error", error })
                } else if (result.length === 0) {
                    callback(null, false, { status: false, message: "No Records Found", error })
                } else if (result.length > 0) {
                    FirstArray = result;
                    console.log('result :', result);
                    callback(null, true, result)
                };
            });
        },
        function (status, result1, callback) {
            // arg1 now equals 'one' and arg2 now equals 'two'
            if (status) {
                let SQLSelectQuery = `SELECT module_id,module_name,module_category_id as sub_module FROM ms_modules`
                global.sql.query(SQLSelectQuery, function (error, result) {
                    if (error) {
                        callback(null, false, { status: false, message: "Database SQL Error", error })
                    } else if (result.length === 0) {
                        callback(null, false, { status: false, message: "No Records Found", error })
                    } else if (result.length > 0) {
                        console.log('result34 :', result);
                        SecondArray = result;
                        callback(null, true, result)
                    };
                });
            } else {
                callback(null, false, 'No Record')
            }
        },
        function (status, result1, callback) {
            // arg1 now equals 'one' and arg2 now equals 'two'
            if (status) {
                let SQLSelectQuery = `SELECT * FROM user_permission where role_id=${payload.role_id}`
                global.sql.query(SQLSelectQuery, function (error, result) {
                    if (error) {
                        callback(null, false, { status: false, message: "Database SQL Error", error })
                    } else if (result.length === 0) {
                        SecondArray = SecondArray.map((x) => {
                            x['view'] = 'N'
                            x['edit'] = 'N'
                            return x;
                        })
                        console.log('SecondArray56 :', SecondArray);
                        callback(null, true, { status: false, message: "No Records Found", error })
                    } else if (result.length > 0) {
                        // console.log('result34 :', result);
                        ThirdArray = result;
                        ThirdArray.map((x) => {
                            if (x.is_active == 'Y') {
                                ActiveModules.push(x.module_id)
                            }
                        })
                        console.log('ActiveModules :', ActiveModules);
                        console.log('SecondArray :', SecondArray);
                        console.log('ThirdArray :', ThirdArray);
                        SecondArray = SecondArray.map((x) => {
                            ThirdArray.map((y) => {
                                if (x.module_id === y.module_id) {
                                    if (y.access_id == 1) {
                                        x['view'] = y.is_active
                                    }
                                    else if (y.access_id == 2) {
                                        x['edit'] = y.is_active
                                    }
                                }
                                //  else {
                                //     x['view'] = 'N'
                                //     x['edit'] = 'N'

                                // }
                            })
                            return x;
                        })
                        console.log('SecondArray12 :', SecondArray);
                        callback(null, true, result)
                    };
                });
            } else {
                callback(null, true, result1)
            }
        },
        function (status, result1, callback) {
            // arg1 now equals 'three'
            if (status) {

                FirstArray = FirstArray.map((x) => {
                    x['modules'] = []
                    SecondArray.map((y) => {
                        if (x.module_category_id == y.sub_module) {
                            x.modules.push(y)
                        }
                    })
                    return x;
                })

                callback(null, FirstArray)

                console.log('FirstArray :', FirstArray);

            } else {
                callback(null, 'No Record')
            }
        }
    ], function (err, result) {
        // result now equals 'done'
        if (err) {
            return res.status(200).json({
                status: false,
                message: "Error",
                err
            });
        } else {
            // console.log('result :', result);
            return res.status(200).json({
                status: true,
                message: "Successfully",
                Records: result,
                ActiveModules: ActiveModules
            });
        }
    });


}

exports.edit_permissions = function (req, res) {
    console.log('req.body :', req.body);
    let userinfo = req['user_info'];
    let FirstArray = []
    let SecondArray = []
    let ThirdArray = []
    let payload = req.body
    let obj = null;
    console.log('payload :', payload);
    async.waterfall([
        function (callback) {
            let SQLSelectQuery = `SELECT * FROM user_permission WHERE role_id=${payload.role_id} AND access_id=${payload.access_id} AND module_id=${payload.module_id}`
            global.sql.query(SQLSelectQuery, function (error, result) {
                if (error) {
                    callback(null, { status: false, message: "Database SQL Error", error })
                } else if (result.length === 0) {
                    if (payload.access_id == 1) {
                        obj = {
                            role_id: payload.role_id,
                            module_id: payload.module_id,
                            access_id: payload.access_id,
                            is_active: payload.mod.view,
                            created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                            created_by: userinfo['user_id']
                        }
                    } else if (payload.access_id == 2) {
                        obj = {
                            role_id: payload.role_id,
                            module_id: payload.module_id,
                            access_id: payload.access_id,
                            is_active: payload.mod.edit,
                            created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                            created_by: userinfo['user_id']
                        }
                    }
                    global.sql.query('INSERT INTO user_permission set ?', obj, function (insertErrorNew, result) {
                        if (insertErrorNew) {
                            callback(null, { status: false, message: 'Database SQL Error', insertErrorNew });
                        } else {
                            callback(null, { status: true, message: 'Earnings Inserted' })
                        }
                    })
                } else if (result.length > 0) {
                    if (payload.access_id == 1) {
                        obj = {
                            // role_id: payload.role_id,
                            module_id: payload.module_id,
                            // access_id: payload.access_id,
                            is_active: payload.mod.view,
                            updated_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                            updated_by: userinfo['user_id']
                        }
                    } else if (payload.access_id == 2) {
                        obj = {
                            // role_id: payload.role_id,
                            module_id: payload.module_id,
                            // access_id: payload.access_id,
                            is_active: payload.mod.edit,
                            updated_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                            updated_by: userinfo['user_id']
                        }
                    }
                    global.sql.query(`UPDATE user_permission set ? WHERE role_id=${payload.role_id} AND access_id=${payload.access_id} AND module_id=${payload.module_id}`, obj, function (insertErrorNew, result) {
                        if (insertErrorNew) {
                            callback(null, { status: false, message: 'Database SQL Error', insertErrorNew });
                        } else {
                            callback(null, { status: true, message: 'Earnings Inserted' })
                        }
                    })
                };
            });
        },

    ], function (err, result) {
        // result now equals 'done'
        if (err) {
            return res.status(200).json({
                status: false,
                message: "Error",
                err
            });
        } else {
            // console.log('result :', result);
            return res.status(200).json({
                status: true,
                message: "Successfully",
            });
        }
    });


}


exports.get_all_renunciation = async function (req, res) {
    let paginate = sqlPaginate(req.query);
    let counts = await sqlTableCount(`select COUNT(*) as count from users u left join user_profiles up ON u.user_id=up.user_id where u.is_active='N' AND u.role_id != 1`);

    console.log('counts :', counts);
    global.sql.query(`select * from users u left join user_profiles up ON u.user_id=up.user_id where u.is_active='N' AND u.role_id != 1 ${paginate}`, function (error, result) {
        if (error) {
            console.log('error :', error);
            res.json({ Status: false, Message: error })
        } else {
            // console.log('result :', result);
            res.json({
                Status: true,
                Message: 'Fetched Renunciation Successfully.',
                Records: result,
                totalRows: counts.count
            })
        }
    })
    // counts = await sqlTableCount(`Select count(*) as count from users where user_id > 3 AND is_active = 'Y'`);
}

exports.create_a_renunciation = function (req, res) {
    console.log('req create_a_renunciation:', req.body.userid);
    let userinfo = req['user_info'];
    let queryDateDetails = {
        created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        created_by: userinfo ? userinfo['user_id'] : 1,
        updated_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        updated_by: userinfo ? userinfo['user_id'] : 1
    }

    if (String(req.body.userid) && req.body.userid != null) {

        global.sql.query(`UPDATE user_profiles set up_dol=?, up_reason_for_leaving=?,up_is_active=?, updated_at=?, updated_by=? where user_id=? `, [moment(req.body.leavingdate).format('YYYY-MM-DD'), req.body.reason, 'N', queryDateDetails.updated_at, queryDateDetails.updated_by, req.body.userid], function (error, result) {
            if (error) {
                console.log('error :', error);
                res.json({ Status: false, Message: error })
            } else {
                if (result.changeRows != 0) {
                    global.sql.query(`UPDATE users set is_active=?, updated_at=?, updated_by=? where user_id=? `, ['N', queryDateDetails.updated_at, queryDateDetails.updated_by, req.body.userid], function (_error, _result) {
                        if (_error) {
                            console.log('error :', _error);
                            res.json({ Status: false, Message: _error })
                        } else {
                            res.json({ Status: true, Message: 'Updated Renunciation Successfully.' })
                        }
                    })
                }
            }
        })
    }
}

exports.create_a_users = function (req, res) {
    console.log('req.user_info.role_id :>> ', req.user_info.role_id);
    if (req.user_info.role_id == 1 || req.user_info.role_id == 2) {
        try {
            // console.log("req.body :", req.body);
            let isCinema = req.body.flag.isDistributor ? true : req.body.cinema_id;
            console.log(':::::req.body.cinema_id::::::::::KK ', req.body.cinema_id);
            console.log(':::::::iscinema:::::::::', isCinema);
            if (
                req.body.username &&
                    req.body.first_name &&
                    req.body.last_name &&
                    req.body.email_id &&
                    req.body.mobile_no &&
                    isCinema ? true : true &&
                    req.body.role_id &&
                    req.body.password
            ) { /*(Bcoz zipcode is not mandatory )&&req.body.zipcode*/
                // if (req.body.username && req.body.first_name && req.body.last_name && req.body.email_id && req.body.mobile_no
                //   && req.body.cinema_id && req.body.role_id && req.body.password && req.body.zipcode) {
                var new_users = new Users(req.body, null);
                new_users['created_by'] = req["user_info"] ? req["user_info"].user_id : "1" || "1";

                var userProfileData = {
                    up_employee_code: req.body.up_employee_code,
                    designation_id: req.body.designation_id,
                    department_id: req.body.department_id,
                    zipcode: req.body.zipcode,
                    gender_id: req.body.gender_id,
                    up_dob: moment(req.body.up_dob).format('YYYY-MM-DD'),
                    up_doj: req.body.up_doj && req.body.up_doj.length > 0 ? moment(req.body.up_doj).format('YYYY-MM-DD') : null,
                    up_address1: req.body.up_address1,
                    city_id: req.body.city_id,
                    state_id: req.body.state_id,
                    country_id: req.body.country_id,
                    up_alt_contact_no: req.body.up_alt_contact_no,
                    user_profile_image_url: req.body.user_profile_image_url,
                    // distributor_id: req.body.d_id,
                    up_is_active: "Y",
                    created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                    created_by: req["user_info"] ? req["user_info"].user_id : "1" || "1",
                    up_employment_type: req.body.employeementSelectedType
                };


                var today_date = moment().format("YYYY-MM-DD HH:mm:ss");
                var current_day_plus_seven = moment(today_date).add(7, 'days');
                var formatted_current_day_plus_seven = moment(current_day_plus_seven).format("YYYY-MM-DD");
                var formatted_doj = moment(userProfileData.up_doj).format("YYYY-MM-DD");
                var final_date = moment(formatted_doj).isSameOrBefore(formatted_current_day_plus_seven);

                console.log("formatted_doj ", formatted_doj);
                console.log("formatted_current_day_plus_seven ", formatted_current_day_plus_seven);
                console.log("valuee = ", final_date);

                var verified = validation(new_users);
                console.log("verified :", verified);

                if (verified) {
                    res.json({
                        status: false,
                        message: verified[0].message
                    });
                } else {
                    // if (final_date) {
                    if (true) { /*bcoz while selecting role distributor doj disabled (Late)*/
                        Users.createUsers(new_users, userProfileData, req, function (
                            error,
                            users
                        ) {
                            if (error) {
                                res.status(200).json({
                                    error,
                                    status: false,
                                    message: "Internal Server Error"
                                });
                            } else {
                                console.log('req.body.role_id :', req.body.role_id);
                                if (req.body.role_id == 10) {
                                    const random = uuidv4();
                                    let tokenObj = {
                                        user_id: users.user_id,
                                        user_token: random,
                                        idmulti_token: null,
                                        is_active: "Y"
                                    };
                                    // console.log('tokenObj :', tokenObj);
                                    global.sql.query("INSERT INTO multi_token SET ?", tokenObj);
                                    token = jwt_token.sign({ token: random }, req.app.config.jwtSecret || 'welcomeuser');
                                }
                                var logs = {
                                    user_id: users.user_id,
                                    tbl_name: "users",
                                    query: "INSERT INTO users set " + users,
                                    remarks: "Register a new user with user_id = " + users.user_id,
                                    created_at: new Date()
                                };
                                global.sql.query("INSERT INTO logs SET ?", logs);
                                res.status(200).json({
                                    status: true,
                                    message: "User Registered",
                                    data: users
                                });
                            }
                        });
                    } else {
                        res.json({
                            status: false,
                            message: "Date of joining should be less than than todays date plus seven"
                        });
                    }
                }
            } else {
                res.json({
                    status: false,
                    message: "Missing Mandatory Fields"
                });
            }
        } catch (error) {
            res.status(200).json({
                error,
                status: false,
                message: "Page not found"
            });
        }
    } else {
        res.status(200).json({
            status: false,
            message: 'You are not Authorized to create user',
            error: 'Access Denied'
        });
    }
};

exports.update_a_users = function (req, res) {
    if (req.user_info.role_id == 1 || req.user_info.role_id == 2) {
        try {
            let isCinema = req.body.flag.isDistributor ? true : req.body.cinema_id;

            // if (req.body.username && req.body.first_name && req.body.last_name && req.body.email_id && req.body.mobile_no
            //   && req.body.cinema_id && req.body.role_id) {
            if (
                req.body.username &&
                    req.body.first_name &&
                    req.body.last_name &&
                    req.body.email_id &&
                    req.body.mobile_no &&
                    isCinema ? true : true &&
                    req.body.role_id
            ) {
                Users.getUsersById(req.body.user_id, null, null, function (err, users) {
                    if (err) {
                        res.status(500).json({
                            status: false,
                            message: "Internal Server Error"
                        });
                    } else {
                        var user = new Users(req.body);
                        var userProfileData = {
                            up_employee_code: req.body.up_employee_code,
                            designation_id: req.body.designation_id,
                            department_id: req.body.department_id,
                            gender_id: req.body.gender_id,
                            up_dob: req.body.up_dob,
                            up_doj: req.body.up_doj,
                            up_address1: req.body.up_address1,
                            city_id: req.body.city_id,
                            state_id: req.body.state_id,
                            country_id: req.body.country_id,
                            up_alt_contact_no: req.body.up_alt_contact_no,
                            user_profile_image_url: req.body.user_profile_image_url,
                            up_is_active: "Y",
                            created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                            created_by: req["user_info"] ? req["user_info"].user_id : "1" || "1",
                            up_employment_type: req.body.up_employment_type,
                        };
                        var verified = validation(user);
                        if (verified) {
                            res.json({
                                status: false,
                                message: verified[0].message
                            });
                        } else {
                            user.password = users[0].password;
                            Users.updateById(req.body.user_id, user, userProfileData, function (
                                err,
                                usr
                            ) {
                                if (err) {
                                    res.status(500).json({
                                        status: false,
                                        message: "Internal Server Error"
                                    });
                                } else {
                                    Users.getUsersById(user.user_id, null, null, function (
                                        err,
                                        usrs
                                    ) {
                                        var logs = {
                                            user_id: usrs[0].user_id,
                                            tbl_name: "users",
                                            query: "UPDATE users SET username = " +
                                                user.username +
                                                ",first_name = " +
                                                user.first_name +
                                                ",middle_name = " +
                                                user.middle_name +
                                                ",last_name = " +
                                                user.last_name +
                                                ",email_id = " +
                                                user.email_id +
                                                ",mobile_no = " +
                                                user.mobile_no +
                                                ",cinema_id = " +
                                                user.cinema_id +
                                                ",role_id = " +
                                                user.role_id +
                                                ",reporting_to = " +
                                                user.reporting_to +
                                                ",password = " +
                                                user.password +
                                                ",salt = " +
                                                user.salt +
                                                ",email_verified = " +
                                                user.email_verified +
                                                ",mobile_verified = " +
                                                user.mobile_verified +
                                                ",is_active = " +
                                                user.is_active +
                                                ",current_login_date_time = " +
                                                user.current_login_date_time +
                                                ",last_login_date_time = " +
                                                moment(user.last_login_date_time).format('YYYY-MM-DD HH:mm:ss') +
                                                ",distributor_id = " +
                                                req.body.d_id +
                                                ",created_by = " +
                                                user.created_by +
                                                ",created_at = " +
                                                user.created_at +
                                                ",updated_by = " +
                                                user.updated_by +
                                                ",updated_at = " +
                                                user.updated_at +
                                                "  WHERE user_id= " +
                                                user.user_id,
                                            remarks: "Update a User in DB ",
                                            created_at: new Date()
                                        };
                                        global.sql.query("INSERT INTO logs SET ?", logs);
                                        res.status(200).json({
                                            status: true,
                                            message: "Updated User",
                                            data: usrs[0]
                                        });
                                    });
                                }
                            });
                        }
                    }
                });
            } else {
                res.json({
                    status: false,
                    message: "Missing Mandatory Fields"
                });
            }
        } catch (error) {
            res.status(404).json({
                status: false,
                message: "Page not found"
            });
        }
    } else {
        res.status(200).json({
            status: false,
            message: 'You are not Authorized to update user',
            error: 'Access Denied'
        });
    }
};

exports.verifyUsername = function (req, res) {
    console.log('req.body :', req.body);

    // console.log('object :', req.body.otpFlag);

    // let otpflag = req.body.otpFlag ? 'Y' : 'N';
    // console.log('otpflag :', otpflag);

    let query = `Select * from users where username='${req.body.username}'`

    global.sql.query(query, function (error, result) {
        console.log('error, result :', result);
        if (error) {
            return res.status(200).json({
                error,
                message: "Database SQL Error",
                status: false
            });
        } else if (result && result.length > 0) {
            let otpkey = Math.floor(Math.random() * 900000) + 100000;
            let mailOptions = {
                to: result[0].email_id,
                subject: 'Reset Password',
                text: 'Your OTP Verification Number is ' + otpkey,
                template: 'OTPVerify',
                messageBody: {
                    user_name: result[0].first_name + ' ' + result[0].last_name,
                    OTP_key: otpkey
                }
            }
            sendmail.sendEmail(mailOptions)

            let userinfo = req['user_info'];

            let InsertObj = {
                user_id: result[0].user_id,
                otp: otpkey,
                otp_isExpired: 'N',
                created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                created_by: userinfo ? userinfo['user_id'] : 1,
                updated_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                updated_by: userinfo ? userinfo['user_id'] : 1
            };

            global.sql.query(`INSERT forgot_password SET ?`, InsertObj, function (_error, _result) {
                console.log('_result :', _result.insertId);
                if (_error) {
                    return res.status(200).json({
                        error: _error,
                        message: "Insert SQL Error",
                        status: false
                    });
                } else {
                    return res.status(200).json({
                        error: null,
                        message: "OTP has been sent to your registered Email ID.",
                        status: true,
                        id: result[0].user_id,
                        ins_id: _result.insertId
                    });
                }
            });

            // return res.status(200).json({
            //   error: null,
            //   message: "Username match.",
            //   status: true,
            //   id: result[0].user_id
            // });

        } else {
            return res.status(200).json({
                error: null,
                message: "Username Doesn't exists, Kindly contact your administrator",
                status: false
            });
        }
    });
};

exports.verifyPassword = function (req, res) {
    console.log('req.body :', req.body);

    if (req.body && req.body.userpassword.length > 0) {

        global.sql.query(`select password from users where user_id = ${req.body.userid}`, function (errpassword, resultpassword) {
            console.log('resultpassword :', resultpassword);
            if (errpassword) {
                return res.status(200).json({
                    error,
                    message: "Database SQL Error",
                    status: false
                });
            } else {
                bcrypt.compare(req.body.userpassword, resultpassword[0].password, function (err, result) {
                    console.log('res :', result);
                    if (result == true) {
                        return res.status(200).json({
                            message: "Password Matched.",
                            status: true
                        });
                    } else {
                        return res.status(200).json({
                            error: err,
                            message: "Current Password Doesn't match.",
                            status: false
                        });
                    }
                });
            }
        })
    } else {
        return res.status(200).json({
            message: "Please enter Current Password.",
            status: false
        });
    }
}

exports.UpdateChangePassword = function (req, res) {
    console.log('req.body :', req.body);
    let userinfo = req['user_info'];
    let queryDateDetails = {
        created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        created_by: userinfo['user_id'],
        updated_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        updated_by: userinfo['user_id']
    };


    if (req.body && req.body.password.length > 0) {

        let password = bcrypt.hashSync(req.body.password, 10)
        // console.log('password :', password);
        let data = [password, queryDateDetails.updated_by, queryDateDetails.updated_at, req.body.userid];
        global.sql.query(`Update users set password = ?, updated_by = ?, updated_at = ? where user_id = ?`, data, function (updateerr, updateresult) {
            // console.log('updateerr :', updateerr);
            // console.log('updateresult :', updateresult);
            if (updateerr) {
                return res.status(200).json({
                    error: updateerr,
                    message: "Database SQL Error",
                    status: false
                });
            } else {
                return res.status(200).json({
                    message: "Password Changed Successfuly.",
                    status: true
                });
            }
        })
    } else {
        return res.status(200).json({
            message: "Password not updated. Please try again later.",
            status: false
        });
    }
}

exports.verifyOTP = function (req, res) {
    // console.log('req.body :', req.body);

    let OTPquery = `Select * from forgot_password where otp='${req.body.otpnumber}' AND user_id='${req.body.userid}'`

    global.sql.query(OTPquery, function (error, result) {
        console.log('error, result :', result);
        if (error) {
            return res.status(200).json({
                error,
                message: "Database SQL Error",
                status: false
            });
        } else if (result && result.length > 0) {
            return res.status(200).json({
                error: null,
                message: "OTP Matched.",
                status: true
            });
        } else {
            return res.status(200).json({
                error: null,
                message: "OTP Doesn't Match, Please try again.",
                status: false
            });
        }
    });
};

exports.OTPExpiry = function (req, res) {
    console.log('req.body :::', req.body);

    if (req.body.username != '' && req.body.uni_id != '') {

        let updated_at = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        // let updated_by = userinfo ? userinfo['user_id'] : 1

        let query = `Update forgot_password SET otp_isExpired = ?, updated_at=? where fp_id = ?`
        let queryArray = ['Y', updated_at, req.body.uni_id];

        console.log('query, queryArray :', query, queryArray);

        global.sql.query(query, queryArray, function (update_Error, updateResult) {
            console.log('object :', update_Error, updateResult);
            if (update_Error) {
                return res.status(200).json({
                    error: update_Error,
                    message: "Database SQL Error",
                    status: false
                });
            } else {
                return res.status(200).json({
                    error: null,
                    message: "Your OTP is Expired.",
                    status: true
                });
            }
        })
    }
};

exports.forgetPassword = function (req, res) {
    console.log('req.body :', req.body);
    const valid = validator.matches(req.body.password, /^[0-9A-Za-z !@#$%]{8,16}$/, 'i')

    let reqbody = {
        email_id: req.body['email_id'] || null,
        username: req.body['username'] || null,
        password: req.body['password'] || null,
        confirmPassword: req.body['confirmPassword'] || null
    };

    console.log('reqbody :', reqbody);

    if (!reqbody['username'] && String(reqbody['username']).trim().length > 0 && !reqbody['password'] && reqbody['password'] == null && !reqbody['confirmPassword'] && reqbody['confirmPassword'] == null) {
        return res.status(200).json({
            status: false,
            message: "Unable to update password.",
            error: null
        });
    } else {

        let password = bcrypt.hashSync(reqbody.password, 10);
        let updated_at = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

        console.log('password :', password);
        console.log('reqbody :', reqbody['password']);

        let SQLUpdateQuery = '';
        let UniqueUpdateArray = [];
        if (reqbody['username']) {
            SQLUpdateQuery = `UPDATE users SET  password = ?, updated_at = ? WHERE username=? `;
            UniqueUpdateArray = [password, updated_at, reqbody.username];
        }
        // else if (req.body['email_id']) {
        //   SQLUpdateQuery = `UPDATE users SET  password = ?, updated_at = ? WHERE email_id=? `;
        //   UniqueUpdateArray = [password, updated_at, reqbody.email_id];
        // };

        // console.log('SQLUpdateQuery :', SQLUpdateQuery);

        global.sql.query(SQLUpdateQuery, UniqueUpdateArray, function (updateError, updateResult) {
            if (updateError) {
                return res.status(200).json({
                    error: updateError,
                    message: "Database SQL Error",
                    status: false
                });
            } else {
                return res.status(200).json({
                    error: null,
                    message: "Your Password Successfully Updated.",
                    status: true
                });
            }
        })
    }

    // if (!reqbody['username'] && !reqbody['email_id'] && String(reqbody['username']).trim().length === 0 && String(reqbody['email_id']).trim().length === 0) {
    //   return res.status(200).json({
    //     status: false,
    //     message: "Please enter your email or username.",
    //     error: null
    //   });
    // }
    // // else if (!reqbody['email_id'] || String(reqbody['email_id']).length === 0) {
    // //   return res.status(200).json({
    // //     status: false,
    // //     message: "Please enter your email.",
    // //     error: null
    // //   });
    // // } 
    // else if (!reqbody['password'] || String(reqbody['password']).length === 0) {
    //   return res.status(200).json({
    //     status: false,
    //     message: "Please enter your password.",
    //     error: null
    //   });
    // } else if (!reqbody['confirmPassword'] || String(reqbody['confirmPassword']).trim().length === 0) {
    //   return res.status(200).json({
    //     status: false,
    //     message: "Please enter your confirm password.",
    //     error: null
    //   });
    // }
    // else if (reqbody['password'] && reqbody['confirmPassword'] && reqbody['confirmPassword'] !== reqbody['password']) {
    //   return res.status(200).json({
    //     status: false,
    //     message: "Your password and confirm password is not matching.",
    //     error: null
    //   });
    // } else if (!valid) {
    //   return res.status(200).json({
    //     status: false,
    //     message: "Please enter valid password.",
    //     error: null
    //   });
    // } else {
    //   let SQLSelectQuery = '';
    //   let UniqueSelectArray = [];
    //   if (reqbody['username']) {
    //     SQLSelectQuery = 'SELECT *  FROM users WHERE username= ? ';
    //     UniqueSelectArray = reqbody.username;
    //   } else if (req.body['email_id']) {
    //     SQLSelectQuery = 'SELECT *  FROM users WHERE email_id= ? ';
    //     UniqueSelectArray = reqbody.email_id;
    //   };

    //   console.log('SQLSelectQuery :', SQLSelectQuery);

    //   global.sql.query(SQLSelectQuery, [UniqueSelectArray], function (error, result) {
    //     if (error) {
    //       return res.status(200).json({
    //         error,
    //         message: "Database SQL Error",
    //         status: false
    //       });
    //     } else if (!result) {
    //       return res.status(200).json({
    //         error: null,
    //         message: "User data is not available in Database, Kindly contact your administrator",
    //         status: false
    //       });
    //     } else if (result && result.length == 0) {
    //       return res.status(200).json({
    //         error: null,
    //         message: "User data is not available in Database, Kindly contact your administrator",
    //         status: false
    //       });
    //     } else if (result && result.length > 0) {
    //       // bcrypt.compare(req.body.password, password, function (err, result) {
    //       //   console.log('err, result :', err, result);
    //       // });
    //       let password = bcrypt.hashSync(reqbody.password, 10);
    //       let updated_at = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    //       let SQLUpdateQuery = '';
    //       let UniqueUpdateArray = [];
    //       if (reqbody['username']) {
    //         SQLUpdateQuery = `UPDATE users SET  password = ?, updated_at = ? WHERE username=? `;
    //         UniqueUpdateArray = [password, updated_at, reqbody.username];
    //       } else if (req.body['email_id']) {
    //         SQLUpdateQuery = `UPDATE users SET  password = ?, updated_at = ? WHERE email_id=? `;
    //         UniqueUpdateArray = [password, updated_at, reqbody.email_id];
    //       };

    //       console.log('SQLUpdateQuery :', SQLUpdateQuery);

    //       global.sql.query(SQLUpdateQuery, UniqueUpdateArray, function (updateError, updateResult) {
    //         if (updateError) {
    //           return res.status(200).json({
    //             error: updateError,
    //             message: "Database SQL Error",
    //             status: false
    //           });
    //         } else {
    //           return res.status(200).json({
    //             error: null,
    //             message: "Your Password Successfully Updated.",
    //             status: true
    //           });
    //         }
    //       })
    //     }
    //   })
    // };
};

exports.delete_a_users = function (req, res) {
    Users.remove(req.params.usersId, function (err, users) {
        if (err)
            res.status(500).json({
                status: false,
                message: "Internal Server Error"
            });
        res.status(200).json({
            status: true,
            message: "User successfully deleted",
            data: users
        })
    })
}

exports.read_a_users = function (req, res) {
    try {
        Users.getUsersById(req.params.user_id, null, null, function (err, user) {
            console.log("user :", user);
            if (err) {
                res.status(500).json({
                    status: false,
                    message: "Internal Server Error"
                });
            } else {
                var logs = {
                    user_id: user[0].user_id,
                    tbl_name: "users",
                    query: 'SELECT * FROM users WHERE user_id="' + user[0].user_id + '"',
                    remarks: "Select a particular user with user_id = " + user[0].user_id,
                    created_at: new Date()
                };
                global.sql.query("INSERT INTO logs SET ?", logs);
                let selectedUser = user.map(function (user) {
                    return {
                        user_id: user.user_id,
                        username: user.username,
                        first_name: user.first_name,
                        middle_name: user.middle_name,
                        last_name: user.last_name,
                        email_id: user.email_id,
                        mobile_no: user.mobile_no,
                        cinema_id: user.cinema_id,
                        role_id: user.role_id,

                        reporting_to: user.reporting_to,
                        email_verified: user.email_verified,
                        mobile_verified: user.mobile_verified,
                        is_active: user.is_active,
                        current_login_date_time: user.current_login_date_time,
                        last_login_date_time: user.last_login_date_time,
                        created_by: user.created_by,
                        created_at: user.created_at,
                        updated_by: user.updated_by,
                        updated_at: user.updated_by
                    };
                });
                delete user[0].password;
                res.status(200).json({
                    status: true,
                    message: "Getting User",
                    // data: selectedUser[0],
                    data: user[0]
                });
            }
        });
    } catch (error) {
        res.status(404).json({
            status: false,
            message: "Page not found"
        });
    }
};

exports.userpasswordconfirm = function (req, res) {
    try {
        if (req.body.password && req.body.username) {
            Users.getUsersById(null, req.body.password, req.body.username, function (
                err,
                user
            ) {
                try {
                    if (user === null || user[0] === undefined || user === undefined) {
                        res.status(200).json({
                            status: false,
                            message: "Internal Server Error"
                        });
                    } else if (user[0].is_active === "Y") {
                        res.status(200).json({
                            status: true,
                            message: "User Successfully Logged In",
                            data: []
                        });
                    } else {
                        res.json({
                            status: false,
                            message: "User not Active"
                        });
                    }
                } catch (error) {
                    res.status(200).json({
                        status: false,
                        message: "Internal Server Error"
                    });
                }
            });
        } else {
            res.json({
                status: false,
                message: "Username Or Password Missing"
            });
        }
    } catch (error) {
        res.status(404).json({
            status: false,
            message: "Page not found"
        });
    }
};

exports.userLogin = function (req, res) {
    console.log('req.body :', req.body);
    let username = req.body.username
    let password = req.body.password

    if (username && username.length > 0 && password && password.length > 0) {

    }
}

exports.login = async function (req, res) {
    try {
        let checkUserHardwareSettingsFlag = await getGlobalOption('CHECK_HARDWARE_SETTINGS');
        if (req.body.password && req.body.username) {
            Users.getUsersById(null, req.body.password, req.body.username, function (
                err,
                user
            ) {
                try {
                    if (user === null || user[0] === undefined || user === undefined) {
                        res.status(200).json({
                            status: false,
                            message: err
                        });
                    } else if (user[0].is_active === "Y") {
                        const random = uuidv4();
                        //Add role ID to token here
                        let tokenObj = {
                            user_id: user[0].user_id,
                            role_id: user[0].role_id,
                            user_token: random,
                            idmulti_token: null,
                            is_active: "Y"
                        };
                        global.sql.query("INSERT INTO multi_token SET ?", tokenObj);
                        token = jwt_token.sign({ token: random }, req.app.config.jwtSecret || 'welcomeuser', {
                            expiresIn: "30d"
                        });
                        // req.session['user_id'] = user[0].user_id
                        // req.session['role_id'] = user[0].role_id
                        // req.session['cinema_id'] = user[0].cinema_id
                        req["user_info"] = user[0];
                        user[0].last_login_date_time = moment(user[0].current_login_date_time).format('YYYY-MM-DD HH:mm:ss');
                        user[0].current_login_date_time = moment().format('YYYY-MM-DD HH:mm:ss');
                        Users.updateById(user[0].user_id, user[0], user[0], function (
                            err,
                            data
                        ) {
                            if (err) {
                                res.status(200).json({
                                    status: false,
                                    message: "Internal Server Error" + " " + err
                                });
                            } else {
                                // global.sql.query(
                                //   `SELECT * FROM role_features rf
                                // LEFT JOIN ms_features f ON rf.feature_id = f.feature_id
                                // LEFT JOIN ms_modules m ON f.module_id = m.module_id
                                // WHERE rf.role_id=${user[0].role_id} AND rf.rf_is_active='Y' AND f.feature_is_list='Y' ORDER BY f.feature_name DESC`,
                                //   function (navigationError, navigationResult) {
                                //     console.log('navigationError, navigationResult :', navigationError, navigationResult);
                                //     if (navigationError) {
                                //       return res.status(200).json({
                                //         status: false,
                                //         message:
                                //           "Opps something went wrong, Please try after some time"
                                //       });
                                //     } else if (!navigationResult) {
                                //       res.status(200).json({
                                //         status: false,
                                //         message: "User roles is not assigned",
                                //         data: {
                                //           user: [],
                                //           token: token,
                                //           navigationResult: []
                                //         }
                                //       });
                                //     } else if (navigationResult && navigationResult.length === 0) {
                                //       res.status(200).json({
                                //         status: false,
                                //         message: "User roles is not assigned",
                                //         data: {
                                //           user: [],
                                //           token: token,
                                //           navigationResult: []
                                //         }
                                //       });
                                //     }
                                //     else if (navigationResult && navigationResult.length > 0) {
                                Users.getUsersById(user[0].user_id, null, null, function (
                                    err,
                                    data2
                                ) {
                                    if (data2 && data2.length > 0) {

                                        let ActiveModules = [];
                                        let ActiveModulesCategory = [];
                                        async.waterfall([
                                            function (callback) {
                                                var logs = {
                                                    user_id: data2[0].user_id,
                                                    tbl_name: "users",
                                                    query: "Login User",
                                                    remarks: "User " + data2[0].user_id + " Logged In",
                                                    created_at: new Date()
                                                };
                                                global.sql.query("INSERT INTO logs SET ?", logs);
                                                // let SQLSelectQuery = `SELECT * FROM user_permission where role_id=${data2[0].role_id} AND is_active='Y'`
                                                let SQLSelectQuery = `SELECT * FROM user_permission u 
                                            LEFT JOIN ms_modules m ON m.module_id = u.module_id
                                            LEFT JOIN ms_module_category mc ON mc.module_category_id = m.module_category_id
                                            where role_id=${data2[0].role_id} AND is_active='Y'`
                                                global.sql.query(SQLSelectQuery, function (error, result) {
                                                    if (error) {
                                                        callback(null, error)
                                                    } else if (result.length === 0) {
                                                        callback(null, ActiveModules)
                                                    } else if (result.length > 0) {
                                                        result.map((x) => {
                                                            ActiveModules.push(x.module_id)
                                                            ActiveModulesCategory.push(x.module_category_id)
                                                        })
                                                        callback(null, ActiveModules);
                                                    }
                                                });
                                            },
                                        ], function (err, result) {
                                            if ((data2[0].role_id == 4 || data2[0].role_id == 8) && checkUserHardwareSettingsFlag == 'Y') {
                                                checkUserHardwareSettings(data2[0], req.body.hardware_id)
                                                    .then((response) => {
                                                        if (response && response.status) {
                                                            res.status(200).json({
                                                                status: true,
                                                                message: "User Successfully Logged In",
                                                                data: {
                                                                    user: data2[0],
                                                                    token: token,
                                                                    activeModules: result,
                                                                    activeModulesCategory: ActiveModulesCategory,
                                                                    navigationResult: []
                                                                }
                                                            });
                                                        } else {
                                                            res.status(200).json({
                                                                status: false,
                                                                message: response.message,
                                                                err: response.err
                                                            });
                                                        }
                                                    })

                                            } else {
                                                res.status(200).json({
                                                    status: true,
                                                    message: "User Successfully Logged In",
                                                    data: {
                                                        user: data2[0],
                                                        token: token,
                                                        activeModules: result,
                                                        activeModulesCategory: ActiveModulesCategory,
                                                        navigationResult: []
                                                    }
                                                });
                                            }
                                            // result now equals 'done'
                                        });
                                    } else {
                                        res.json({
                                            status: false,
                                            message: "User Profile data not found."
                                        });
                                    }
                                    // console.log("err :", err);
                                    // console.log("data2 :", data2);
                                    // var logs = {
                                    //     user_id: data2[0].user_id,
                                    //     tbl_name: "users",
                                    //     query: "Login User",
                                    //     remarks: "User " + data2[0].user_id + " Logged In",
                                    //     created_at: new Date()
                                    // };
                                    // global.sql.query("INSERT INTO logs SET ?", logs);
                                    // res.status(200).json({
                                    //     status: true,
                                    //     message: "User Successfully Logged In",
                                    //     data: {
                                    //         user: data2[0],
                                    //         token: token,
                                    //         navigationResult: []
                                    //     }
                                    // });
                                });
                                //   }
                                // });
                            }
                        });
                    } else {
                        res.json({
                            status: false,
                            message: "User not Active"
                        });
                    }
                } catch (error) {
                    console.log("error :", error);
                    res.status(200).json({
                        status: false,
                        message: error
                    });
                }
            });
        } else {
            res.json({
                status: false,
                message: "Username Or Password Missing"
            });
        }
    } catch (error) {
        res.status(404).json({
            status: false,
            message: "Page not found"
        });
    }
};

const checkUserHardwareSettings = function (user_data, hardware_id) {
    return new Promise((resolve, reject) => {
        let getHardwareIdQuery = `SELECT * FROM float_amount_records far
        LEFT JOIN hardware_settings hs ON far.hardware_setting_id = hs.hs_id
        WHERE far.operator_user_id = ${user_data.user_id} AND far.shift_id=${user_data.shift_id};`;
        global.sql.query(getHardwareIdQuery, function (error, result) {
            if (error) {
                return resolve({ status: false, message: 'Database SQL Error', err: error })
            } else if (result.length == 0) {
                return resolve({ status: false, message: 'No hardware settings found for your machine', err: null })
            } else {
                if (hardware_id && String(hardware_id).length > 0) {
                    if (hardware_id === result[0].hs_hardware_unique_id) {
                        return resolve({ status: true, message: 'Hardware Id matched', err: null })
                    } else {
                        return resolve({ status: false, message: 'Sorry! Your hardware id does not match cofiguration', err: null })
                    }
                } else {
                    return resolve({ status: false, message: 'Please provide your hardware id to login', err: null })
                }
            }
        })
    });
}

exports.auth = function (req, res) {
    res.status(403).json({
        status: false,
        message: "authentication error"
    });
};
// exports.change_password = function (req, res) {
//   try {
//     if (req.body.user_id && req.body.new_password && req.body.old_password) {
//       Users.getUsersById(req.body.user_id, null, null, function (err, user) {
//         if (err) {
//           res.status(500).send({
//             status: false,
//             message: "Internal Server Error"
//           })
//         } else {
//           bcrypt.compare(req.body.old_password, user[0].password, function (err, result) {
//             if (result == true) {
//               try {
//                 let verifiedpass = validate_password(req.body.new_password).toString()
//                 if (verifiedpass === "-1") {
//                   res.json({
//                     status: false,
//                     message: "Password: Mandatory, Can accept alphanumeric characters, special characters, length 5-15 characters"
//                   })
//                 } else {
//                   var hash = bcrypt.hashSync(verifiedpass, 10)
//                   Users.updatePassword(req.body.user_id, hash, function (err, users) {
//                     if (err) {
//                       res.status(500).json({
//                         status: false,
//                         message: "Internal Server Error"
//                       })
//                     } else {
//                       var logs = {
//                         user_id: user[0].user_id,
//                         tbl_name: 'users',
//                         query: "UPDATE users SET  password = " + req.body.new_password + " WHERE user_id= " + user[0].id,
//                         remarks: 'Update password of user with user_id = ' + user[0].user_id,
//                         created_at: new Date()
//                       }
//                       global.sql.query('INSERT INTO logs SET ?', logs)
//                       res.status(200).json({
//                         status: true,
//                         message: "Password Updated",
//                         data: user[0]
//                       })
//                     }
//                   })
//                 }
//               } catch (error) {
//                 res.status(500).json({
//                   status: false,
//                   message: "Internal Server Error"
//                 })
//               }
//             } else {
//               res.json({
//                 status: false,
//                 message: "Old PAssword Didn't Matched"
//               })
//             }
//           })
//         }
//       })
//     } else {
//       res.json({
//         status: false,
//         message: "Missing Mandatory Fields (User_id, Old_password, New_password)"
//       })
//     }
//   } catch (error) {
//     res.status(404).json({
//       status: false,
//       message: "Page not found"
//     })
//   }
// }

exports.get_all_active_users = function (req, res) {
    try {
        Users.getAllActiveUsers(function (err, task) {
            if (err) {
                res.status(500).json({
                    status: false,
                    message: "Page not found"
                });
            } else {
                var logs = {
                    user_id: null,
                    tbl_name: "users",
                    query: "Select * from users WHERE is_active = 'Y'",
                    remarks: "Select all Active Users in DB ",
                    created_at: new Date()
                };
                global.sql.query("INSERT INTO logs SET ?", logs);
                console.log("task.length :", task.length);
                let selectedUser = task.map(function (user) {
                    return {
                        user_id: user.user_id,
                        username: user.username,
                        first_name: user.first_name,
                        middle_name: user.middle_name,
                        last_name: user.last_name,
                        email_id: user.email_id,
                        mobile_no: user.mobile_no,
                        cinema_id: user.cinema_id,
                        role_id: user.role_id,
                        reporting_to: user.reporting_to,
                        email_verified: user.email_verified,
                        mobile_verified: user.mobile_verified,
                        is_active: user.is_active,
                        current_login_date_time: user.current_login_date_time,
                        last_login_date_time: user.last_login_date_time,
                        created_by: user.created_by,
                        created_at: user.created_at,
                        updated_by: user.updated_by,
                        updated_at: user.updated_by
                    };
                });
                res.status(200).json({
                    status: true,
                    message: "Getting All Active Users",
                    data: selectedUser
                });
            }
        });
    } catch (error) {
        res.status(404).json({
            status: false,
            message: "Page not found"
        });
    }
};
var validation = function (new_users) {
    var error = [];
    if (new_users.username === -1) {
        error.push({
            message: "Mandatory, username only accept alphanumeric characters, and length 5-15 characters"
        });
    } else if (new_users.first_name === -1) {
        error.push({ message: "first_name: Mandatory, Can accept alphabets only" });
    } else if (new_users.middle_name === -1) {
        error.push({ message: "middle_name: can accept alphabets,- & space" });
    } else if (new_users.last_name === -1) {
        error.push({
            message: "last_name: Mandatory, Can accept alphabets ,- & space"
        });
    } else if (new_users.email_id === -1) {
        error.push({ message: "email_id: Mandatory, enter valid email address" });
    } else if (new_users.mobile_no === -1) {
        error.push({ message: "mobile_no: Mandatory, enter valid mobile number" });
    }
    //  else if (typeof new_users.cinema_id !== 'number') {
    //   error.push({ message: 'cinema_id: Mandatory, Can accept integer only' })
    // }
    // else if (typeof new_users.role_id !== "number") {
    //     error.push({ message: "role_id: Mandatory, Can accept integer only only" });
    // }
    // else if (typeof new_users.reporting_to !== "number") {
    //   error.push({ message: 'reporting_to: Can accept integer only' })
    // }
    else if (new_users.password === -1) {
        error.push({
            message: "Password: Mandatory, Can accept alphanumeric characters, special characters, length 5-15 characters"
        });
    } else if (!new_users) {
        error.push({ message: "User is Null" });
    }

    if (error.length > 0) {
        return error;
    } else return false;
};

function validate_password(par) {
    if (validator.matches(par, /^[0-9A-Za-z !@#$%]{5,15}$/, "i")) {
        return par;
    } else {
        return -1;
    }
}

// authentication middleware.
exports.is_authorized = function (req, res, next) {
    try {
        if (req.body.token) {
            jwt_token.verify(req.body.token, req.app.config.jwtSecret || 'welcomeuser', function (err, decoded) {
                if (decoded) {
                    var logs = {
                        user_id: decoded.user.user_id,
                        tbl_name: "users",
                        query: "Authenticate User " + decoded.user.user_id,
                        remarks: "User With UserID " +
                            decoded.user.user_id +
                            " is Successfully Authenticated",
                        created_at: new Date()
                    };
                    global.sql.query("INSERT INTO logs SET ?", logs);
                    res.status(200).json({
                        status: true,
                        message: "You Are Authenticated",
                        data: decoded
                    });
                } else {
                    res.status(401).json({
                        status: false,
                        message: "authentication error"
                    });
                    next();
                }
            });
        } else {
            res.json({
                status: false,
                message: "No Token Provided"
            });
        }
    } catch (error) {
        res.status(404).json({
            status: false,
            message: "Page not found"
        });
    }
};

exports.removeToken = function (req, res) {
    const token = jwtDecode(req.headers.authorization);
    global.sql.query(
        `SELECT * from multi_token WHERE user_token='${token["token"]}' and is_active = 'Y'`,
        function (error, result) {
            if (error) {
                return res
                    .status(200)
                    .json({ status: false, message: "No such token found", error });
            } else if (result && result.length > 0) {
                var numberToken = result[0].idmulti_token;
                var isActive = "N";
                global.sql.query(
                    `UPDATE multi_token SET is_active=? WHERE idmulti_token=?`, [isActive, numberToken],
                    function (err, result2) {
                        if (err) {
                            return res.status(200).json({
                                status: false,
                                message: "Something went wrong",
                                err: err
                            });
                        } else {
                            return res.status(200).json({
                                status: true,
                                message: "Token removed"
                            });
                        }
                    }
                );
            } else {
                return res.status(200).json({
                    status: false,
                    message: "No Such token Found"
                });
            }
        }
    );
};

module.exports.create_a_new_token = function (req, res) {
    let reqbody = req.body;
    if (reqbody.user_id && reqbody.role_id) {
        const random = uuidv4();
        let tokenObj = {
            user_id: reqbody.user_id,
            role_id: reqbody.role_id,
            user_token: random,
            is_active: 'Y'
        }
        global.sql.query(`INSERT INTO multi_token SET ?`, tokenObj, function (error, result) {
            if (error) {
                return res.status(200).json({
                    status: false,
                    message: "Database SQL Error"
                });
            } else {
                return res.status(200).json({
                    status: true,
                    message: "New Token Created",
                    token: random
                });
            }
        })
    } else {
        return res.status(200).json({
            status: false,
            message: "Required fields missing"
        });
    }
}

exports.userLoginCheck = function (req, res) {
    if (req.headers.authorization) {
        const token = jwtDecode(req.headers.authorization);

        if (token && token !== undefined && token["token"] && token["token"] !== undefined) {
            global.sql.query(`SELECT * from multi_token WHERE user_token='${token["token"]}' and is_active = 'Y'`, function (error, result) {
                if (error) {
                    return res.status(200).json({ errorCode: 409, status: false, isAuthorization: true, message: 'Your authrization token is invalid or expired', error })
                }
                else if (result.length == 0) {
                    return res.status(200).json({ errorCode: 409, status: false, isAuthorization: true, message: 'Your authrization token is invalid or expired', error: null })
                } else {
                    return res.status(200).json({ status: true, message: 'Your Authentication was successful', error: null })

                }
            })
        }
    } else {

    }
}

module.exports.EjsDesignViewer = (req, res) => {
    let path = '/templates/tickets/ticket-4.ejs'

    res.render(`${__base}${path}`)
}