// 'use strict';

module.exports = app => {
    const { STRING} = app.Sequelize;

    const Beat = app.model.define('Beat',
        {
            bid: { type: STRING(20), primaryKey: true},
            uid: STRING(20),
            command: STRING(500),
            area:STRING(50),
            imgurl:STRING(200),
            tooktime:STRING(20),
            tookplace:STRING(50),
            style:STRING(20),
            beatrole:STRING(10),
            costtype:STRING(12),
        },
        {
            freezeTableName: true, // Model 对应的表名将与model名相同
            timestamps: false,
        }
    );
    Beat.associate = function() {
        app.model.Beat.belongsTo(app.model.User,{ foreignKey: 'uid'});
        app.model.Beat.hasOne(app.model.Save,{ foreignKey: 'bid'});
    }
    return Beat;

};