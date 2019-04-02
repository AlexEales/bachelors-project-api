/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Trusts', {
        Id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        Code: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Name: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'Trusts'
    });
};
