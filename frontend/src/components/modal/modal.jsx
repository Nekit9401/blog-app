import styled from 'styled-components';
import { Button } from '../button/button';
import { useDispatch, useSelector } from 'react-redux';
import { selectModalIsOpen, selectModalText, selectModalOnConfirm } from '../../redux/selectors';
import { CLOSE_MODAL } from '../../redux/actions';

const ModalContainer = ({ className }) => {
	const isOpen = useSelector(selectModalIsOpen);
	const text = useSelector(selectModalText);
	const onConfirm = useSelector(selectModalOnConfirm);
	const dispatch = useDispatch();

	const onCancel = () => {
		dispatch(CLOSE_MODAL);
	};

	const onModalConfirm = async () => {
		await onConfirm();
		dispatch(CLOSE_MODAL);
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div className={className}>
			<div className='overlay'>
				<div className='modal-box'>
					<div className='box-content'>
						<h3>{text}</h3>
						<div className='buttons'>
							<Button width='120px' onClick={onModalConfirm}>
								Да
							</Button>
							<Button width='120px' onClick={onCancel}>
								Отмена
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	display: flex;
	position: fixed;
	inset: 0;
	z-index: 99;

	& h3 {
		text-align: center;
		margin: 0 0 40px 0;
	}

	& .overlay {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.7);
		width: 100%;
		height: 100%;
	}

	& .modal-box {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 400px;
		height: 200px;
		background-color: rgba(255, 255, 255, 0.9);
	}

	& .buttons {
		display: flex;
		gap: 20px;
	}
`;
