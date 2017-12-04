module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
	   email : { type : DataTypes.STRING(), allowNull: false,  primaryKey: true }
	  , name : { type : DataTypes.STRING(), allowNull: false }
	  , password : { type : DataTypes.STRING(), allowNull: false }
	  , ph : { type : DataTypes.INTEGER(20), allowNull: false }
  }, {
	  timestamps: false,
	  tableName: 'user_2'
  });
  return user;
};
	
