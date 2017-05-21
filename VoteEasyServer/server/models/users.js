'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    name: DataTypes.STRING,
    uuid: {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      primaryKey: true
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