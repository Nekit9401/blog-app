import styled from 'styled-components';
import { Icon, Input } from '../../../../components';
import PropTypes from 'prop-types';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input
				value={searchPhrase}
				onChange={onChange}
				placeholder='Поиск...'
				margin='0'
				padding='10px 40px 10px 10px'
			/>
			<Icon iconId='fa-search' size={22} cursor={'default'} />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	position: relative;
	display: flex;
	width: 340px;
	height: 40px;
	margin: 40px auto 0;

	& div {
		position: absolute;
		right: 7px;
		top: 6px;
	}
`;

Search.propTypes = {
	searchPhrase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
