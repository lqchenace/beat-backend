module.exports = app => {
    const { STRING, INTEGER} = app.Sequelize;

    const Forum = app.model.define('forum',
        {
            foid: { type: STRING(20), primaryKey: true},
            uid: STRING(20),
            command: STRING(500),
            imgurl:STRING(100),
            title:STRING(50),
            reploynum:INTEGER,
            style:STRING(20),
            clicknum:INTEGER,
            comtime:STRING(20)
        },
        {
            freezeTableName: true, // Model 对应的表名将与model名相同
            timestamps: false,
        }
    );
    Forum.associate = function() {
        app.model.Forum.belongsTo(app.model.User,{ foreignKey: 'uid'});

    }

    return Forum;

};