import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Table,Divider,Popconfirm} from 'antd';

//dataSource 一个数组中包含好多对象，每个对象就是一组数据
const dataSource = [{
    key: '1',
    name: '天下',
    age: 32,
    address: '北京市'
},{
    key: '2',
    name: '小小',
    age: 22,
    address: '深圳市'
},{
    key: '3',
    name: '3refe美丽',
    age: 18,
    address: '重庆市'
},{
    key: '4',
    name: 'ffr',
    age: 18,
    address: '重庆市'
},{
    key: '5',
    name: '美3333',
    age: 18,
    address: '重庆市'
},{
    key: '6',
    name: '333丽',
    age: 18,
    address: '重庆市'
},{
    key: '7',
    name: '5555',
    age: 18,
    address: '重庆市'
},{
    key: '9',
    name: '2222',
    age: 18,
    address: '重庆市'
}]
 
// colums 代表列
// title 每列的标题
// dataIndex 是用来关联对应的数据，如果删除或者注释这项的话，这列就会为空
// key是一个唯一的标识
const columns = [{
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
            <a href="javascript:;">拉黑</a>
            <Divider type="vertical" />
            <Popconfirm title='确认删除？' okText='确认' cancelText='取消' 
                        onConfirm={() => {
                            console.log(record.uid);
                            // let data = this.state.data;
                            // data.pop();
                            // this.setState({
                            //     data: data
                            // }, () => {
                            //     console.log("this.state.data.length");
                            //     // console.log('after delete current page: ',this.state.current);
                            // })
                        }}
                    >
                    <a href="javascript:;">删除</a>
                    </Popconfirm >
        </span>
        ),
    }]


class Index extends React.Component {
    state = {
        dataSource:[],
        columns:columns,
        collapsed: false,
        current:1,
        pageSize:5
    }
    toggle = () => {
            this.setState({
            collapsed: !this.state.collapsed,
            });
    }
    componentWillMount(){
        let that=this;
        var api = 'http://127.0.0.1:7001';
        axios.get(api+'/queryUser')
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
    render(){
        return(
            <div id='usermanage'>
            
            <Table  pagination={ {
                        total: this.state.dataSource.length,
                        showTotal: () => `共${this.state.dataSource.length}条`,
                        current:　this.state.current,
                        pageSize: this.state.pageSize,
                        onChange: (page, pageSize) => {
                            console.log('current page: ', page,pageSize)
                            this.setState({
                                current: page,
                                pageSize:pageSize
                            })
                        }
                    }} 
            columns={this.state.columns} dataSource={this.state.dataSource} />

            </div>
        )
    }
}


export default withRouter(Index);