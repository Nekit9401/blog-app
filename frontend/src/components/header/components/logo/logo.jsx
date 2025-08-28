import styled from 'styled-components';
import { Icon } from '../../../../components';
import { Link } from 'react-router-dom';

const LargeText = styled.div`
	font-size: 48px;
	font-weight: 500;
	line-height: 35px;
	margin-top: 15px;
`;

const SmallText = styled.div`
	font-size: 18px;
	font-weight: bold;
`;

const LogoContainer = ({ className }) => (
	<Link className={className} to='/'>
		<Icon iconId='fa-code' size={70} margin={'0 15px 0 0'} />
		<div>
			<LargeText>Блог</LargeText>
			<SmallText>веб-разработчика</SmallText>
		</div>
	</Link>
);

export const Logo = styled(LogoContainer)`
	display: flex;
`;
