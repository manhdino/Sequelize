const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
const sequelize = new Sequelize("demosequelize", "root", "10062001", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  timezone: "+07:00",
});

//test connection
// authenticate() return promise(task is completed some time in the future)
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((error) => {
//     console.error("Unable to connect to the database:", error);
//   });

// console.log("Another Task");

//create table(model)
const User = sequelize.define(
  "users", //first argument
  {
    // Attributes(camelCase) of the table(Column): second argument
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true, //set primary key
      autoIncrement: true, //autoincrement started 1
    },
    username: {
      type: DataTypes.STRING, //varchar
      allowNull: false, // not null
      unique: true, // unique value in column
    },
    email: {
      type: DataTypes.STRING, //varchar
      allowNull: false, // not null
      unique: true, // unique value in column
    },
    password: {
      type: DataTypes.STRING, //varchar
      allowNull: false, // not null
    },
    profilePicture: {
      type: DataTypes.STRING, //varchar
      defaultValue:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },

    isAdmin: {
      type: DataTypes.BOOLEAN, //TINYINT(1)
      defaultValue: false,
    },
  },
  //third argument
  {
    freezeTableName: true, //force table name used by defined, Normally table name will be used plural(users)
    timestamps: true, // not created createdAt and updatedAt when creating table
  }
);

//sync the table in database with table defined in JavaScript code
//sync() return a promise - writting SQL queries - only created table if it doesn't exist
// User.sync()
//   .then((data) => {
//     console.log("Table and model synced successfully");
//   })
//   .catch((error) => {
//     console.log("Error syncing the table and model");
//   });

// if you want to changing the table is already exited in the database
// force: true --> it will drop the table that already exists and create a new one
// or alter: true --> it won't drop the table just alterd the table (ALTER TABLE)

// User.sync({ alter: true })
//   .then((data) => {
//     console.log("Table and model synced successfully");
//   })
//   .catch((error) => {
//     console.log("Error syncing the table and model");
//   });

//when you have a lot of tables(models) and you don't want to write code to sync each table
//Well, you can just use the instance of Sequelize(object )
//sequelize.sync({ force: true });
//drop table
//User.drop();
//drop all tables
//sequelize.drop();

//drop multiple tables with name regex pattern
//sequelize.drop({match:/_test$/});// drop all tables with name end _test example: pizza_test, soccer_test

// console.log(sequelize.models.users);

//Insert data into table
User.sync({ alter: true })
  .then(() => {
    //Working with our updated table
    const user = User.build({
      username: "Dinomanh",
      email: "manhnguyen1238@gmail.com",
      password: "12345678",
    });
    return user.save();
  })
  .then((data) => {
    console.log("Inserted data into table users");
  })
  .catch(() => {
    console.log("Error");
  });
