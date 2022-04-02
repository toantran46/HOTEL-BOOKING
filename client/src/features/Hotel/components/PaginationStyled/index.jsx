import React from 'react';
import PropTypes from 'prop-types';
import "./PaginationStyled.scss";
import { Pagination } from 'antd';

PaginationStyled.propTypes = {
    totalPage: PropTypes.number,
    currentPage: PropTypes.number,
    onChange: PropTypes.func,
    pageSize: PropTypes.number
};

PaginationStyled.defaultProps = {
    totalPage: 5,
    currentPage: 1,
    onChange: null,
    pageSize: 1
};

function PaginationStyled(props) {
    const { onChange, totalPage, currentPage, pageSize } = props;

    return (
        <Pagination
            onChange={(page) => onChange(page)}
            className='pagination'
            total={totalPage}
            pageSize={pageSize}
            current={currentPage} />
    );
}

export default PaginationStyled;