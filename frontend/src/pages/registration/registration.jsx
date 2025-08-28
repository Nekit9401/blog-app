import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useState } from 'react';
import styled from 'styled-components';
import { AuthFormError, Input, Button, H2 } from '../../components';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUSer } from '../../redux/actions';
import { selectUserRole } from '../../redux/selectors';
import { ROLE } from '../../constants';
import { useResetForm } from '../../hooks';
import { request } from '../../utils';

const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните Логин')
		.matches(/^\w+$/, 'Неверно заполнен Логин. Допускаются только буквы и цифры')
		.min(3, 'Неверно заполнен Логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен Логин. Максимум 15 символов'),

	password: yup
		.string()
		.required('Заполните Пароль')
		.matches(/^[\w#%]+$/, 'Неверно заполнен Пароль. Допускаются буквы, цифры и знаки # %')
		.min(6, 'Неверно заполнен Пароль. Минимум 6 символа')
		.max(20, 'Неверно заполнен Пароль. Максимум 20 символов'),

	passcheck: yup
		.string()
		.required('Заполните повтор Пароля')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

const RegistrationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = async ({ login, password }) => {
		const response = await request('/api/register', 'POST', { login, password });
		const { error, user } = response;
		if (error) {
			setServerError(`Ошибка запроса: ${error}`);
			return;
		}

		dispatch(setUSer(user));
		sessionStorage.setItem('userData', JSON.stringify(user));
	};

	const formError = errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to='/' />;
	}

	return (
		<div className={className}>
			<H2>Регистрация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type='text'
					placeholder='Логин...'
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type='password'
					placeholder='Пароль...'
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type='password'
					placeholder='Повторите пароль...'
					{...register('passcheck', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type='submit' disabled={!!formError}>
					Зарегистрироваться
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
