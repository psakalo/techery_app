import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import * as authActions from '../redux/modules/auth';

class AuthChecker extends Component {
    render() {
        if (this.props.auth.authenticated) {
            return this.props.children;
        } else {
            return <a href={this.props.auth.pxAuth.token.getUri()}>Login to 500px</a>;
        }
    }

    componentDidMount() {
        this.props.authActions.checkAuthStatus();
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        authActions: bindActionCreators(authActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthChecker);