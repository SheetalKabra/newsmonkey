import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const capitalizeFirstLetter = (stringstr)=>{
        return stringstr.charAt(0).toUpperCase() + stringstr.slice(1);
    }
    const[articles, setArticles] = useState([])
    const[loading, setLoading] = useState(false)
    const[page, setPage] = useState(1)
    const[totalResults, setTotalResults] = useState(0);
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;

    const updateNews = async()=>{
        props.setProgress(10);
        setLoading(true);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(50);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }
    const fetchMoreData = async()=>{
        setPage(page+1);
        setLoading(true);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults)
        setLoading(false)
    }

    useEffect(() => {
        updateNews();
    }, [])

    const handlePrevious = async()=>{
        setPage(page-1)
        updateNews();
    }
    const handleNext = async()=>{
        setPage(page+1)
        updateNews();
    }

    return (
        <>
            <h2 className="text-center" style={{width:'35px 0px'}}>NewsMonkey - Top Headlines from {capitalizeFirstLetter(props.category)}</h2>
            {/* {loading && <Spinner/>} */}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner/>}
            >
            <div className="container">
                <div className="row">
                    {articles.map((element)=>{
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} 
                            imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedDate={element.publishedAt} source={element.source.name}/>
                        </div>
                    })}
                </div>
            </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                <button disabled={page <=1} type="button" className="btn btn-dark" onClick={handlePrevious}>&laquo; Previous</button>
                <button disabled={page+1 > Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={handleNext}>Next &raquo;</button>
            </div> */}
            </>
    )
}

export default News
News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
};
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
};
