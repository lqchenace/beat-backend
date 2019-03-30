// 'use strict';

module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;

    const User = app.model.define('User',
        {
            uid: { type: STRING(20), primaryKey: true},
            nickname: STRING(50),
            sex: INTEGER,
            age:INTEGER,
            role:STRING(6),
            headimg:STRING(200),
            phone:STRING(11),
            address:STRING(70),
            weixincode:STRING(30),
            bolgcode:STRING(30),
            money:INTEGER,
            openid:STRING(50),
            name:STRING(20),
            idcode:STRING(20),
            idimgurl:STRING(200),
            verify:STRING(8),
            black: INTEGER,
        },
        {
            freezeTableName: true, // Model 对应的表名将与model名相同
            timestamps: false,
        }
    );
    User.associate = function() {
        app.model.User.hasOne(app.model.Beat, { foreignKey: 'uid' });
        app.model.User.hasOne(app.model.Product, { foreignKey: 'uid' });
        app.model.User.hasOne(app.model.Beatcomment, { foreignKey: 'uid' });
        app.model.User.hasOne(app.model.Forumcomment, { foreignKey: 'uid' });
        app.model.User.hasMany(app.model.Follow, { foreignKey: 'uid' });
        app.model.User.hasMany(app.model.Fans, { foreignKey: 'uid' });
        app.model.User.hasOne(app.model.Arrianbeat, { foreignKey: 'uid'});
        app.model.User.hasOne(app.model.Forum, { foreignKey: 'uid' });
        app.model.User.hasOne(app.model.Certification, { foreignKey: 'uid' });
        app.model.User.hasOne(app.model.Complain, { foreignKey: 'uid2',targetKey: 'uid' });
        app.model.User.hasOne(app.model.Blacklist, { foreignKey: 'uid'});
    }
    return User;
};