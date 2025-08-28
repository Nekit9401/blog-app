import styled from 'styled-components';
import { H2 } from '../h2/h2';
import { PROP_TYPE } from '../../constants';

export const Error = ({ error }) =>
	error && (
		<Div>
			<H2>Ошибка</H2>
			<div>{error}</div>
		</Div>
	);

const Div = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

Error.propTypes = {
	error: PROP_TYPE.ERROR,
};
