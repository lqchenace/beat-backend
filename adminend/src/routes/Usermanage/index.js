import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Table,Divider,Popconfirm,Tabs, Icon,Input} from 'antd';
import moment from 'moment';

//dataSource 一个数组中包含好多对象，每个对象就是一组数据
// colums 代表列
// title 每列的标题
// dataIndex 是用来关联对应的数据，如果删除或者注释这项的话，这列就会为空
// key是一个唯一的标识

const TabPane = Tabs.TabPane;
const Search = Input.Search;
class Index extends React.Component {
    state = {
        dataSource:[],
        dataSource2:[],
        columns:[{
            title: '用户编号',
            dataIndex: 'uid',
            key: 'uid',
        },{
            title: '昵称',
            dataIndex: 'nickname',
            key: 'nickname',
            render: text => <a href="javascript:;">{text}</a>,
        },{
            title: '身份',
            dataIndex: 'role',
            key: 'role'
        },{
            title: '性别',
            dataIndex: 'sex',
            key: 'sex'
        },{
            title: '年龄',
            dataIndex: 'age',
            key: 'age'
        },{
            title: '所属地区',
            dataIndex: 'address',
            key: 'address'
        },{
            title: '手机号码',
            dataIndex: 'phone',
            key: 'phone'
        }, {
            title: '微信号',
            dataIndex: 'weixincode',
            key: 'weixincode'
        },{
            title: '微博号',
            dataIndex: 'bolgcode',
            key: 'bolgcode'
        },{
            title: '约豆数量',
            dataIndex: 'money',
            key: 'money'
        },{
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Popconfirm title='确认拉黑该用户？' okText='确认' cancelText='取消' 
                                onConfirm={() => {
                                    let that=this;
                                    var api = 'http://127.0.0.1:7001';
                                    axios.get(api+'/createblackUser',{
                                        params: {
                                        uid: record.uid,
                                        adminid:localStorage.getItem("username"),
                                        time:moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
                                        }
                                    })
                                    .then(function (response) {
                                        console.log("ssss",response.data.data);
                                        if(response.data.data==1){
                                            axios.get(api+'/queryUser?black=0')
                                            .then(function (response) {
                                                console.log("user",response);
                                                let arr= response.data.data.map((item,index)=>{
                                                item.key=index+1;
                                                item.sex=item.key==1?'男':'女';
                                                item.address=item.address.split("#").join("-");
                                                item.phone=item.phone==null?'暂无':item.phone;
                                                item.weixincode=item.weixincode==null?'暂无':item.weixincode;
                                                item.bolgcode=item.bolgcode==null?'暂无':item.bolgcode;
                                                return item;
                                                });
                                                that.setState({dataSource:arr});
                                            })

                                            axios.get(api+'/queryBlacklistUser')
                                            .then(function (response) {
                                                // console.log("list",response);
                                                let arr= response.data.data.map((item,index)=>{
                                                    item.key=index+1;
                                                    item.sex=item.User.sex==1?'男':'女';
                                                    item.nickname=item.User.nickname;
                                                    item.role=item.User.role;
                                                    item.age=item.User.age;
                                                    return item;
                                                    });
                                                that.setState({dataSource2:arr});
                                            })
                                        }
                                    })
                                }}
                            >
                            <a href="javascript:;">拉黑</a>
                            </Popconfirm >
                    <Divider type="vertical" />
                    <Popconfirm title='确认删除该用户？' okText='确认' cancelText='取消' 
                                onConfirm={() => {
                                    console.log(record.uid);
                                    let that=this;
                                    var api = 'http://127.0.0.1:7001';
                                    axios.get(api+'/deleteUser?uid='+record.uid)
                                    .then(function (response) {
                                    if(response.data.data==1){
                                        axios.get(api+'/queryUser?black=0')
                                        .then(function (response) {
                                            console.log("user",response);
                                            let arr= response.data.data.map((item,index)=>{
                                            item.key=index+1;
                                            item.sex=item.key==1?'男':'女';
                                            item.address=item.address.split("#").join("-");
                                            item.phone=item.phone==null?'暂无':item.phone;
                                            item.weixincode=item.weixincode==null?'暂无':item.weixincode;
                                            item.bolgcode=item.bolgcode==null?'暂无':item.bolgcode;
                                            return item;
                                            });
                                            that.setState({dataSource:arr});
                                        })
                                    }
                                    })
                                }}
                            >
                            <a href="javascript:;">删除</a>
                            </Popconfirm >
                </span>
                ),
            }],
        collapsed: false,
        current:1,
        pageSize:5,
        val:1,
        columns1:[{
            title: '编号',
            dataIndex: 'blid',
            key: 'blid',
        },{
            title: '用户编号',
            dataIndex: 'uid',
            key: 'uid',
            render: text => <a href="javascript:;">{text}</a>,
        },{
            title: '昵称',
            dataIndex: 'nickname',
            key: 'nickname',
        },{
            title: '身份',
            dataIndex: 'role',
            key: 'role'
        },{
            title: '性别',
            dataIndex: 'sex',
            key: 'sex'
        },{
            title: '年龄',
            dataIndex: 'age',
            key: 'age'
        },{
            title: '管理员',
            dataIndex: 'adminid',
            key: 'adminid'
        },{
            title: '操作时间',
            dataIndex: 'time',
            key: 'time'
        },{
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Popconfirm title='确认取消拉黑该用户？' okText='确认' cancelText='取消' 
                                onConfirm={() => {
                                    console.log(record.blid);
                                    let that=this;
                                    var api = 'http://127.0.0.1:7001';
                                    axios.get(api+'/deleteUser?blid='+record.blid+'&uid='+record.uid)
                                    .then(function (response) {
                                    if(response.data.data==1){
                                        axios.get(api+'/queryUser?black=0')
                                        .then(function (response) {
                                            console.log("user",response);
                                            let arr= response.data.data.map((item,index)=>{
                                            item.key=index+1;
                                            item.sex=item.key==1?'男':'女';
                                            item.address=item.address.split("#").join("-");
                                            item.phone=item.phone==null?'暂无':item.phone;
                                            item.weixincode=item.weixincode==null?'暂无':item.weixincode;
                                            item.bolgcode=item.bolgcode==null?'暂无':item.bolgcode;
                                            return item;
                                            });
                                            that.setState({dataSource:arr});
                                        })

                                        axios.get(api+'/queryBlacklistUser')
                                        .then(function (response) {
                                            // console.log("list",response);
                                            let arr= response.data.data.map((item,index)=>{
                                                item.key=index+1;
                                                item.sex=item.User.sex==1?'男':'女';
                                                item.nickname=item.User.nickname;
                                                item.role=item.User.role;
                                                item.age=item.User.age;
                                                return item;
                                                });
                                            that.setState({dataSource2:arr});
                                        })
                                    }
                                    })
                                }}
                            >
                            <a href="javascript:;">取消拉黑</a>
                            </Popconfirm >
                </span>
                ),
            }],
    }
    componentWillMount(){
        let that=this;
        var api = 'http://127.0.0.1:7001';
        axios.get(api+'/queryUser?black=0')
        .then(function (response) {
            let arr= response.data.data.map((item,index)=>{
            item.key=index+1;
            item.sex=item.sex==1?'男':'女';
            item.address=item.address.split("#").join("-");
            item.phone=item.phone==null?'暂无':item.phone;
            item.weixincode=item.weixincode==null?'暂无':item.weixincode;
            item.bolgcode=item.bolgcode==null?'暂无':item.bolgcode;
            return item;
            });
            that.setState({dataSource:arr});
        })
        axios.get(api+'/queryBlacklistUser')
        .then(function (response) {
            // console.log("list",response);
            let arr= response.data.data.map((item,index)=>{
                item.key=index+1;
                item.sex=item.User.sex==1?'男':'女';
                item.nickname=item.User.nickname;
                item.role=item.User.role;
                item.age=item.User.age;
                return item;
                });
            that.setState({dataSource2:arr});
        })
    }

        MenuTab=(e)=>{ 
        if(e==2){
            this.setState({val:2})
        }else
            this.setState({val:1})
        }

    render(){
        return(
            <div id='usermanage'>
            {/* 搜索框 */}
                <Search
                    placeholder="请输入要搜索的用户编号"
                    enterButton="搜索"
                    onSearch={value =>{
                        let that=this;
                        var api = 'http://127.0.0.1:7001';
                        if(this.state.val==1){
                        axios.get(api+'/queryUser?black=0&uid='+value)
                        .then(function (response) {
                            console.log("user",response);
                            let arr= response.data.data.map((item,index)=>{
                            item.key=index+1;
                            item.sex=item.key==1?'男':'女';
                            item.address=item.address.split("#").join("-");
                            item.phone=item.phone==null?'暂无':item.phone;
                            item.weixincode=item.weixincode==null?'暂无':item.weixincode;
                            item.bolgcode=item.bolgcode==null?'暂无':item.bolgcode;
                            return item;
                            });
                            that.setState({dataSource:arr});
                        })
                    }
                    else{
                        axios.get(api+'/queryBlacklistUser?uid='+value)
                        .then(function (response) {
                            // console.log("list",response);
                            let arr= response.data.data.map((item,index)=>{
                                item.key=index+1;
                                item.sex=item.User.sex==1?'男':'女';
                                item.nickname=item.User.nickname;
                                item.role=item.User.role;
                                item.age=item.User.age;
                                return item;
                                });
                            that.setState({dataSource2:arr});
                        })
                    }
                    }}
                    style={{marginBottom:'20px',width:'27%'}}
                    />
                <Tabs defaultActiveKey="1" onChange={this.MenuTab}>
                <TabPane tab={<span><Icon type="user" />用户列表</span>} key="1">
                <Table  pagination={ {
                        total: this.state.dataSource.length,
                        showTotal: () => `共${this.state.dataSource.length}条`,
                        current:　this.state.current,
                        pageSize: this.state.pageSize,
                        onChange: (page, pageSize) => {
                            // console.log('current page: ', page,pageSize)
                            this.setState({
                                current: page,
                                pageSize:pageSize
                            })
                        }
                    }} 
                columns={this.state.columns} dataSource={this.state.dataSource} />
                </TabPane>
                <TabPane tab={<span><Icon type="lock" />平台黑名单</span>} key="2">
                <Table  pagination={ {
                        total: this.state.dataSource2.length,
                        showTotal: () => `共${this.state.dataSource2.length}条`,
                        current:　this.state.current,
                        pageSize: this.state.pageSize,
                        onChange: (page, pageSize) => {
                            // console.log('current page: ', page,pageSize)
                            this.setState({
                                current: page,
                                pageSize:pageSize
                            })
                        }
                    }} 
                columns={this.state.columns1} dataSource={this.state.dataSource2}/>
                </TabPane>
                </Tabs>
            </div>
        )
    }
}


export default withRouter(Index);