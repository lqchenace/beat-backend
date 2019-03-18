module.exports = app => {
    const { STRING} = app.Sequelize;

    const Save = app.model.define('save',
    {
        sid: { type: STRING(6), primaryKey: true},
        uid: STRING(20),
        bid: STRING(20),
    },
    {
        freezeTableName: true, // Model 对应的表名将与model名相同
        timestamps: false,
    }
    )
    Save.associate = function() {
        app.model.Save.belongsTo(app.model.Beat, { foreignKey: 'bid' });
    }
    return Save;
}