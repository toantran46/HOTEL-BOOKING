import React from 'react';
import PropTypes from 'prop-types';

import "./filterItem.scss";
import { Input, Label } from 'reactstrap';

FilterItem.propTypes = {
    title: PropTypes.string,
    items: PropTypes.array,
};

FilterItem.defaultProps = {
    title: '',
    items: [{ content: '', num: 0 }]
};


function FilterItem(props) {

    const { title, items } = props;
    return (
        <div className='filter-item'>
            <p className='filter-item__title'>{title}</p>
            {
                items?.map((item, index) =>
                    <div className='filter-item__item' key={index}>
                        <Input
                            type="checkbox" />
                        {' '}
                        <Label>
                            {item.content}
                        </Label>
                        <span className='num'>{item.num}</span>

                    </div>
                )
            }
        </div>
    );
}

export default FilterItem;