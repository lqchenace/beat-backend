import React from 'react'
import BGParticle from '../../utils/BGParticle'
class Login extends React.Component {

    componentDidMount () {
        this.particle = new BGParticle('backgroundBox')
        this.particle.init()
        }
    render(){
        return(

            <div id='backgroundBox' style={styles.backgroundBox}/>

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