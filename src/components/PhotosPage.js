import React, { Component } from 'react';
import * as photosActions from '../redux/modules/photos';
import * as favouritesActions from '../redux/modules/favourites';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';

import PhotosDisplay from './PhotosDisplay';

class PhotosPage extends Component {

    static propTypes = {
        perPage: PropTypes.number,
        footerHeight: PropTypes.number,
        headerHeight: PropTypes.number
    };

    static defaultProps = {
        perPage: 20,
        footerHeight: 0,
        headerHeight: 0
    };

    fetchNextPage = () => {
        this.props.photosActions.getNextPhotos(this.props.perPage);
    };

    onSavePressed = (photos) => {
        this.props.favouritesActions.addPhotosToFavourites(photos);
    };

    render() {
        const { footerHeight, headerHeight, photos } = this.props;

        return (
            <PhotosDisplay
                footerHeight={footerHeight}
                headerHeight={headerHeight}
                onNextPage={this.fetchNextPage}
                photos={photos}
                onEditAction={this.onSavePressed}
                editModeButtonStyle="primary"
                editModeButtonText="Save"
                normalTitle="Top photos"
                hasMore={!this.props.error}
                finalText="Oops, couldn't load more photos :("
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        photos: state.photos.photos,
        error: state.photos.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        photosActions: bindActionCreators(photosActions, dispatch),
        favouritesActions: bindActionCreators(favouritesActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotosPage);
