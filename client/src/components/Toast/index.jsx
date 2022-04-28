import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';

Toast.propTypes = {

};

function Toast(props) {
    return (

        <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    );
}

export default Toast;