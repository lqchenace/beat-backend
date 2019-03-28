import React from 'react';
import { withRouter } from 'react-router-dom';


import { Table,Icon,Divider } from 'antd';

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
    name: '美丽',
    age: 18,
    address: '重庆市'
},{
    key: '3',
    name: '美丽',
    age: 18,
    address: '重庆市'
},{
    key: '3',
    name: '美丽',
    age: 18,
    address: '重庆市'
},{
    key: '3',
    name: '美丽',
    age: 18,
    address: '重庆市'
},{
    key: '3',
    name: '美丽',
    age: 18,
    address: '重庆市'
},{
    key: '3',
    name: '美丽',
    age: 18,
    address: '重庆市'
}]
 
// colums 代表列
// title 每列的标题
// dataIndex 是用来关联对应的数据，如果删除或者注释这项的话，这列就会为空
// key是一个唯一的标识
const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
},{
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
},{
    title: '地址',
    dataIndex: 'address',
    key: 'address'
}, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
        <span>
            <a href="javascript:;">加入黑名单</a>
            <Divider type="vertical" />
            <a href="javascript:;">删除</a>
        </span>
        ),
    }]


    const {
        lutList:{ data, page },
        loading,
      } = this.props;
   
      // 表格数据的总条数
      const totals = page.total;
   
      // 表格分页属性
      const paginationProps = {
        showSizeChanger: true,
        showQuickJumper: false,
        showTotal: () => `共${totals}条`,
        pageSize: this.state.pageSize,
        current: page.pageNum,
        total: page.total,
        onShowSizeChange: (current,pageSize) => this.changePageSize(pageSize,current),
        onChange: (current) => this.changePage(current),
      }
class Index extends React.Component {
    state = {
        collapsed: false
    }
    toggle = () => {
            this.setState({
            collapsed: !this.state.collapsed,
            });
    }
    render(){
        return(
            <div id='usermanage'>
            
            <Table  pagination={ paginationProps } columns={columns} dataSource={dataSource} />

            </div>
        )
    }
}


export default withRouter(Index);