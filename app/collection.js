var _ = require('lodash');


var checktableExists = function (connection, table) {
    return new Promise(function (resolve, reject) {
        connection.query(`SHOW TABLES LIKE '${table}';`, function (error, results, fieldname) {
            if (error) {
                reject({ status: false, message: "Something went wrong. Try later.", error })
            } else if (results.length > 0) {
                resolve({ status: true, results });
            } else {
                reject({ status: false, message: "Provided table is not found in database." })
            }
        });
    });
}

var matchColumns = function (connection, table, body) {
    let columns = [];
    let skipKyes = ['created_at', 'created_by', 'updated_at', 'updated_by'];
    console.log('table :', table);
    return new Promise(function (resolve, reject) {
        insertTables[table].map(function (value) {
            if (skipKyes.indexOf(value.fieldname) < 0) columns.push(value.fieldname);
        });
        let status = _.isEqual(body.sort(), columns.sort())
        console.log('body, columns :', body, columns);
        resolve({ status, message: !status ? "Provided request body parameters are missing." : "" });
    });
}

var getPrimaryKey = function (connection, tableName) {
    return new Promise(function (resolve, reject) {
        connection.query(`SHOW KEYS FROM ${tableName} WHERE Key_name = 'PRIMARY';`, function (error, results, fieldname) {
            if (error) {
                reject({ status: false, message: "Cannot find primary key." });
            } else {
                resolve({ status: true, message: "", ColumnName: results[0].Column_name });
            }
        });
    })
}

var getCurrentDate = function () {
    let date = new Date();
    let _getFullYear = date.getFullYear().toString();

    let _getMonth = (date.getMonth() + 1).toString();
    _getMonth = _getMonth.length == 2 ? _getMonth : "0" + _getMonth;

    let _getDate = date.getDate().toString();
    _getDate = _getDate.length == 2 ? _getDate : "0" + _getDate;

    let _getHours = date.getHours().toString();
    _getHours = _getHours.length == 2 ? _getHours : "0" + _getHours;

    let _getMinutes = (parseInt(date.getMinutes() / 5) * 5).toString();
    _getMinutes = _getMinutes.length == 2 ? _getMinutes : "0" + _getMinutes;

    return _getFullYear + "-" + _getMonth + "-" + _getDate + " " + _getHours + ":" + _getMinutes + ":00";
}

var getSqlQuery = function (connection, table, body, dateArray) {
    return new Promise(function (resolve, reject) {

        getPrimaryKey(connection, table)
            .then(async (result) => {
                let columnsString = '';
                let dataString = '';

                // Object.keys(body)
                let array = [...new Set([...Object.keys(body), ...dateArray])];
                let length = array.length // Object.keys(body).length;

                const promises = array.map(function (element, index) {
                    if (element != result.ColumnName && dateArray.indexOf(element) < 0) {
                        columnsString = index !== (length - 1) ? columnsString + element + ',' : columnsString + element;
                        if (typeof body[element] === 'string') {
                            dataString = index !== (length - 1) ? dataString + "'" + body[element] + "'" + ',' : dataString + "'" + body[element] + "'";
                        } else if (typeof body[element] === 'number') {
                            dataString = index !== (length - 1) ? dataString + body[element] + ',' : dataString + body[element];
                        } else if (typeof body[element] === 'boolean') {
                            if (body[element]) {
                                dataString = index !== (length - 1) ? dataString + "'Y'," : dataString + "'Y'";
                            } else {
                                dataString = index !== (length - 1) ? dataString + "'N'," : dataString + "'Y'";
                            }
                        } else {
                            dataString = index !== (length - 1) ? dataString + body[element] + ',' : dataString + body[element];
                        }
                    } else if (dateArray.indexOf(element) > -1) {
                        columnsString = index !== (length - 1) ? columnsString + element + ',' : columnsString + element;
                        // if (element === 'created_by') {
                        //     dataString = index !== (length - 1) ? dataString + '1,' : dataString + '1';
                        // } else if (element === 'updated_by') {
                        //     dataString = index !== (length - 1) ? dataString + '1,' : dataString + '1';
                        // } 
                        if (element === 'created_by') {
                            // dataString = index !== (length - 1) ? dataString + `${element}=1,` : dataString + `${element}=1`;
                            dataString = index !== (length - 1) ? dataString + `${body[element]},` : dataString + `${body[element]}`;
                        } else if (element === 'updated_by') {
                            // dataString = index !== (length - 1) ? dataString + `${element}=1,` : dataString + `${element}=1`;
                            dataString = index !== (length - 1) ? dataString + `${body[element]},` : dataString + `${body[element]}`;
                        } else {
                            dataString = index !== (length - 1) ? dataString + "'" + getCurrentDate() + "'," : dataString + "'" + getCurrentDate() + "'"
                        }
                    }
                });
                // wait until all promises are resolved
                await Promise.all(promises);
                resolve({ status: true, message: "", columnsString, dataString });
            }).catch((error) => {
                reject({ status: false, message: error.message });
            });
    });
}
var getSelectQuery = function (connection) {

}

