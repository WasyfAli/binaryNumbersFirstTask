let prodDatabase = {
  // host: 'ticketak.chaky770vxt6.ap-southeast-1.rds.amazonaws.com',
  // user: 'ticketak',
  // password: 'Ng8mugRxKn8KMtC2',

  host: "localhost",
  user: "root",
  password: "redhat",
  // database: 'copy_cinematic_160919',
  // database: 'testcinematic',
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
