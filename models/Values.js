/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Values', {
        Id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        Name: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'Values'
    });
};
