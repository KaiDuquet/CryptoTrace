import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LineElement, PointElement, LinearScale, Title as TitleJS } from 'chart.js'
import { Col, Row, Typography } from 'antd'

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
	const coinPrices = [];
	const coinTimestamps = [];
	
	ChartJS.register(LineElement, PointElement, LinearScale, TitleJS, CategoryScale);

	for (let i = coinHistory?.data?.history?.length - 1; i >= 0; i--) {
		const history = coinHistory?.data?.history[i];
		coinPrices.push(history.price);
		coinTimestamps.push(new Date(history.timestamp * 1000).toLocaleDateString());
	}


	const data = {
		labels: coinTimestamps,
		datasets: [
			{
				label: 'Price In USD',
				data: coinPrices,
				fill: false,
				backgroundColor: '#0071bd',
				borderColor: '#0071bd',
			},
		],
	};

	const options = {
		scales: {
			yAxis: {
				ticks: {
					beginAtZero: true,
				},
			},
		},
	};

	return (
		<>
		<Row className='chart-header'>
			<Title level={2} className='chart-title'>{coinName} Price Chart</Title>
			<Col className='price-container'>
				<Title 
					level={5}
					className='price-change'
					style={{color: coinHistory?.data?.change > 0 ? 'green' : (coinHistory?.data?.change < 0 ? 'red' : 'gray')}}
					>
					{coinHistory?.data?.change}%
				</Title>
				<Title level={5} className='current-price'>Current {coinName} Price: $ {currentPrice}</Title>
			</Col>
		</Row>
		<Line data={data} options={options}/>
		</>
	)
}

export default LineChart