var getUpdateSqlQuery = function (connection, table, body, dateArray) {
    return new Promise(function (resolve, reject) {

        getPrimaryKey(connection, table)
            .then(async (result) => {
                let columnsString = '';
                let dataString = '';

                // Object.keys(body)
                let array = [...new Set([...Object.keys(body), ...dateArray])];
                let length = array.length // Object.keys(body).length;

                const promises = array.map(function (element, index) {
                    if (element != result.ColumnName && dateArray.indexOf(element) < 0) {
                        columnsString = index !== (length - 1) ? columnsString + element + ',' : columnsString + element;
                        if (typeof body[element] === 'string') {
                            dataString = index !== (length - 1) ? dataString + `${element}='${body[element]}',` : dataString + `${element}='${body[element]}'`;

                        } else if (typeof body[element] === 'number') {
                            dataString = index !== (length - 1) ? dataString + `${element}=${body[element]},` : dataString + `${element}=${body[element]}`;

                        } else if (typeof body[element] === 'boolean') {
                            if (body[element]) {
                                dataString = index !== (length - 1) ? dataString + `${element}='Y',` : dataString + `${element}='Y'`;

                            } else {
                                dataString = index !== (length - 1) ? dataString + `${element}='N',` : dataString + `${element}='N'`;
                            }
                        }
                        else {
                            // dataString = index !== (length - 1) ? dataString + body[element] + ',' : dataString + body[element];
                            dataString = index !== (length - 1) ? dataString + `${element}=${body[element]},` : dataString + `${element}=${body[element]}`;
                        }
                    } else if (dateArray.indexOf(element) > -1) {
                        columnsString = index !== (length - 1) ? columnsString + element + ',' : columnsString + element;
                        if (element === 'created_by') {
                            // dataString = index !== (length - 1) ? dataString + `${element}=1,` : dataString + `${element}=1`;
                            dataString = index !== (length - 1) ? dataString + `${element}=${body[element]},` : dataString + `${element}=${body[element]}`;
                        } else if (element === 'updated_by') {
                            // dataString = index !== (length - 1) ? dataString + `${element}=1,` : dataString + `${element}=1`;
                            dataString = index !== (length - 1) ? dataString + `${element}=${body[element]},` : dataString + `${element}=${body[element]}`;
                        } else {
                            dataString = index !== (length - 1) ? dataString + `${element}='${getCurrentDate()}',` : dataString + `${element}='${getCurrentDate()}'`;
                        }
                    }
                });
                // wait until all promises are resolved
                await Promise.all(promises);
                resolve({ status: true, message: "", columnsString, dataString });
            }).catch((error) => {
                reject({ status: false, message: error.message });
            });
    });
}


// module.exports = { checktableExists, matchColumns, getSqlQuery }
export default { getPrimaryKey, checktableExists, matchColumns, getSqlQuery, getUpdateSqlQuery, getCurrentDate }