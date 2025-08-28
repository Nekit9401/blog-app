import styled from 'styled-components';
import PropTypes from 'prop-types';

const IconContainer = ({ className, iconId, ...props }) => (
	<div className={className} {...props}>
		<i className={`fa ${iconId}`} aria-hidden='true'></i>
	</div>
);

export const Icon = styled(IconContainer)`
	font-size: ${({ size = 25 }) => size}px;
	margin: ${({ margin = 0 }) => margin};
	cursor: ${({ cursor }) => (cursor ? cursor : 'pointer')};
	color: ${({ disabled }) => (disabled ? '#ccc' : '#000')};
`;

Icon.propTypes = {
	iconId: PropTypes.string.isRequired,
};
