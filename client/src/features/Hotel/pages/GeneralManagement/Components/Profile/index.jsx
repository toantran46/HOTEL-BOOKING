import React from 'react';
import PropTypes from 'prop-types';
import Title from '../Title';

Profile.propTypes = {

};

function Profile(props) {
    return (
        <div className='profile'>
            <div>
                <Title main='Thông tin cá nhân' sub='Cập nhật thông tin của bạn và tìm hiểu các thông tin này được sử dụng ra sao.' />

            </div>
        </div>
    );
}

export default Profile;