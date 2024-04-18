
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

const Recipe = sequelize.define('Recipe', {
  recipeid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'recipeid'
  },
  userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'userid'
  },
  title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'title'
  },
  preptime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'preptime'
  },
  description: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'description'
  },
  ingredients: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'ingredients'
  },
  instructions: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'instructions'
  },
  postdate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'postdate'
  },
  category: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'category'
  },
  picture: {
      type: DataTypes.TEXT,
      field: 'picture'
  }
}, {
  tableName: 'recipes',
  timestamps: false
})

const Comment = sequelize.define('Comment', {
  commentid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'commentid'
  },
  recipeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'recipes',
          key: 'recipeid'
      },
      field: 'recipeid'
  },
  userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'users',
          key: 'userid'
      },
      field: 'userid'
  },
  commenttext: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'commenttext'
  },
  postdate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'createdate'
  }
}, {
  tableName: 'comments',
  timestamps: false
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

User.hasMany(Recipe, { foreignKey: 'userid', as: 'recipes' });
Recipe.belongsTo(User, { foreignKey: 'userid', as: 'author' });
Recipe.hasMany(Comment, { foreignKey: 'recipeid', as: 'comments' });
User.hasMany(Comment, { foreignKey: 'userid', as: 'userComments' });
Comment.belongsTo(Recipe, { foreignKey: 'recipeid', as: 'recipe' });
Comment.belongsTo(User, { foreignKey: 'userid', as: 'user' });

module.exports = {
  User,
  Recipe,
  Comment,
  Session,
};

