import styled from 'styled-components';
import { Comments, PostContent, PostForm } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useLayoutEffect } from 'react';
import { useMatch, useParams } from 'react-router-dom';
import { loadPostAsync } from '../../redux/thunks';
import { selectError, selectIsLoading, selectPost } from '../../redux/selectors';
import { RESET_POST_DATA } from '../../redux/actions';
import { Error, PrivateContent } from '../../components';
import { ROLE } from '../../constants';

const PostContainer = ({ className }) => {
	const dispatch = useDispatch();
	const params = useParams();
	const post = useSelector(selectPost);
	const error = useSelector(selectError);
	const isLoading = useSelector(selectIsLoading);
	const isEditing = useMatch('/post/:id/edit');
	const isCreating = useMatch('/post');

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		const fetchPostData = async () => {
			if (isCreating) {
				return;
			}

			await dispatch(loadPostAsync(params.id));
		};

		fetchPostData();
	}, [dispatch, params.id, isCreating]);

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	return error ? (
		<Error error={error} />
	) : isCreating || isEditing ? (
		<PrivateContent access={[ROLE.ADMIN]}>
			<div className={className}>
				<PostForm post={post} />
			</div>
		</PrivateContent>
	) : (
		<div className={className}>
			<PostContent post={post} />
			<Comments comments={post.comments} postId={post.id} />
		</div>
	);
};

export const Post = styled(PostContainer)`
	margin: 40px 0;
	padding: 0 80px;
`;
