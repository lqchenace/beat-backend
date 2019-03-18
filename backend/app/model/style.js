module.exports = app => {
    const { STRING} = app.Sequelize;

    const Style = app.model.define('style',
    {
        stid: { type: STRING(20), primaryKey: true},
        style: STRING(20),
    },
    {
        freezeTableName: true, // Model 对应的表名将与model名相同
        timestamps: false,
    }
    )
    return Style;
}