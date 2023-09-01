import PropTypes from 'prop-types';

export default function BtnContainer({children}){
    return<>
        <div className="btn-container">
            {children}
        </div>
    </>
}

BtnContainer.propTypes = {
    children: PropTypes.any.isRequired,
}

