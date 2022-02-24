import React, { useState } from 'react'
import { Select, Row, Col, Typography, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetNewsQuery } from '../services/newsApi';
import { useGetCoinsQuery } from '../services/cryptoApi';

import Loading from './Loading';

const { Text, Title } = Typography;
const { Option } = Select;

const noThumbnailImage = 'https://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

const News = ({ simplified }) => {
	const [newsCategory, setNewsCategory] = useState('cryptocurrency')
	const { data: news } = useGetNewsQuery({ newsCategory, count: simplified ? 6 : 18 });
	const { data: coinList } = useGetCoinsQuery(100);

	if (!news?.value) return <Loading />;
	
	return (
		<Row gutter={[24, 24]}>
			{ !simplified && (
				<Col span={24}>
					<Select 
						showSearch 
						className='select-news'
						placeholder='Search category'
						optionFilterProp='children'
						onChange={(value) => setNewsCategory(value)}
						filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
					>
						<Option value="Cryptocurrency" key='0'>Cryptocurrency</Option>
						{coinList?.data?.coins.map((coin, i) => <Option value={coin.name} key={i + 1}>{coin.name}</Option>)}
					</Select>
				</Col>
			)}
			{news.value.map((article, i) => (
				<Col xs={24} sm={12} lg={8} key={i}>
					<Card className='news-card' hoverable >
						<a href={article.url} target='_blank' rel="noreferrer">
							<div className='news-image-container'>
								<Title className='news-title' level={4}>{ article.name.length > 60 ? `${article.name.substring(0, 60)}...` : article.name }</Title>
								<img style={{maxHeight: '100px', maxWidth: '100px'}} src={ article?.image?.thumbnail?.contentUrl || noThumbnailImage } alt="news" />
							</div>
							<p>
								{ article.description.length > 100 ? `${article.description.substring(0, 100)}...` : article.description }
							</p>
							<div className="provider-container">
								<div>
									<Avatar src={ article.provider[0]?.image?.thumbnail?.contentUrl || noThumbnailImage } alt="news" />
									<Text className='provider-name'>{article.provider[0]?.name}</Text>
								</div>
								<Text>{moment(article.datePublished).startOf('ss').fromNow()}</Text>
							</div>
						</a>
					</Card>
				</Col>
			))}
		</Row>
	)
}

export default News