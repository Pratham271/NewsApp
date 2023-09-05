import React, { Component } from "react";

const NewsItem = (props) => {

    let { title, description, imageUrl, newsUrl, author, date,source, backupImageUrl,altImg } = props;
    return (
    <div>
        <div className="card">
        <div style={{display:"flex", justifyContent:"flex-end", position:"absolute", right:"0"}}>
        <span className="badge rounded-pill bg-danger" >
            {author}
        </span>
        </div>

        <img
            src={!imageUrl? "https://images.macrumors.com/t/4OJ3QqPbq2fRuYTkZAeylT7Wdew=/2250x/article-new/2022/06/magsafe-charger-orange.jpg": imageUrl}
            className="card-img-top"
            alt={altImg}
        />
        <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            {/* <p className="card-text">{description}...</p> */}
            <p className="card-text">
            <small className="text-danger">
                
                {date}
            </small>
            </p>
            <a
            rel="noreferrer"
            href={newsUrl}
            target="_blank"
            className="btn btn-sm btn-dark">
            Read More
            </a>
        </div>
        </div>
    </div>
    );

}

export default NewsItem;
