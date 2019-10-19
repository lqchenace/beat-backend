
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';

class index extends Component {
    onChange = e => {
        console.log(e);
    };
    render() {
        return (
            <div>
                <Input placeholder="input with clear icon" allowClear onChange={this.onChange} />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
return {

}
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(index));