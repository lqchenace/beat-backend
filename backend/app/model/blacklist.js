module.exports = app => {
    const { STRING} = app.Sequelize;

    const Blacklist = app.model.define('blacklist',
    {
        blid: { type: STRING(20), primaryKey: true},
        uid: STRING(20),
        adminid: STRING(20),
        time: STRING(20),
    },
    {
        freezeTableName: true, // Model 对应的表名将与model名相同
        timestamps: false,
    }
    )
    Blacklist.associate = function() {
        
        app.model.Blacklist.belongsTo(app.model.User,{ foreignKey: 'uid'});
    }
    return Blacklist ;
}