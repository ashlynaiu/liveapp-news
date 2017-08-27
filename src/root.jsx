// Copyright 2017 Quip
//import Service from "./service.jsx"
import Styles from "./root.less";

class Root extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            news: null,
            ticker: 'CRM',
            close: null,
            open: null,
            priceChange: null,
            error: []
        }
    }

    componentWillMount() {
        let ticker = this.state.ticker;
        this.fetchNews(ticker);
        this.fetchDetails(ticker);
    }

    fetchDetails(ticker) {
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=AU2Q75AJK6FBD0KQ`).then(response => response.json())
        .then(json => {
            //Clean array
            let cleanArray = Object.keys(json['Time Series (Daily)']).map((key) => { return json['Time Series (Daily)'][key]; });
            //Save only today's and yesterday's details
            let todayDetails = cleanArray[0];
            let yesterdayDetails = cleanArray[1];

            this.setState({
                close: todayDetails["4. close"],
                open: todayDetails["1. open"],
                priceChange: (todayDetails["4. close"] - yesterdayDetails["4. close"]).toFixed(2)
            })
        })
        .catch(err => {
            this.setState({error:[...this.state.error, error]})
        })
    }

    fetchNews(ticker) {
        const api_key = '60c438deac3f44ee98d47227f06193e1'
        const search_url = 'https://api.cognitive.microsoft.com/bing/v7.0/news/search'
        const fetchHeaders = {
            'Ocp-Apim-Subscription-Key': `${api_key}`
        }

        fetch(`${search_url}?q=$${ticker}+stock&sortby=date&count=3`, {headers: fetchHeaders}).then(response => response.json())
            .then(json => {
                this.setState({news: json.value})
                console.log(this.state.news)
            })
            .catch(error => {
                this.setState({error:[...this.state.error, error]})
            })
    }

    timeSince(date) {
        let seconds = Math.floor((new Date() - new Date(date)) / 1000)

        let interval = Math.floor(seconds / 31536000)
        if (interval >= 1) {
            if (interval == 1){
                return interval + ' year ago'
            }
            return interval + ' years ago'
        }

        interval = Math.floor(seconds / 2592000)
        if (interval >= 1) {
            if (interval == 1){
                return interval + ' month ago'
            }
            return interval + ' months ago'
        }

        interval = Math.floor(seconds / 86400)
        if (interval >= 1) {
            if (interval == 1){
                return interval + ' day ago'
            }
            return interval + ' days ago'
        }

        interval = Math.floor(seconds / 3600)

        if (interval >= 1) {
            if (interval == 1){
                return interval + ' hour ago'
            }
            return interval + ' hours ago'
        }

        interval = Math.floor(seconds / 60)

        if (interval >= 1) {
            if (interval == 1){
                return interval + ' minute ago'
            }
            return interval + ' minutes ago'
        }

        interval = Math.floor(seconds)

        if (interval == 1){
            return interval + ' second ago'
        }

        return interval + ' seconds ago'
    }

    tickerNews() {
        return this.state.news.map((article, index) =>
            <div className={Styles.newsContainer} key={index}>
                <h4 className={Styles.truncate}>
                    <a href={article.url} target="_blank">{article.name}</a>
                </h4>
                <div>{article.provider[0].name} | {this.timeSince(article.datePublished)}</div>
            </div>
        )
    }

    render() {

        return (
          <div className={Styles.news}>
            <div className={Styles.newsInput}>
              <input placeholder="Add Ticker"/>
              <button>Submit</button>
            </div>
            {this.state.news ? this.tickerNews() : null}
          </div>
        );
    }
}

quip.elements.initialize({
    initializationCallback: function(root) {
        ReactDOM.render(<Root/>, root);
    }
});
