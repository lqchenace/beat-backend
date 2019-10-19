const menuConfig = [{
        title: '用户管理',
        key:"1",
        url: '/myhome/usermanage',
        icon: 'user'
    },
    {
        title: '投诉管理',
        key:"2",
        icon: 'mail',
        children: [{
                key:"2/1",
                title: '待办列表',
                icon: 'carry-out',
                url: '/user/todoList',
            },
            {
                key:"2/2",
                title: '用户列表',
                icon: 'twitter',
                url: '/myhome/complain',
            },
        ]
    },
    {
        title: '身份认证管理',
        key:"3",
        icon: 'schedule',
        children: [{
            key:"3/1",
            title: '身份认证列表',
            url: '/myhome/idmanagement',
        }]
    }
];

export default menuConfig;