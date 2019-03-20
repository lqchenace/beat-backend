module.exports = app => {
    const { STRING} = app.Sequelize;

    const Arrianbeat= app.model.define('arrianbeat',
    {
        aid: { type: STRING(20), primaryKey: true},
        uid: STRING(20),
        bid: STRING(20),
        require: STRING(500)
    },
    {
        freezeTableName: true, // Model 对应的表名将与model名相同
        timestamps: false,
    }
    )
    Arrianbeat.associate = function() {
        app.model.Arrianbeat.belongsTo(app.model.User,{ foreignKey: 'uid'});
        app.model.Arrianbeat.belongsTo(app.model.Beat,{ foreignKey: 'bid'});
    }
    return Arrianbeat;
}