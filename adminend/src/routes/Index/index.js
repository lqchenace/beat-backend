import React from 'react';
import {Layout, Menu, Icon } from 'antd';
import HeaderBar from '../../components/HeaderBar'
import ContainMain from '../../components/ContainMain'
import './index.css'
import { withRouter,Link} from 'react-router-dom'

const {Sider, Header, Content, Footer} = Layout;
class Index extends React.Component {
    state = {
        collapsed: false,
        current:"1",  
    }
    toggle = () => {
            this.setState({
            collapsed: !this.state.collapsed,
            });
    }
    handleClick=(e)=> {
        console.log("33333",e.key);
        this.setState({current: e.key});
    }
    render(){
        return(
            <div id='components-layout'>
                <Layout>
                        <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                        >
                        <div style={{height: '100vh'}}>
                            <div className="logo" />
                            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}
                            selectedKeys={[this.state.current]} onClick={this.handleClick.bind(this)}>
                                <Menu.Item key="1">
                                <Link to='/myhome/usermanage'>
                                <Icon type="user" />
                                <span>用户管理</span>
                                </Link>
                                </Menu.Item>
                                <Menu.Item key="2">
                                <Link to='/myhome/complain'>
                                <Icon type="mail" />
                                <span>投诉管理</span>
                                </Link>
                                </Menu.Item>
                                <Menu.Item key="3">
                                <Link to='/myhome/idmanagement'>
                                <Icon type="schedule" />
                                <span>身份认证管理</span>
                                </Link>
                                </Menu.Item>
                            </Menu>
                        </div>
                        </Sider>
                        <Layout>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            <HeaderBar collapsed={this.state.collapsed} onToggle={this.toggle}/>
                        </Header>
                        <Content style={{
                            margin: '24px 0', padding: 24, background: '#fff', minHeight: 280,
                        }}
                        >
                            <ContainMain/>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            约拍小程序管理端 ©2019 Created by LiQin
                        </Footer>
                        </Layout>
                    </Layout>
            </div>
        )
    }
}


export default withRouter(Index);