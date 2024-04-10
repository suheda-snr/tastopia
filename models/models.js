
const { sequelize, DataTypes } = require('../server/helpers/database'); 
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  UserID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
},
Username: { 
    type: DataTypes.STRING(255),
    allowNull: false
},
Email: { 
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
        isEmail: true
    }
},
Passwordhash: { 
    type: DataTypes.STRING(255),
    allowNull: false
},
CreateDate: { 
    type: DataTypes.DATE, // TIMESTAMP in PostgreSQL maps to DATE in Sequelize
    allowNull: false
}
}, {
  tableName: 'Users',
  timestamps: false,
  hooks: {
      beforeCreate: async (user, options) => {
        if (user.password) {
          const hashedPassword = await bcrypt.hash(user.password, 12);
          user.Passwordhash = hashedPassword;
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

