import React from 'react';
import PropTypes from 'prop-types';

import HeaderPartner from 'features/Auth/components/HeaderPartner';
import FooterPartner from 'features/Auth/components/FooterPartner';

import './RegisterUser.scss';
import FormRegisterUser from 'features/Auth/components/FormRegisterUser';

RegisterUser.propTypes = {

};

function RegisterUser(props) {
    return (
        <div>
            <HeaderPartner />
            <FormRegisterUser />

        </div>
    );
}

export default RegisterUser;