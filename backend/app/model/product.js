module.exports = app => {
    const { STRING} = app.Sequelize;

    const Product = app.model.define('product',
    {
        pid: { type: STRING(20), primaryKey: true},
        uid: STRING(20),
        pname: STRING(50),
        pdetail: STRING(200),
        imgurl: STRING(250),
        style: STRING(25),
        place: STRING(25),
        device:STRING(20),
    },
    {
        freezeTableName: true, // Model 对应的表名将与model名相同
        timestamps: false,
    }
    )
    Product.associate = function() {
        app.model.Product.belongsTo(app.model.User,{ foreignKey: 'uid'});
        app.model.Product.hasMany(app.model.Beatcomment,{ foreignKey: 'bid',targetKey: 'pid'});
    }
    return Product;
}