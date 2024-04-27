const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const users = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.TEXT,
      
      },
      lastName: {
        type: DataTypes.TEXT,
      
      },
      phoneNumber: {
        type: DataTypes.TEXT,
      
      },
      email: {
        type: DataTypes.TEXT,
      
      },
      role: {
        type: DataTypes.ENUM,
      
        values: [
          "admin",
          "user"
        ],

      },
      disabled: {
        type: DataTypes.BOOLEAN,
      
        allowNull: false,
        defaultValue: false,
      
      },
      password: {
        type: DataTypes.TEXT,
      
      },
      emailVerified: {
        type: DataTypes.BOOLEAN,
      
        allowNull: false,
        defaultValue: true,
      
      },
      emailVerificationToken: {
        type: DataTypes.TEXT,
      
      },
      emailVerificationTokenExpiresAt: {
        type: DataTypes.DATE,
      
      },
      passwordResetToken: {
        type: DataTypes.TEXT,
      
      },


      passwordResetTokenExpiresAt: {
        type: DataTypes.DATE,      
      },
      
      provider: {
        type: DataTypes.TEXT,
      
      },

      bname: {
        type: DataTypes.TEXT,
      
      },
      baddress: {
        type: DataTypes.TEXT,
      
      },
      gst: {
        type: DataTypes.TEXT,
      
      },
      cin: {
        type: DataTypes.TEXT, 
      },
      balance: {
        type: DataTypes.TEXT,
      
      },

      duedate: {
        type: DataTypes.DATE,
      },
      aadhar: {
        type: DataTypes.TEXT,
      
      },
      aadhar_url: {
        type: DataTypes.TEXT,
      
      },
      aadhar_back_url: {
        type: DataTypes.TEXT,
      
      },
      pan: {
        type: DataTypes.TEXT,
      
      },
      pan_url: {
        type: DataTypes.TEXT,
      
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    },
  );

  users.associate = (db) => {

    // db.users.hasMany(db.transactions, {
    //   as: 'balance', 
    //   constraints: false,
    //   foreignKey: 'userId' ,
    //   scope: {
    //     belongsTo: db.users.getTableName(),
    //     belongsToColumn: 'amount',
    //   }
    // });

    db.users.belongsToMany(db.products, {
      as: 'wishlist',
      constraints: false,
      through: 'usersWishlistProducts',
    });

    db.users.hasMany(db.file, {
      as: 'avatar',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.users.getTableName(),
        belongsToColumn: 'avatar',
      },
    });



    db.users.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.users.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };


  users.beforeCreate(async (user, options) => {
    user = trimStringFields(user);

    if (user.provider !== providers.LOCAL && Object.values(providers).indexOf(user.provider) > -1) {
      user.emailVerified = true;

      if (!user.password) {
        const password = crypto.randomBytes(20).toString('hex');

        try {
          const hashedPassword = await bcrypt.hash(password, config.bcrypt.saltRounds);
          user.password = hashedPassword;
        } catch (error) {
          console.error("Error hashing password:", error);
          throw new Error("Error hashing password");
        }
      }
    }
  });

  users.beforeUpdate((user, options) => {
    user = trimStringFields(user);
  });

  

  return users;
};


function trimStringFields(user) {
  user.email = user.email.trim();

  user.firstName = user.firstName
    ? user.firstName.trim()
    : null;

  user.lastName = user.lastName
    ? user.lastName.trim()
    : null;

  return user;
}
