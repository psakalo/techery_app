import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';

import Photo from './Photo';
import TopPanel from './TopPanel';

const selectedImageStyle = {
    opacity: 0.5
};

export default class PhotosDisplay extends Component {
    state = { selectedIndices: [] };

    static propTypes = {
        photos: PropTypes.array.isRequired,
        footerHeight: PropTypes.number,
        headerHeight: PropTypes.number,
        onNextPage: PropTypes.func.isRequired,
        hasMore: PropTypes.bool,
        onSelectedChange: PropTypes.func,
        onEditAction: PropTypes.func,
        normalTitle: PropTypes.string,
        editModeButtonText: PropTypes.string,
        editModeButtonStyle: PropTypes.string,
        finalText: PropTypes.string
    };

    static defaultProps = {
        photos: [],
        footerHeight: 0,
        headerHeight: 0,
        normalTitle: "",
        hasMore: true,
        editModeButtonText: "",
        editModeButtonStyle: "primary",
        finalText: "There is nothing more..."
    };

    resetSelection = () => {
        this.setState({
            selectedIndices: []
        });
    };

    onPhotoPressed = (photoIndex, e) => {
        let newIndices;
        if (this.state.selectedIndices.includes(photoIndex)) {
            newIndices = this.state.selectedIndices.filter(index => index !== photoIndex);
        } else {
            newIndices = this.state.selectedIndices.concat(photoIndex);
        }

        this.setState({
            selectedIndices: newIndices
        });
    };

    onEditAction = () => {
        if (this.props.onEditAction) {
            const photos = this.state.selectedIndices.map(index => this.props.photos[index]);
            this.props.onEditAction(photos);
        }

        this.resetSelection();
    };

    render() {
        // Default bootstrap value
        const COLS_TOTAL = 12;

        const totalRows = Math.floor(this.props.photos.length / COLS_TOTAL) + 1;
        let rows = [];

        // Draw table with {COLS_TOTAL} columns, filling rows from left to right
        for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
            let cols = [];
            const colsLeft = this.props.photos.length - rowIndex * COLS_TOTAL;

            for (let colIndex = 0; colIndex < colsLeft && colIndex < COLS_TOTAL; colIndex++) {
                const photoIndex = rowIndex * COLS_TOTAL + colIndex;
                const photoSelected = this.state.selectedIndices.includes(photoIndex);
                const photo = this.props.photos[photoIndex];

                cols.push(
                    <Col className="text-center" lg={2} md={2} sm={3} xs={6} key={totalRows + photoIndex}>
                        <Photo
                            href="#"
                            onClick={this.onPhotoPressed.bind(this, photoIndex)}
                            src={photo.image_url}
                            style={photoSelected ? selectedImageStyle : {}}
                            selected={photoSelected}
                        />
                    </Col>
                );
            }

            rows.push(
                <Row key={rowIndex}>{cols}</Row>
            );
        }

        if (!this.props.hasMore) {
            rows.push(
                <Row key={-1}>
                    <Col>
                        <h3>{this.props.finalText}</h3>
                    </Col>
                </Row>
            )
        }

        const headerInEditMode = this.state.selectedIndices.length > 0;

        return (
            <div>
                <TopPanel
                    height={this.props.headerHeight}
                    editMode={headerInEditMode}
                    normalElement={
                        <strong>{this.props.normalTitle}</strong>
                    }
                    editElementLeft={
                        <strong>X{this.state.selectedIndices.length} Selected</strong>
                    }
                    editElementRight={
                        <Button
                            bsStyle={this.props.editModeButtonStyle || "primary"}
                            onClick={this.onEditAction.bind(this)}
                        >
                            {this.props.editModeButtonText}
                        </Button>
                    }
                />

                <div style={{
                        textAlign: "center",
                        position: "fixed",
                        width: "100%",
                        height: `calc(100% - ${this.props.headerHeight + this.props.footerHeight}px)`,
                        overflow: "auto"
                    }}
                >
                    <InfiniteScroll
                        style={{textAlign: "center" }}
                        useWindow={false}
                        loadMore={this.props.onNextPage}
                        hasMore={this.props.hasMore}
                        loader={<h3>Loading...</h3>}
                        pageStart={0}
                    >
                        <Grid style={{paddingTop: 10}}>
                            {rows}
                        </Grid>
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}