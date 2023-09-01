import PropTypes from 'prop-types';

export default function Display({value}){
    return<>
        <div className="display">{value}</div>
    </>

}

Display.propTypes={
    value:PropTypes.any.isRequired
}