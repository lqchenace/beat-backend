module.exports = app => {
    const { STRING} = app.Sequelize;

    const Fans= app.model.define('fans',
    {
        fid: { type: STRING(20), primaryKey: true},
        uid: STRING(20),
        fansid: STRING(20),
    },
    {
        freezeTableName: true, // Model 对应的表名将与model名相同
        timestamps: false,
    }
    )
    Fans.associate = function() {
        app.model.Fans.belongsTo(app.model.User,{ foreignKey: 'fansid'});
    }
    return Fans;
}