import styled from 'styled-components';
import { H2 } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { useNavigate } from 'react-router-dom';
import { PROP_TYPE } from '../../../../constants';

const PostContentContainer = ({ className, post }) => {
	const { id, title, imageUrl, content, publishedAt } = post;
	const navigate = useNavigate();

	const onEdit = () => {
		navigate(`/post/${id}/edit`);
	};

	return (
		<div className={className}>
			{imageUrl && <img src={imageUrl} alt={title} />}
			<H2>{title}</H2>
			<SpecialPanel
				postId={id}
				publishedAt={publishedAt}
				margin={'-20px 0 20px'}
				iconEditButton={'fa-pencil-square-o'}
				onEditButton={onEdit}
			/>
			<div className='post-text'>{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	& img {
		float: left;
		margin: 0 20px 16px 0;
	}

	& .post-text {
		font-size: 18px;
		white-space: pre-line;
	}
`;

PostContent.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
