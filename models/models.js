
const { sequelize, DataTypes } = require('../server/helpers/database'); 
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  UserID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'userid'
},
Username: { 
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'username'
},
Email: { 
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
        isEmail: true
    },
    field: 'email'

},
Passwordhash: { 
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'passwordhash'
},
CreateDate: { 
    type: DataTypes.DATE, // TIMESTAMP in PostgreSQL maps to DATE in Sequelize
    allowNull: false,
    field: 'createdate'
}
}, {
  tableName: 'users',
  timestamps: false,
  hooks: {
      beforeCreate: async (user, options) => {
        if (user.Passwordhash) {
          user.Passwordhash = await bcrypt.hash(user.Passwordhash, 12);
        }
      }
  }
});

const Session = sequelize.define('Session', {
  sid: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  sess: {
    type: DataTypes.JSON,
    allowNull: false
  },
  expire: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'session', // Set the table name explicitly
  timestamps: false // Disable timestamps for this table
});
module.exports = {
  User,
  Session,
};

