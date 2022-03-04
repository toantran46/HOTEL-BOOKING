import React from 'react';
import PropTypes from 'prop-types';

import "./styles.scss";
import { FormGroup, Input, Label } from 'reactstrap';
FilterItem.propTypes = {

};

function FilterItem(props) {
    return (
        <div>
            <p>Sức khỏ & an toàn</p>
            <FormGroup check>
                <Input
                    type="checkbox"
                />
                {' '}
                <Label check>
                    Check me out
                </Label>
            </FormGroup>
        </div>
    );
}

export default FilterItem;