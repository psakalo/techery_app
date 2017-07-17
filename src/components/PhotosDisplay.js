import React, { Component } from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class PhotosDisplay extends Component {
    onNext() {
        console.log(arguments);
    }

    render() {
        // Default bootstrap value
        const COLS_TOTAL = 12;

        const totalRows = Math.floor(this.props.photos.length / COLS_TOTAL) + 1;
        let rows = [];
        for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
            let cols = [];
            const colsLeft = this.props.photos.length - rowIndex * COLS_TOTAL;
            for (let colIndex = 0; colIndex < colsLeft && colIndex < COLS_TOTAL; colIndex++) {
                const photoIndex = rowIndex * COLS_TOTAL + colIndex;
                cols.push(
                    <Col lg={2} md={2} sm={3} xs={6} key={totalRows + photoIndex}>
                        <Image thumbnail src={this.props.photos[photoIndex].image_url} />
                    </Col>
                );
            }

            rows.push(
                <Row key={rowIndex}>{cols}</Row>
            );
        }

        return (
            <InfiniteScroll
                next={this.onNext.bind(this)}
                hasMore
            >
                <Grid>
                    {rows}
                </Grid>
            </InfiniteScroll>
        );
    }
}