import React from 'react';
import PropTypes from 'prop-types';


import "./Convenients.scss";
import { Col, Row } from 'reactstrap';
Convenients.propTypes = {
    convenients: PropTypes.array
};

Convenients.defaultProps = {
    convenients: []
};

function Convenients(props) {

    const { convenients } = props;

    return (
        <div className='convenients'>
            {
                convenients?.map((convenient, index) =>
                    <div className='convenients__convenient' key={index}>
                        <div dangerouslySetInnerHTML={{ __html: convenient.icon }}>
                        </div>
                        <div className='text'>
                            {convenient.text}
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Convenients;