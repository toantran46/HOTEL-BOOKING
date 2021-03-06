import "./filterItem.scss";
import PropTypes from 'prop-types'
import { Input, Label } from 'reactstrap';
import { Checkbox } from "antd";

FilterItem.propTypes = {
    title: PropTypes.string,
    items: PropTypes.array,
    type: PropTypes.string,
    onFilter: PropTypes.func,
    defaultChecked: PropTypes.array,
};

FilterItem.defaultProps = {
    title: '',
    items: [{ content: '', num: 0 }],
    type: '',
    onFilter: null,
    defaultChecked: [],
};


function FilterItem(props) {

    const { title, items, type, onFilter, defaultChecked } = props;

    const handleChange = e => {
        if (!onFilter) return;

        const { target: { value, checked } } = e;
        onFilter({ type, value, checked });
    }

    return (
        <div className='filter-item'>
            <p className='filter-item__title'>{title}</p>
            {
                items?.map((item, index) =>
                    <div className='filter-item__item' key={index}>
                        <Checkbox checked={defaultChecked.includes(item._id)} value={item._id} onChange={handleChange}>
                            {item.content}
                        </Checkbox>
                        <span className='num'>{item.num}</span>

                    </div>
                )
            }
        </div>
    );
}

export default FilterItem;