import PropTypes from 'prop-types';

const LocalError = ({ error }) => {
  if (error) {
    return <div className="text-danger">{error}</div>;
  }
  return <div />;
};

export default LocalError;

LocalError.propTypes = {
  error: PropTypes.string.isRequired,
};
