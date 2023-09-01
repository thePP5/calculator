import PropTypes from 'prop-types';
import './Container'

export default function Container({children}){ //Container holds all the components as children
    return<>
        <div className='container'>
            {children}
        </div>
    </>
}


Container.propTypes = {
    children: PropTypes.any.isRequired,
};

