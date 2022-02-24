import React from 'react'

import { Typography, Row, Col, Statistic } from 'antd'
import { Link } from 'react-router-dom'
import { useGetGlobalStatsQuery } from '../services/cryptoApi';
import { Coins, News } from '../components'
import Loading from './Loading';

const { Title } = Typography;

const Homepage = () => {

	const { data, isFetching } = useGetGlobalStatsQuery();

	if (isFetching) return <Loading />

	const globalStats = data?.data;

	return (
		<>
			<Title level={2} className='heading'>Global Crypto Stats</Title>
			<Row>
				<Col span={12}><Statistic title='Total Market Cap' value={globalStats.totalMarketCap}/></Col>
				<Col span={12}><Statistic title='Total 24h Volume' value={globalStats.total24hVolume}/></Col>
				<Col span={12}><Statistic title='All Cryptocurrencies' value={globalStats.totalCoins}/></Col>
				<Col span={12}><Statistic title='All Exchanges' value={globalStats.totalExchanges}/></Col>
				<Col span={12}><Statistic title='All Markets' value={globalStats.totalMarkets}/></Col>
			</Row>
			<div className='home-heading-container'>
				<Title level={2} className='home-title'>Top 12 Coins</Title>
				<Title level={3} className='show-more'><Link to='/coins'>Show more</Link></Title>
			</div>
			<Coins simplified />
			<div className='home-heading-container'>
				<Title level={2} className='home-title'>Latest News</Title>
				<Title level={3} className='show-more'><Link to='/news'>Show more</Link></Title>
			</div>
			<News simplified />
		</> 
	)
}

export default Homepage