'use strict';
module.exports = function(sequelize, DataTypes) {
  var Options = sequelize.define('Options', {
    name: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    votes: {
      type: DataTypes.INTEGER, 
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Options.belongsTo(models.Polls, {
          foreignKey: 'PollId', 
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Options;
};