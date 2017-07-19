import React  from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';

Photo.propTypes = {
    selected: PropTypes.bool
};

Photo.defaultProps = {
    selected: false
};

export default function Photo({src, style, selected, alt, ...props}) {
    return (
        <div>
            <a
                className="thumbnail"
                {...props}
                style={{
                    ...style,
                    minHeight: 140 // Height of returned image from 500px
                }}
            >
                <img alt={alt} src={src} />
            </a>
            {selected && (
                <span style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)"
                }}>
                    <Glyphicon glyph="ok"/>
                </span>
            )}
        </div>
    );
}



