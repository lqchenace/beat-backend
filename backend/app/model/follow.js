module.exports = app => {
    const { STRING} = app.Sequelize;

    const Follow = app.model.define('follow',
    {
        followid: { type: STRING(20), primaryKey: true},
        uid: STRING(20),
        personid: STRING(20),
    },
    {
        freezeTableName: true, // Model 对应的表名将与model名相同
        timestamps: false,
    }
    )
    Follow.associate = function() {
        app.model.Follow.belongsTo(app.model.User,{ foreignKey: 'personid'});
    }
    return Follow;
}