import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import "./Pagination.scss";
PaginationStyled.propTypes = {
    totalPage: PropTypes.number,
    currentPage: PropTypes.number
};

PaginationStyled.defaultProps = {
    totalPage: 5,
    currentPage: 1
};

function PaginationStyled(props) {

    const { totalPage } = props;
    const [pageSize, setPageSize] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);

    React.useEffect(() => {
        const initPageSize = new Array(totalPage).fill();
        setPageSize(initPageSize);
    }, [totalPage])

    const handleChangePage = page => {
        setCurrentPage(page);
    }

    const handleNext = () => {
        setCurrentPage(prev => prev !== totalPage ? prev + 1 : prev);
    }

    const handlePrevious = () => {
        setCurrentPage(prev => prev !== 1 ? prev - 1 : prev);
    }

    return (
        <Pagination className='pagination'>
            <PaginationItem disabled={currentPage === 1} onClick={() => handlePrevious()}>
                <PaginationLink
                    previous
                />
            </PaginationItem>
            {
                pageSize?.map((page, index) =>
                    <PaginationItem active={(index + 1) === currentPage} key={index}>
                        <PaginationLink onClick={() => handleChangePage(index + 1)}  >
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                )
            }
            <PaginationItem disabled={currentPage === totalPage} onClick={() => handleNext()} >
                <PaginationLink
                    next
                />
            </PaginationItem>
        </Pagination>
    );
}

export default PaginationStyled;