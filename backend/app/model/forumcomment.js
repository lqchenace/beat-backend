module.exports = app => {
    const { STRING} = app.Sequelize;

    const Forumcomment = app.model.define('forumcomment',
        {
            fcid: { type: STRING(20), primaryKey: true},
            uid: STRING(20),
            uid2: STRING(20),
            foid: STRING(20),
            parentid: STRING(20),
            comment: STRING(500),
            comtime:STRING(20)
        },
        {
            freezeTableName: true, // Model 对应的表名将与model名相同
            timestamps: false,
        }
    );
    Forumcomment.associate = function() {
        app.model.Forumcomment.belongsTo(app.model.User,{ foreignKey: 'uid'});
        app.model.Forumcomment.belongsTo(app.model.Forum,{ foreignKey: 'foid'});
    }
    return Forumcomment;

};