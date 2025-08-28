import styled from 'styled-components';
import { Input } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { savePostAsync } from '../../../../redux/thunks';
import { useNavigate } from 'react-router-dom';
import { PROP_TYPE } from '../../../../constants';

const PostFormContainer = ({ className, post: { id, title, imageUrl, content, publishedAt } }) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl || '');
	const [titleValue, setTitleValue] = useState(title || '');
	const [contentValue, setContentValue] = useState(content || '');

	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setTitleValue(title);
		setContentValue(content);
	}, [imageUrl, title, content]);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSave = async () => {
		const savedPostData = await dispatch(
			savePostAsync(id, { imageUrl: imageUrlValue, title: titleValue, content: contentValue }),
		);

		navigate(`/post/${savedPostData.id}`);
	};

	const imageUrlOnChange = ({ target }) => setImageUrlValue(target.value);
	const titleOnChange = ({ target }) => setTitleValue(target.value);
	const contentOnChange = ({ target }) => setContentValue(target.value);

	return (
		<div className={className}>
			<Input value={imageUrlValue} placeholder='Ссылка на изображение...' onChange={imageUrlOnChange} />
			<Input value={titleValue} placeholder='Заголовок...' onChange={titleOnChange} />
			<SpecialPanel
				postId={id}
				publishedAt={publishedAt}
				margin={'10px 0 20px'}
				iconEditButton={'fa-floppy-o'}
				onEditButton={onSave}
			/>

			<textarea value={contentValue} className='post-text' onChange={contentOnChange} />
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	& img {
		float: left;
		margin: 0 20px 16px 0;
	}

	& .post-text {
		font-size: 18px;
		white-space: pre-line;
		width: 100%;
		min-height: 400px;
		resize: vertical;
		font-family: inherit;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
`;

PostForm.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
