import React, { useState } from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Col, Row, Select, Typography } from 'antd'
import { 
	MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, 
	TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined 
} from '@ant-design/icons'

import { useGetCoinDetailsQuery, useGetCoinHistoryQuery } from '../services/cryptoApi'
import LineChart from './LineChart'
import Loading from './Loading';

const { Title, Text } = Typography;
const { Option } = Select;

const CoinSpecs = () => {

	const { id } = useParams();
	const [timePeriod, setTimePeriod] = useState('7d')
	const { data, isFetching } = useGetCoinDetailsQuery(id);
	const { data: coinHistory, isFetching: isHistoryFetching } = useGetCoinHistoryQuery({ id, timePeriod });
	const coinData = data?.data?.coin;

	if (isFetching || isHistoryFetching) return <Loading />;

	const timeScales = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y']

	const stats = [
		{ title: 'Price in USD', value: `$ ${Number(coinData?.price).toFixed(20).match(/^-?\d*\.?0*\d{0,2}/)[0]}`, icon: <DollarCircleOutlined />},
		{ title: 'Rank', value: coinData?.rank, icon: <NumberOutlined /> },
		{ title: '24h Volume', value: `$ ${coinData['24hVolume'] && millify(coinData['24hVolume'])}`, icon: <ThunderboltOutlined /> },
		{ title: 'Market Cap', value: `$ ${coinData?.marketCap && millify(coinData?.marketCap)}`, icon: <DollarCircleOutlined /> },
		{ title: 'ATH (daily avg.)', value: `$ ${Number(coinData?.allTimeHigh.price).toFixed(20).match(/^-?\d*\.?0*\d{0,2}/)[0]}`, icon: <TrophyOutlined /> }
	];

	const genericStats = [
		{ title: 'All markets', value: coinData?.numberOfMarkets, icon: <FundOutlined /> },
		{ title: 'All exchanges', value: coinData?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
		{ title: 'Has Confirmed Supply', value: coinData?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
		{ title: 'Total Supply', value: `${coinData?.supply?.total && millify(coinData?.supply?.total)} ${coinData?.symbol}`, icon: <ExclamationCircleOutlined /> },
		{ title: 'Circulating Supply', value: `${coinData?.supply?.circulating && millify(coinData?.supply?.circulating)} ${coinData?.symbol}`, icon: <ExclamationCircleOutlined /> },
	];

	return (
		<Col className='coin-detail-container'>
			<Col className='coin-heading-container'>
				<Title level={1} className='coin-name'>{coinData?.name} ({coinData?.symbol})</Title>
				<p>{coinData?.name} live statistics, market cap and supply. Price charting in various time scales.</p>
			</Col>
			<Select defaultValue='7d' className='select-timeperiod' placeholder='Select Time Period' onChange={(value) => setTimePeriod(value)}>
				{timeScales.map((date) => <Option key={date}>{date}</Option>)}

			</Select>
			<LineChart coinHistory={coinHistory} currentPrice={Number(coinData?.price).toFixed(20).match(/^-?\d*\.?0*\d{0,2}/)[0]} coinName={coinData?.name}/>
			<Col className='stats-container'>
				<Col className='coin-value-statistics'>
					<Col className='coin-value-statistics-heading'>
						<Title level={3} className='coin-details-heading'>Price Statistics</Title>
						<p>Various price related information for {coinData?.name}</p>
					</Col>
					{stats.map(({ icon, title, value }, i) => (
						<Col className='coin-stats' key={i}>
							<Col className='coin-stats-name'>
								<Text>{icon}</Text>
								<Text>{title}</Text>
							</Col>
							<Text className='stats'>{value}</Text>
						</Col>
					))}
				</Col>
				<Col className='other-stats-info'>
					<Col className='coin-value-statistics-heading'>
						<Title level={3} className='coin-details-heading'>Other Information</Title>
						<p>Non-price specific related information for {coinData?.name}</p>
					</Col>
					{genericStats.map(({ icon, title, value }, i) => (
						<Col className='coin-stats' key={i}>
							<Col className='coin-stats-name'>
								<Text>{icon}</Text>
								<Text>{title}</Text>
							</Col>
							<Text className='stats'>{value}</Text>
						</Col>
					))}
				</Col>
			</Col>
			<Col className='coin-desc-link'>
				<Row className='coin-desc'>
					<Title level={3} className='coin-details-heading'>What is {coinData?.name}?</Title>
					{HTMLReactParser(coinData?.description)}
				</Row>
				<Col className='coin-links'>
					<Title level={3} className='coin-details-heading'>{coinData?.name} Links</Title>
					{coinData?.links.map((link) => (
						<Row className='coin-link' key={link.name}>
							<Title level={5} className='link-name'>{link.type}</Title>
							<a href={link.url} target='_blank' rel='noreferrer'>{link.name}</a>
						</Row>
					))}
				</Col>
			</Col>
		</Col>
	)
}

export default CoinSpecs