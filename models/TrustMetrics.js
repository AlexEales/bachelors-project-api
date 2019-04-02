/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('TrustMetrics', {
        Id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        DisplayName: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'TrustMetrics'
    });
};
