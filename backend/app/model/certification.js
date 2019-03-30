module.exports = app => {
    const { STRING} = app.Sequelize;

    const Certification= app.model.define('certification',
    {
        cerid: { type: STRING(20), primaryKey: true},
        uid: STRING(20),
        idcode: STRING(20),
        name:STRING(20),
        imgurl:STRING(200),
        role:STRING(8),
        status:STRING(8),
        adminid:STRING(20),
        worktime:STRING(20),
    },
    {
        freezeTableName: true, // Model 对应的表名将与model名相同
        timestamps: false,
    }
    )
    Certification.associate = function() {
        app.model.Certification.belongsTo(app.model.User,{ foreignKey: 'uid'});
    }
    return Certification;
}