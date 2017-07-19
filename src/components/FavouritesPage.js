import React, { Component } from 'react';
import * as favouritesActions from '../redux/modules/favourites';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';

import PhotosDisplay from './PhotosDisplay';

class FavouritesPage extends Component {

    state = { currentPage: 0 };

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

    fetchNextPage = (page) => {
        this.setState({
            currentPage: page
        });
    };

    onSavePressed = (photos) => {
        this.props.favouritesActions.removePhotosFromFavourites(photos);
    };

    render() {
        const { perPage, footerHeight, headerHeight } = this.props;
        const photos = Object.keys(this.props.photos).map(key => this.props.photos[key]).slice(0, this.state.currentPage * perPage);

        return (
            <PhotosDisplay
                footerHeight={footerHeight}
                headerHeight={headerHeight}
                onNextPage={this.fetchNextPage}
                photos={photos}
                onEditAction={this.onSavePressed}
                editModeButtonStyle="danger"
                editModeButtonText="Remove"
                normalTitle="Favourites"
                hasMore={photos.length < Object.keys(this.props.photos).length}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        photos: state.favourites.photos
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        favouritesActions: bindActionCreators(favouritesActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesPage);
