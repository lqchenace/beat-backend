module.exports = app => {
    const { STRING} = app.Sequelize;

    const Beatcomment = app.model.define('Beatcomment',
        {
            bcid: { type: STRING(20), primaryKey: true},
            uid: STRING(20),
            uid2: STRING(20),
            bid: STRING(20),
            parentid: STRING(20),
            comment: STRING(500),
            comtime:STRING(20)
        },
        {
            freezeTableName: true, // Model 对应的表名将与model名相同
            timestamps: false,
        }
    );
    Beatcomment.associate = function() {
        app.model.Beatcomment.belongsTo(app.model.User,{ foreignKey: 'uid'});
    }
    return Beatcomment;

};