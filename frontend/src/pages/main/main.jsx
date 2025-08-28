import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { PAGINATION_LIMIT } from '../../constants';
import { Pagination, PostCard, Search } from './components';
import { debounce } from './utils';
import { request } from '../../utils';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const {
				data: { posts, lastPage },
			} = await request(`/api/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`);

			setPosts(posts);
			setLastPage(lastPage);
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	return (
		<div className={className}>
			<div className='posts-and-search'>
				<Search searchPhrase={searchPhrase} onChange={onSearch} />
				{posts.length ? (
					<div className='post-list'>
						{posts.map(({ id, title, imageUrl, publishedAt, comments }) => (
							<PostCard
								key={id}
								id={id}
								title={title}
								imageUrl={imageUrl}
								publishedAt={publishedAt}
								commentsCount={comments.length}
							/>
						))}
					</div>
				) : (
					<div className='posts-not-found'>Статьи не найдены</div>
				)}
			</div>
			{lastPage > 1 && <Pagination page={page} lastPage={lastPage} setPage={setPage} />}
		</div>
	);
};

export const Main = styled(MainContainer)`
	& .post-list {
		display: grid;
		grid-template-columns: repeat(3, 280px);
		gap: 40px;
		padding: 40px;
	}

	& .posts-not-found {
		text-align: center;
		font-size: 20px;
		margin-top: 40px;
	}
`;
