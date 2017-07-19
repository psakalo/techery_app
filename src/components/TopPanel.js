import React  from 'react';
import PropTypes from 'prop-types';
import { Well } from 'react-bootstrap';

const normalDivStyle = {
    width: "100%",
    height: "100%",
    display: "table-cell",
    verticalAlign: "middle"
};

const editDivStyle = {
    width: "50%",
    height: "100%",
    display: "table-cell",
    verticalAlign: "middle"
};

TopPanel.propTypes = {
    height: PropTypes.number.isRequired,
    editMode: PropTypes.bool,
    normalElement: PropTypes.element,
    editElementLeft: PropTypes.element,
    editElementRight: PropTypes.element
};

TopPanel.defaultProps = {
    height: 0,
    editMode: false,
    normalElement: null,
    editElementLeft: null,
    editElementRight: null
};

export default function TopPanel({height, editMode, normalElement, editElementLeft,
                                     editElementRight}) {
    const topPanelStyle = {
        backgroundColor: "red",
        top: 0,
        width: "100%",
        height: height,
        margin: 0,
        padding: 0,
        display: "table"
    };

    return (
        <Well style={topPanelStyle}>
            {editMode ? [
                <div className="text-left" style={editDivStyle} key={1}>
                    {editElementLeft}
                </div>,
                <div className="text-right" style={editDivStyle} key={2}>
                    {editElementRight}
                </div>
            ] : (
                <div className="text-center" style={normalDivStyle}>
                    {normalElement}
                </div>
            )}
        </Well>
    );
}



