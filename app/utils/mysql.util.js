// var mysql = require('mysql')
// // import { Sequelize } from 'sequelize';

// // var con = mysql.createConnection({
// //     host: "localhost",
// //     user: "root",
// //     password: "",
// //     database: "mybookstore"
// // });

// // con.connect(function(err){
// //     if(err) throw err
// // });

// const { Sequelize } = require('sequelize');


// const sequelize = new Sequelize('mybookstore', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql',
//   logging: false,
// });

// let con = async() => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
// }

// // var sequelize = new Sequelize('mybookstore','root', '', {
// //     host: 'localhost',
// //     dialect: 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',

// //     pool: {
// //         max: 5,
// //         min: 0,
// //         idle: 10000
// //     },

// //    storage: 'path/to/database.sqlite' // Chỉ dùng khi MS là SQLite
// // });

// module.exports = con;

module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "mybookstore",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };