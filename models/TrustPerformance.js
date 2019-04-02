/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('TrustPerformance', {
        TrustId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Trusts',
                key: 'Id'
            }
        },
        MetricId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'TrustMetrics',
                key: 'Id'
            }
        },
        Value: {
            type: "DOUBLE",
            allowNull: false
        },
        Comment: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'TrustPerformance'
    });
};
