import PropTypes from 'prop-types';

export default function Button({className,onclick,value}){
    return<>
        <button className={className} onClick={onclick}>{value}</button>
    </>
}

Button.propTypes={
    className:PropTypes.any.isRequired,
    onclick:PropTypes.any.isRequired,
    value:PropTypes.any.isRequired,
}