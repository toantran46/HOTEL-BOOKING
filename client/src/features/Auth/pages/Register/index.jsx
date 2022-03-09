import React from 'react';
import PropTypes from 'prop-types';

import HeaderPartner from 'features/Auth/components/HeaderPartner';
import FooterPartner from 'features/Auth/components/FooterPartner';

import './Register.scss';
import FormRegister from 'features/Auth/components/FormRegister';

Register.propTypes = {

};

function Register(props) {
    return (
        <div>
            <HeaderPartner />
            <FormRegister />

        </div>
    );
}

export default Register;