'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    name: {
      type: DataTypes.STRING, 
      allowNull: false, 
      get() {
        return this.getDataValue('name');
      }
    },
    uuid: {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      primaryKey: true, 
      get() {
        return this.getDataValue('uuid');
      }
    }, 
    poll_ids: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Users.hasMany(models.Polls, {
          foreignKey: 'userId'
        });
      }
    }
  });
  return Users;
};