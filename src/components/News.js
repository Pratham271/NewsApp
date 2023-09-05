import React, {useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
// import { useEffect, useState } from 'react'

const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    
    const updateNews = async() =>{
        props.setProgress(10)
        let url = `http://127.0.0.1:5000/${props.category}`
        setLoading(true)
        let data = await fetch(url);        
        // props.setProgress(30)
        let parsedData = await data.json()
        // props.setProgress(70) 
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false)
        props.setProgress(100)
    }
    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - KrantiPatrika`;
        updateNews();
        // eslint-disable-next-line
    }, [])
    
    // handlePrevClick = async()=>{
    //     this.setState({page : this.state.page - 1})
    //     this.updateNews()
    // }

    // handleNextClick = async()=>{
    //     this.setState({page : this.state.page + 1})
    //     this.updateNews()
    // }

    const fetchMoreData = async() => {
        // this.setState({page:this.state.page+1})
        let url = `http://127.0.0.1:5000/${props.category}?page=${page+1}`
        setPage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json()
        if (parsedData.articles.length === 0) {
            // this.setState({loading: false, hasMore: false});
            setLoading(false);
            setHasMore(false);
            return;
        }
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    }

    return (
        <>
            <h2 className='text-center' style={{marginTop:"72px"}}>KrantiPatrika - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
            {/* {this.state.loading && <Spinner/>} */}
        {/* <InfiniteScroll 
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Spinner/>}
        > */}
        <div className="container">
            <div className="row my-2">
            {articles.map((element) => {
                return (
                <div className="col-md-4 my-2" key={element.href}>
                    <NewsItem
                    title={element.title ? element.title : ""}
                    // description={element.description ? element.description : ""}
                    imageUrl={element.ImageUrl}
                    backupImageUrl={element.backupUrl}
                    altImg = {element.altImg}
                    newsUrl={element.href}
                    author={element.editorUrl}
                    date={element.time}
                    // source={element.source.name}
                    />
                </div>
                )
            })}
        </div>
        </div>
        {/* </InfiniteScroll> */}
    
            {/* <div className="container d-flex justify-content-between">
                <button disabled = {this.state.page<=1} type= "button" className='btn btn-dark' onClick={this.handlePrevClick}> &larr; Previous</button>
                <button disabled = {this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)} type= "button" className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
            </div> */}
        </>
    )
    
}
News.defaultProps = {
    country : 'us',
    pageSize : 8,
    category : 'general'
}

News.propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string
}

export default News
