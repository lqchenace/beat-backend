import React from 'react';
import { withRouter,Route,Switch } from 'react-router-dom'
import UseIndex from '../../routes/Usermanage/index';
import Complain from '../../routes/Complain/index';
import IDManagement from '../../routes/IDManagement/index';
import PrivateRoute from '../../routes/PrivateRoute/index';
class Index extends React.Component {

    render () {
        return (
            <div style={{padding: 16, position: 'relative'}}>
            <Switch>
                    <PrivateRoute exact path="/myhome/usermanage" component={UseIndex}/>
                    <PrivateRoute path="/myhome/complain" component={Complain}/>
                    <PrivateRoute path="/myhome/idmanagement" component={IDManagement}/>
            </Switch>
            </div>
            )
    }

}


export default withRouter(Index);