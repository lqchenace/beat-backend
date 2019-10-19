import React from 'react';
import {Layout, Menu, Icon ,Breadcrumb } from 'antd';
import HeaderBar from '../../components/HeaderBar'
import ContainMain from '../../components/ContainMain';
import menuConfig from '../../config/menuConfig'
import './index.css'
import { withRouter,Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { switchMenu  } from '../../redux/action'

const {Sider, Header, Content, Footer} = Layout;
const { SubMenu }= Menu;
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
        let pathArr=[];
        this.setState({current: e.key});
        let path= e.key.split("/")[0];
        menuConfig.map((item,index)=>{
            if(item.key === path){
                pathArr.push(item.title);
            }
            if(item.children){
                item.children.map((children,dev)=>{
                    if(children.key === e.key){
                        pathArr.push(children.title);
                    }
                })
            }
        })
        this.props.handleClick(pathArr);
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
                                {
                                    menuConfig.map((item,index)=>{
                                        return(
                                            item.children?(
                                                <SubMenu key={item.key}
                                                title={
                                                    <span>
                                                        <Icon type={item.icon} />
                                                        <span>{item.title}</span>
                                                    </span>
                                                }>
                                                    {
                                                        item.children.map((children,dev)=>{
                                                            return(
                                                                <Menu.Item key={children.key}>
                                                                <Link to={children.url}>
                                                                { children.icon && <Icon type={ children.icon }/> }
                                                                <span>{children.title}</span>
                                                                </Link>
                                                                </Menu.Item>
                                                            )
                                                        })
                                                    }
                                                </SubMenu>
                                            ):(
                                                <Menu.Item key={item.key}>
                                                <Link to={item.url}>
                                                <Icon type={item.icon} />
                                                <span>{item.title}</span>
                                                </Link>
                                                </Menu.Item>
                                            )
                                        )
                                    })
                                }
                            </Menu>
                        </div>
                        </Sider>
                        <Layout>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            <HeaderBar collapsed={this.state.collapsed} onToggle={this.toggle}/>
                        </Header>
                        <Content style={{margin: '0 16px'}}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                            {
                                this.props.menuName.map((item,index)=>{
                                    return(
                                        <Breadcrumb.Item key={ index }>{ item }</Breadcrumb.Item>
                                    )
                                })
                            }
                            </Breadcrumb>
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
const mapStateToProps = (state) => {
    return {
        menuName: state.menuName
    }
};

const mapDispatchToProps = (dispatch) => {
return {
    handleClick(titleArray) {
    dispatch(switchMenu(titleArray));
    }
}
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Index));