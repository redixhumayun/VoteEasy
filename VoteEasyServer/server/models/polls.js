'use strict';
module.exports = function(sequelize, DataTypes) {
  var Polls = sequelize.define('Polls', {
    createdBy: {
      type: DataTypes.STRING, 
      allowNull: false
    }, 
    voter_ids: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Polls.belongsTo(models.Users, {
          foreignKey: 'userId', 
          onDelete: 'CASCADE'
        });
        Polls.hasMany(models.Options, {
          foreignKey: 'pollId'
        });
      }
    }
  });
  return Polls;
};