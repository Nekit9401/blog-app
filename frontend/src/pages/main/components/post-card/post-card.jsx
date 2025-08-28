import styled from 'styled-components';
import { Icon } from '../../../../components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PostCardContainer = ({ className, id, title, imageUrl, publishedAt, commentsCount }) => {
	return (
		<div className={className}>
			<Link to={`/post/${id}`}>
				<img src={imageUrl} alt={title} />
				<div className='post-card-footer'>
					<h4>{title}</h4>
					<div className='post-card-info'>
						<div className='published-at'>
							{publishedAt && (
								<Icon iconId='fa-calendar-o' size={20} margin={'0 10px 0 0'} cursor={'default'} />
							)}
							{publishedAt}
						</div>
						<div className='comments-count'>
							<Icon iconId='fa-comment-o' size={20} margin={'0 10px 0 0'} cursor={'default'} />
							{commentsCount}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const PostCard = styled(PostCardContainer)`
	display: flex;
	flex-direction: column;
	width: 280px;
	border: 1px solid #000;

	& img {
		display: block;
		width: 100%;
	}

	& h4 {
		margin: 0 0 5px;
	}

	& .post-card-footer {
		border-top: 1px solid #000;
		padding: 5px;
	}

	& .post-card-info {
		display: flex;
		justify-content: space-between;
	}
	& .published-at {
		display: flex;
	}
	& .comments-count {
		display: flex;
	}
`;

PostCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	commentsCount: PropTypes.number.isRequired,
};
