module.exports = app => {
    const { STRING} = app.Sequelize;

    const Full = app.model.define('full',
    {
        lid: { type: STRING(20), primaryKey: true},
        uid: STRING(20),
        bid: STRING(20),
    },
    {
        freezeTableName: true, // Model 对应的表名将与model名相同
        timestamps: false,
    }
    )
    return Full;
}