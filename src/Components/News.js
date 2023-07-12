import React, { useEffect,useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News =(props)=> {
  const [articles,setArticles]=useState([])
  const [loading,setLoading]=useState(true)
  const [page,setPage]=useState(1)
  const [totalResults,setTotalResults]=useState(0)
  // document.title=`${capitalisedFirstCharacter(props.category)}-ReadNewsJet`  
 
  const capitalisedFirstCharacter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }

 
  const updateNews=async()=>{
    props.setProgress(10)
    const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    setLoading(true)

    props.setProgress(30)
    let data = await fetch(url);
    props.setProgress(50)
    let parseData = await data.json();
   
    props.setProgress(70)
    setArticles(parseData.articles)
    setTotalResults(parseData.totalResults)
    setLoading(false)
    
    props.setProgress(100)
  }
    useEffect(()=>{
      document.title=`${capitalisedFirstCharacter(props.category)}-ReadNewsJet` 
      updateNews();
      // eslint-disable-next-line
    },[])
  
  // async componentDidMount(){
 
  //   let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c692af2dda99481b97c33053267ac3a5&page=1&pageSize=${props.pageSize}`
  //   this.setState({loading:true})
  //   let data = await fetch(url);
  //   let parseData = await data.json();
  //   console.log(parseData);
  //   this.setState({ articles: parseData.articles ,
  //       totalResults:parseData.totalResults,
  //       loading:false });
  //   this.updateNews()
  // }

  const fetchMoreData =async () => {    
    let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
    setPage(page + 1)
    let data = await fetch(url);
    let parseData = await data.json();
    
    setArticles(articles.concat(parseData.articles))
    setTotalResults(parseData.totalResults)
    
  };
  

  //  const handlePrev=async()=> {
  //   console.log("cdm");
  //   let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c692af2dda99481b97c33053267ac3a5&page=${this.state.page-1}&pageSize=${props.pageSize}`
  //   this.setState({loading:true})
  //   let data = await fetch(url);
  //   let parseData = await data.json();
  //   console.log(parseData);
  //   this.setState({ 
  //       articles: parseData.articles,
  //       page:this.state.page-1,
  //       loading:false
  //    });
  //  setPage(page-1)
  //   updateNews()
  // }
  //  const handleNext=async()=> {
  //   console.log("cdm");
    
  //   let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c692af2dda99481b97c33053267ac3a5&page=${this.state.page+1}&pageSize=${props.pageSize}`
  //   this.setState({loading:true})
  //   let data = await fetch(url);
  //   let parseData = await data.json();
  //   console.log(parseData);
  //   this.setState({ 
  //       articles: parseData.articles,
  //       page:this.state.page+1,
  //       loading:false
  //    });
  //   setPage(page+1)
  //   .updateNews()
  // }



 

    return (
        <>
        <h1 className="text-center" style={{margin:"90px 0px 20px 0px"}}>ReadNewsJet-Top {capitalisedFirstCharacter(props.category)} Headlines</h1>
        {loading &&<Spinner/>}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row my-2">
          { articles.map((element) => {
            return (
              <div className="col-md-4 my-2" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : " "}
                  description={element.description ? element.description : " "}
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2023/05/google-bard-on-smartphone-feature.jpg"
                  }
                  newsUrl={element.url} author={element.author} date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
              
            );
          })}
          </div>
          </div>
          </InfiniteScroll>
          </>
          
        
        // <div className="container d-flex justify-content-between">
        // <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrev} >&larr; previous</button>
        // <button disabled={this.state.page+1 > Math.ceil( this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        // </div>
      
    );
  }


export default News;

News.defaultProps={
  pageSize:6,
  country:'in', 
  category:'general' 
}
News.propTypes = {
pageSize: PropTypes.number,
country: PropTypes.string,
category: PropTypes.string, 
}