import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {Drawer, Button, Divider, Col, Row, Tabs, Icon, Table,Modal} from 'antd';
import moment from 'moment';


const pStyle = {
    fontSize: 16,
    color: '#333',
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
                title: '投诉编号',
                dataIndex: 'coid',
                key: 'coid',
            },{
                title: '投诉者编号',
                dataIndex: 'uid',
                key: 'uid',
            },{
                title: '投诉的约拍编号',
                dataIndex: 'bid',
                key: 'bid'
            },{
                title: '投诉类型',
                dataIndex: 'cotype',
                key: 'cotype'
            },{
                title: '投诉时间',
                dataIndex: 'complaintime',
                key: 'complaintime'
            },{
                title: '状态',
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
                title: '投诉编号',
                dataIndex: 'coid',
                key: 'coid',
            },{
                title: '投诉者编号',
                dataIndex: 'uid',
                key: 'uid',
            },{
                title: '投诉的约拍编号',
                dataIndex: 'bid',
                key: 'bid'
            },{
                title: '投诉类型',
                dataIndex: 'cotype',
                key: 'cotype'
            },{
                title: '投诉时间',
                dataIndex: 'complaintime',
                key: 'complaintime'
            },{
                title: '状态',
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
            };

        onClose = () => {
        this.setState({
            visible: false,
        });
        };
        componentWillMount(){
            let that=this;
            axios.get(api+'/queryverifylist?status=待处理')
            .then(function (response) {
                that.setState({dataSource:response.data.data});
            })
            axios.get(api+'/queryverifylist?status=已处理')
            .then(function (response) {
                that.setState({dataSource2:response.data.data});
            })
        }
        click=(record,rowkey)=>{
            let that=this;
            this.setState({
                visible: true,
            });
            axios.get(api+'/queryverifydetail?coid='+record.coid+'&uid2='+record.uid2)
            .then(function (response) {
                console.log("res",response.data.data);
                let data=response.data.data;
                data.nickname=data.User.nickname;
                data.age=data.User.age;
                data.sex=data.User.sex;
                data.address=data.User.address.split("#").join("-");
                data.role=data.User.role;
                data.phone=data.User.phone;
                that.setState({userData:data});
            })
        }
        // 点击已经处理
        confirmverify=()=>{
            let that=this;
            console.log("777777",this.state.userData);
            let data=this.state.userData;
            axios.get(api+'/confirmverify', {
                params: {
                coid: data.coid,
                adminid:localStorage.getItem("username"),
                worktime:moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
                }
            })
            .then(function (response) {
                if(response.data.data==1){
                that.setState({
                    visible: false,
                });
                axios.get(api+'/queryverifylist?status=待处理')
                .then(function (response) {
                    that.setState({dataSource:response.data.data});
                })
                axios.get(api+'/queryverifylist?status=已处理')
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
                <TabPane tab={<span><Icon type="clock-circle" />待处理</span>} key="1">
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
                <TabPane tab={<span><Icon type="check-circle" />已处理</span>} key="2">
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
                    <h2 style={{ ...pStyle, marginBottom: 24 }}>投诉详情</h2>
                    <p style={pStyle}>被投诉的用户的基本信息</p>
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
                        <DescriptionItem title="身份" content={this.state.userData.role} />
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
                    <div style={{color:'red'}}>统计：该用户目前已经被投诉的次数为：{this.state.userData.num}</div>
                    <Divider />
                    <p style={pStyle}>投诉内容</p>
                    <Row>
                        <Col span={12}>
                        <DescriptionItem title="投诉类型" content={this.state.userData.cotype} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                        <DescriptionItem title="投诉内容" content={this.state.userData.cocommand} />
                        </Col>
                    </Row>
                    {
                    this.state.userData.coimg!=null?
                    <div>
                        <p style={pStyle}>证据截图</p>
                        <Row>
                            {
                            this.state.userData.coimg.indexOf("#")==-1?
                                <img src={api+"/"+this.state.userData.coimg}
                                onClick={() => this.setState({visible1: true,avatar:api+"/"+this.state.userData.coimg})}
                                alt="" style={pimg} key="coimg"></img>
                            :
                                this.state.userData.coimg.split("#").map((item,index)=>{
                                return (
                                    <img src={api+"/"+item} alt="" style={pimg} key={index}
                                    onClick={() => this.setState({visible1: true,avatar:api+"/"+item})}
                                    ></img>
                                )
                                })
                            }
                        </Row>
                    </div>
                    :''
                    }
                    {this.state.isverify?
                        <Button type="primary" block style={{marginTop:'20px'}} disabled>已处理</Button>
                        :
                        <Button  type="primary" block style={{marginTop:'20px'}} onClick={this.confirmverify}>处理完毕</Button>
                    }
                    </Drawer>
                    {/* 认证图片的弹出层 */}
                    <Modal
                    footer={null} closable={false}
                    visible={this.state.visible1}
                    wrapClassName="vertical-center-modal"
                    onCancel={() => this.setState({visible1: false})}>
                    <img src={this.state.avatar} alt="" width='100%'/>
                    </Modal>
                </div>
                );
            }
}
export default withRouter(Index);
