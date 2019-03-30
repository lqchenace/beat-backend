import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {Drawer, Button, Divider, Col, Row, Tabs, Icon, Table,Modal} from 'antd';
import moment from 'moment';


const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
};
var pimg={width:'165px',height:'110px',marginRight:'15px',marginTop:'10px'}

const DescriptionItem = ({ title, content }) => (
    <div
    style={{
        fontSize: 14,
        lineHeight: '22px',
        marginBottom: 7,
        color: 'rgba(0,0,0,0.65)',
    }}
    >
    <p
        style={{
        marginRight: 8,
        display: 'inline-block',
        color: 'rgba(0,0,0,0.85)',
        }}
    >
        {title}:
    </p>
    {content}
    </div>
);
const TabPane = Tabs.TabPane;
var api = 'http://127.0.0.1:7001';
class Index extends React.Component {
        state = {
            visible: false ,
            dataSource:[],
            columns:[{
                title: '申请认证编号',
                dataIndex: 'cerid',
                key: 'cerid',
            },{
                title: '用户编号',
                dataIndex: 'uid',
                key: 'uid',
            },{
                title: '认证身份',
                dataIndex: 'role',
                key: 'role'
            },{
                title: '真实姓名',
                dataIndex: 'name',
                key: 'name'
            },{
                title: '身份证号',
                dataIndex: 'idcode',
                key: 'idcode'
            },{
                title: '审核状态',
                dataIndex: 'status',
                key: 'status'
            },{
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a href="javascript:;">查看详情</a>
                    </span>
                    ),
                }],
            dataSource2:[],
            columns2:[{
                title: '申请认证编号',
                dataIndex: 'cerid',
                key: 'cerid',
            },{
                title: '用户编号',
                dataIndex: 'uid',
                key: 'uid',
            },{
                title: '认证身份',
                dataIndex: 'role',
                key: 'role'
            },{
                title: '真实姓名',
                dataIndex: 'name',
                key: 'name'
            },{
                title: '身份证号',
                dataIndex: 'idcode',
                key: 'idcode'
            },{
                title: '审核状态',
                dataIndex: 'status',
                key: 'status'
            },{
                title: '审核人',
                dataIndex: 'adminid',
                key: 'adminid'
            },{
                title: '审核时间',
                dataIndex: 'worktime',
                key: 'worktime'
            },{
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a href="javascript:;">查看详情</a>
                    </span>
                    ),
                }],
            current:1,
            pageSize:5,
            userData:{},
            visible1: false,
            avatar:'',
            visible2: false,
            avatar2:'',
            visible3: false,
            avatar3:'',
            isverify:false,
            };

        onClose = () => {
        this.setState({
            visible: false,
        });
        };
        componentWillMount(){
            let that=this;
            axios.get(api+'/queryverifylist?status=待审核')
            .then(function (response) {
                that.setState({dataSource:response.data.data});
            })
            axios.get(api+'/queryverifylist?status=已审核')
            .then(function (response) {
                that.setState({dataSource2:response.data.data});
            })
        }
        click=(record,rowkey)=>{
            let that=this;
            this.setState({
                visible: true,
            });
            axios.get(api+'/queryverifydetail?cerid='+record.cerid)
            .then(function (response) {
                let data=response.data.data;
                data.nickname=data.User.nickname;
                data.age=data.User.age;
                data.sex=data.User.sex;
                data.address=data.User.address.split("#").join("-");
                data.nowrole=data.User.role;
                data.phone=data.User.phone;
                data.imgurl1=data.imgurl.split("#")[0];
                data.imgurl2=data.imgurl.split("#")[1];
                data.imgurl3=data.imgurl.split("#")[2];
                that.setState({userData:data});
            })
        }
        // 点击通过审批
        confirmverify=()=>{
            let that=this;
            console.log("777777",this.state.userData);
            let data=this.state.userData;
            axios.get(api+'/confirmverify', {
                params: {
                cerid: data.cerid,
                uid:data.uid,
                idimgurl:data.imgurl,
                name:data.name,
                role:data.role,
                idcode:data.idcode,
                adminid:localStorage.getItem("username"),
                worktime:moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
                }
            })
            .then(function (response) {
                if(response.data.data==1){
                that.setState({
                    visible: false,
                });
                axios.get(api+'/queryverifylist?status=待审核')
                .then(function (response) {
                    that.setState({dataSource:response.data.data});
                })
                axios.get(api+'/queryverifylist?status=已审核')
                .then(function (response) {
                    that.setState({dataSource2:response.data.data});
                })
            }
            })
            .catch(function (error) {
                console.log(error);

            })
        }
        MenuTab=(e)=>{
            console.log("e",e);  
        if(e==2){
            this.setState({isverify:true})
        }else
            this.setState({isverify:false})
        }
        render() {
                return (
                <div>
                <Tabs defaultActiveKey="1" onChange={this.MenuTab}>
                <TabPane tab={<span><Icon type="clock-circle" />待审核</span>} key="1">
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
                    columns={this.state.columns} dataSource={this.state.dataSource} 
                                onRow={(record,rowkey)=>{
                                        return{
                                        onClick : this.click.bind(this,record,rowkey)   
                                     //点击行 record 指的本行的数据内容，rowkey指的是本行的索引
                                        }
                                    }}
                    />
                </TabPane>
                <TabPane tab={<span><Icon type="check-circle" />已审核</span>} key="2">
                <Table  pagination={ {
                        total: this.state.dataSource2.length,
                        showTotal: () => `共${this.state.dataSource2.length}条`,
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
                    columns={this.state.columns2} dataSource={this.state.dataSource2}
                                onRow={(record,rowkey)=>{
                                        return{
                                        onClick : this.click.bind(this,record,rowkey)   
                                     //点击行 record 指的本行的数据内容，rowkey指的是本行的索引
                                        }
                                    }} 
                    />
                </TabPane>
                </Tabs>
                {/* 弹出抽屉层 */}
                    <Drawer
                    width={600}
                    placement="left"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    >
                    <h2 style={{ ...pStyle, marginBottom: 24 }}>认证详情</h2>
                    <p style={pStyle}>用户基础信息</p>
                    <Row>
                        <div style={{marginBottom:'20px'}}>
                            <span>头像：</span>
                            <img src={api+"/"+this.state.userData.headimgUrl+"/"+this.state.userData.headimg} alt=""
                            style={{width: '80px',height:'80px',marginLeft:'10px'}}/>
                        </div>
                    </Row>
                    <Row>
                        <Col span={12}>
                        <DescriptionItem title="昵称" content={this.state.userData.nickname} />{' '}
                        </Col>
                        <Col span={12}>
                        <DescriptionItem title="身份" content={this.state.userData.nowrole} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                        <DescriptionItem title="性别" content={this.state.userData.sex==1?'男':'女'} />
                        </Col>
                        <Col span={12}>
                        <DescriptionItem title="年龄" content={this.state.userData.age} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                        <DescriptionItem title="联系电话" content={this.state.userData.phone==null?'暂无':this.state.userData.phone} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                        <DescriptionItem
                            title="目前所属地区"
                            content={this.state.userData.address}/>
                        </Col>
                    </Row>
                    <Divider />
                    <p style={pStyle}>用户认证信息</p>
                    <Row>
                        <Col span={12}>
                        <DescriptionItem title="真实姓名" content={this.state.userData.name} />
                        </Col>
                        <Col span={12}>
                        <DescriptionItem title="要认证身份为" content={this.state.userData.role} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                        <DescriptionItem title="身份证号" content={this.state.userData.idcode} />
                        </Col>
                    </Row>
                    <p style={pStyle}>认证材料</p>
                    <Row>
                        <div>
                            <img src={api+"/"+this.state.userData.imgurl1} onClick={() => this.setState({visible1: true,avatar:api+"/"+this.state.userData.imgurl1})} alt="" style={pimg}></img>
                            <img src={api+"/"+this.state.userData.imgurl2} onClick={() => this.setState({visible2: true,avatar2:api+"/"+this.state.userData.imgurl2})} alt="" style={pimg}></img>
                            <img src={api+"/"+this.state.userData.imgurl3} onClick={() => this.setState({visible3: true,avatar3:api+"/"+this.state.userData.imgurl3})} alt="" style={pimg}></img>
                        </div>
                    </Row>
                    {this.state.isverify?
                        <Button type="primary" block style={{marginTop:'20px'}} disabled>已审批</Button>
                        :
                        <Button  type="primary" block style={{marginTop:'20px'}} onClick={this.confirmverify}>审批通过</Button>
                    }
                    <div style={{marginTop:'20px',color:'red'}}>注意：管理员一定要认真比对用户的认证信息是正确的，才能点击审批通过</div>
                    </Drawer>
                    {/* 认证图片的弹出层 */}
                    <Modal
                    footer={null} closable={false}
                    visible={this.state.visible1}
                    wrapClassName="vertical-center-modal"
                    onCancel={() => this.setState({visible1: false})}>
                    <img src={this.state.avatar} alt="" width='100%'/>
                    </Modal>
                    <Modal
                    footer={null} closable={false}
                    visible={this.state.visible2}
                    wrapClassName="vertical-center-modal"
                    onCancel={() => this.setState({visible2: false})}>
                    <img src={this.state.avatar2} alt="" width='100%'/>
                    </Modal>
                    <Modal
                    footer={null} closable={false}
                    visible={this.state.visible3}
                    wrapClassName="vertical-center-modal"
                    onCancel={() => this.setState({visible3: false})}>
                    <img src={this.state.avatar3} alt="" width='100%'/>
                    </Modal>
                </div>
                );
            }
}


export default withRouter(Index);
