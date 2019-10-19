import React from 'react'
import { Icon, Badge, Dropdown, Menu, Modal } from 'antd'
import screenfull from 'screenfull'
import { Link, withRouter } from 'react-router-dom'

import { connect } from 'react-redux';

class HeaderBar extends React.Component {
        state = {
        icon: 'arrows-alt',
        visible: false,
        avatar: require('./img/04.jpg')
        }
            componentDidMount () {
                screenfull.onchange(() => {
                this.setState({
                    icon: screenfull.isFullscreen ? 'shrink' : 'arrows-alt'
                })
                })
            }
            
            componentWillUnmount () {
                screenfull.off('change')
            }
            
            toggle = () => {
                this.props.onToggle()
            }
            screenfullToggle = () => {
                if (screenfull.enabled) {
                screenfull.toggle()
                }
            }
            logout=()=>{
                localStorage.clear();
                this.props.history.push("/")
            }
        render () {
            const {icon, visible, avatar} = this.state
                const menu = (
                <Menu className='menu'>
                    <Menu.ItemGroup title='用户中心' className='menu-group'>
                    <Menu.Item>你好 - { localStorage.getItem("username")}</Menu.Item>
                    <Menu.Item>个人信息</Menu.Item>
                    <Menu.Item onClick={this.logout}><span>退出登录</span></Menu.Item>
                    </Menu.ItemGroup>
                </Menu>
                )
                const login = (
                <Dropdown overlay={menu}>
                    <img onClick={() => this.setState({visible: true})} src={avatar} alt=""/>
                </Dropdown>
                )
                return (
                <div id='headerbar'>
                    <Icon
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    className='trigger'
                    onClick={this.toggle}/> 
                    <div style={{lineHeight: '64px', float: 'right'}}>
                    <ul className='header-ul'>
                        <li><Icon type={icon} onClick={this.screenfullToggle}/></li>
                        <li>{login}</li>
                    </ul>
                    </div>
                    <Modal
                    footer={null} closable={false}
                    visible={visible}
                    wrapClassName="vertical-center-modal"
                    onCancel={() => this.setState({visible: false})}>
                    <img src={avatar} alt="" width='100%'/>
                    </Modal>
                </div>
                )
            }      
    }
    const mapStateToProps = (state) => {
        return {
            
            }
        };

    export default withRouter(connect(mapStateToProps)(HeaderBar))