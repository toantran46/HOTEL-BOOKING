import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import "./BreadcrumbStyled.scss";

BreadcrumbStyled.propTypes = {

};

function BreadcrumbStyled(props) {

    const { state } = useLocation();

    return (
        <Breadcrumb className='breadcrumb'>
            <BreadcrumbItem className='breadcrumb__item'>
                <Link to="/">Trang chủ</Link>
            </BreadcrumbItem>
            <BreadcrumbItem className='breadcrumb__item'>
                <Link to="/">Việt Nam</Link>
            </BreadcrumbItem>

            {
                state?.roadmap?.map((map, index) =>
                    <BreadcrumbItem key={index} className='breadcrumb__item'>
                        <Link to="/" state={{ roadmap: [map] }}>{map}</Link>
                    </BreadcrumbItem>
                )
            }
            <BreadcrumbItem className='breadcrumb__item'>
                <Link className='active' to="/">Kết quả tìm kiếm</Link>
            </BreadcrumbItem>
        </Breadcrumb>
    );
}

export default BreadcrumbStyled;