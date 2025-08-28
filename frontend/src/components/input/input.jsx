import styled from 'styled-components';

const InputContainer = ({ className, ...props }) => {
	return <input className={className} {...props} />;
};

export const Input = styled(InputContainer)`
	height: 40px;
	width: ${({ width = '100%' }) => width};
	margin: ${({ margin = '0 0 10px' }) => margin};
	padding: ${({ padding = '10px' }) => padding};
	border: ${({ border = '1px solid #797979a7' }) => border};
	outline: none;
	border-radius: 4px;
	font-size: 18px;
`;
