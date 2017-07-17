import React, { Component } from 'react';
import * as photosActions from '../redux/modules/photos';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import PhotosDisplay from './PhotosDisplay';

class PhotosPage extends Component {
    render() {
        return (
            <PhotosDisplay photos={this.props.photos} />
        );
    }

    componentDidMount() {
        this.props.photosActions.getPhotos(1);
    }
}

const mapStateToProps = (state) => {
    return {
        photos: state.photos.photos,
        fetchInProgress: state.photos.fetchInProgress
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        photosActions: bindActionCreators(photosActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotosPage);