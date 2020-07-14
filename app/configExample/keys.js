let prodDatabase = {
  

  host: "localhost",
  user: "root",
  password: "redhat",
 
  database: "cinematic",
  port: 3306,
  multipleStatements: true,
};

let environment = "production"; // 'production'; // development

module.exports = {
  database: environment == "production" ? prodDatabase : devDatabase,
  environment,
  appVersion: environment == "production" ? appVersion : appVersion,
  // Every hours run cron to update the previous shows
  serverPort: "3800",
};
