module.exports = app => {
    const { STRING} = app.Sequelize;

    const Admin = app.model.define('admin',
    {
        adminid: { type: STRING(12), primaryKey: true},
        password: STRING(8),
    },
    {
        freezeTableName: true, // Model 对应的表名将与model名相同
        timestamps: false,
    }
    )
    return Admin;
}