import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'
import millify from 'millify'
import Loading from './Loading';

import { useGetCoinsQuery } from '../services/cryptoApi'

const Coins = ({ simplified }) => {
	const count = simplified ? 12 : 100;
	const { data: coinList, isFetching } = useGetCoinsQuery(count);
	const [coins, setCoins] = useState(coinList?.data?.coins);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		setCoins(coinList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase())));
	}, [coinList, searchTerm]);

	if (isFetching) return <Loading />;

	return (
		<>
		{ !simplified && (
			<div className='search-coin'>
				<Input placeholder='Search...' onChange={(e) => setSearchTerm(e.target.value)}></Input>
			</div>
		)}
		<Row gutter={[32, 32]} className='coin-card-container'>
			{coins?.map((currency) => (
				<Col xs={24} sm={12} lg={6} className='coin-card' key={currency.uuid}>
					<Link to={`/coin/${currency.uuid}`}>
						<Card title={`${currency.rank}. ${currency.name}`} extra={<img className='coin-image' src={currency.iconUrl} alt="coin"/>} hoverable >
							<p>Price: {Number(currency.price).toFixed(20).match(/^-?\d*\.?0*\d{0,2}/)[0]}</p>
							<p>Market Cap: {millify(currency.marketCap)}</p>
							<p style={{color: currency.change > 0 ? 'green' : (currency.change < 0 ? 'red' : 'gray')}}>{currency.change}%</p>
						</Card>
					</Link>
				</Col>
			))}
		</Row>
		</>
	)
}

export default Coins