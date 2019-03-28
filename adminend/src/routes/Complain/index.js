import React from 'react';
import { withRouter } from 'react-router-dom'

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
            投诉管理
            </div>
        )
    }
}


export default withRouter(Index);