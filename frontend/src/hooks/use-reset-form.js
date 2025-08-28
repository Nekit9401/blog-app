import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectWasLogout } from '../redux/selectors';
import { resetLogout } from '../redux/actions';

export const useResetForm = (reset) => {
	const dispatch = useDispatch();
	const wasLogout = useSelector(selectWasLogout);
	const previousWasLogout = useRef(wasLogout);

	useEffect(() => {
		if (previousWasLogout.current !== wasLogout) {
			reset();

			dispatch(resetLogout);
		}

		previousWasLogout.current = wasLogout;
	}, [dispatch, reset, wasLogout]);
};
