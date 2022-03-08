import React from 'react';
import PropTypes from 'prop-types';

import './SignIn.scss';
import HeaderPartner from 'features/Auth/components/HeaderPartner';
import FormSign from 'features/Auth/components/FormSign';

SignIn.propTypes = {

};

function SignIn(props) {
    return (
        <div className='wrapper-signin' >
            <HeaderPartner />
            <FormSign />

        </div>
    );
}

export default SignIn;