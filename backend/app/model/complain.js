module.exports = app => {
    const { STRING} = app.Sequelize;

    const Complain= app.model.define('complain',
    {
        coid: { type: STRING(20), primaryKey: true},
        uid: STRING(20),
        bid: STRING(20),
        cotype:STRING(10),
        cocommand:STRING(600),
        coimg:STRING(200),
        complaintime:STRING(20),
        adminid:STRING(20),
        status:STRING(20),
        worktime:STRING(20),
        uid2:STRING(20),
    },
    {
        freezeTableName: true, // Model 对应的表名将与model名相同
        timestamps: false,
    }
    )
    Complain.associate = function() {
        app.model.Complain.belongsTo(app.model.User,{ foreignKey: 'uid2',targetKey: 'uid'});
    }
    return Complain;
}