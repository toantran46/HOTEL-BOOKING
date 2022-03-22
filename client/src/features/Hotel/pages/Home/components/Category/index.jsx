import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Carousel from 'features/Hotel/components/Carousel';
import "./Category.scss";
Category.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    list: PropTypes.array,
    num: PropTypes.number
};

Category.defaultProps = {
    title: "",
    description: "",
    list: [],
    num: 6
};

function Category(props) {

    const { title, description, list, num } = props;

    console.log({ list });


    return (
        <div className='category'>
            <div className='title'>{title}</div>
            <span className='description'>{description}</span>
            <Carousel childrens={
                list.map((ob) =>
                    <Link to="/search" >
                        <div className='category__info'>
                            <img src={ob.image} alt={ob.name} />
                            <div className='text'>
                                <h6 className='name'>{ob.name}</h6>
                                {
                                    ob.total && <span className='total'>{ob.total}</span>
                                }
                                {
                                    ob.place && <div className='place'>{ob.place}</div>
                                }
                                {
                                    ob.score &&
                                    <div className='wrapper-info'>
                                        <div className='score'>{ob.score}</div>
                                        <div className='feedback-message'>{ob.feedBackMessage}</div>
                                        <div>{ob.numVoted}</div>
                                    </div>
                                }

                            </div>
                        </div>
                    </Link>)
            } showNum={num} />
        </div>
    );
}

export default Category;