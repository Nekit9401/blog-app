import { useEffect, useState } from 'react';
import styled from 'styled-components';

const FooterContainer = ({ className }) => {
	const [city, setCity] = useState('');
	const [temperature, setTemperature] = useState('');
	const [weather, setWeather] = useState('');

	useEffect(() => {
		const fetchWeather = async () => {
			try {
				const res = await fetch(
					'https://api.openweathermap.org/data/2.5/weather?q=Kazan&units=metric&lang=ru&appid=267af72421592298c4602ad161a367fd',
				);
				const weatherData = await res.json();
				const { name, main, weather } = weatherData;
				setCity(name);
				setTemperature(Math.round(main.temp));
				setWeather(weather[0].description);
			} catch (error) {
				console.log(error.message);
			}
		};

		fetchWeather();
	}, []);

	return (
		<div className={className}>
			<div>
				<div>Блог разработчика</div>
				<div>web@developer.ru</div>
			</div>
			<div>
				<div>
					{city}, {new Date().toLocaleString('ru', { day: 'numeric', month: 'long' })}
				</div>
				<div>
					{temperature} градуса, {weather}
				</div>
			</div>
		</div>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-weight: bold;
	width: 1000px;
	height: 120px;
	padding: 20px 40px;
	box-shadow: 0px 0px 17px #000;
	background-color: #fff;
`;
