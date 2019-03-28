import React from 'react'
import BGParticle from '../../utils/BGParticle'
import './style.css'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import 'animate.css'

class Login extends React.Component {
    state = {
        showBox: 'login',   //展示当前表单
}

  //切换showbox
    switchShowBox = (box) => {
        this.setState({
        showBox: box
        })
    }
    componentDidMount () {
        this.particle = new BGParticle('backgroundBox')
        this.particle.init()
        }
    render(){
        const {showBox} = this.state
        return(
            <div id='login-page'>
                <div id='backgroundBox' style={styles.backgroundBox}/>
                <div className='container'>
                    <LoginForm
                    className={showBox === 'login' ? 'box showBox' : 'box hiddenBox'}
                    switchShowBox={this.switchShowBox}/>
                    <RegisterForm
                    className={showBox === 'register' ? 'box showBox' : 'box hiddenBox'}
                    switchShowBox={this.switchShowBox}/>
                </div>
            </div>
        )
    }
}
const styles = {
    backgroundBox: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        // backgroundImage: 'url(https://github.com/zhangZhiHao1996/image-store/blob/master/react-admin-master/bg5.jpg?raw=true)',
        backgroundImage: 'url(https://github.com/zhangZhiHao1996/image-store/blob/master/react-admin-master/bg1.jpg?raw=true)',
        backgroundSize: '100% 100%',
        transition:'all .5s'
    },
}

export default Login;