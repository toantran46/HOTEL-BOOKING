// import React from 'react';
// import PropTypes from 'prop-types';

<<<<<<< HEAD
// import "./styles.scss";
// // import { FormGroup, Input, Label } from 'reactstrap';
// FilterItem.propTypes = {

// };

// function FilterItem(props) {
//     return (
//         <div>
//             <p>Sức khỏ & an toàn</p>
//             <FormGroup check>
//                 <Input
//                     type="checkbox"
//                 />
//                 {' '}
//                 <Label check>
//                     Check me out
//                 </Label>
//             </FormGroup>
//         </div>
//     );
// }
=======
import "./filterItem.scss";
import { Input, Label } from 'reactstrap';

function FilterItem(props) {

    const { title, items, num } = props;
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
>>>>>>> vlinhjobnew

// export default FilterItem;