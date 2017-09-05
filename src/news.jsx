import Styles from "./root.less";

class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: null,
            error: []
        }
    }

    componentDidMount() {
        let ticker = this.state.ticker;
        this.fetchNews(ticker);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.ticker !== nextProps.ticker) {
            this.fetchNews(nextProps.ticker);
        }
    }

    fetchNews(ticker) {
        const api_key = '60c438deac3f44ee98d47227f06193e1'
        const search_url = 'https://api.cognitive.microsoft.com/bing/v7.0/news/search'
        const fetchHeaders = {
            'Ocp-Apim-Subscription-Key': `${api_key}`
        }

        fetch(`${search_url}?q=$${ticker}+stock&sortby=date&count=3`, {headers: fetchHeaders}).then(response => response.json())
            .then(json => {
                console.log('setting state')
                this.setState({news: json.value})
            })
            .catch(error => {
                this.setState({error:[...this.state.error, error]})
            })
    }

    //Calculate the article's time since published
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
                <div>
                    <span>{article.provider[0].name} | {this.timeSince(article.datePublished)}
                    </span>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <span className={Styles.label}>Recent {this.state.ticker} News</span>
                {this.state.news ? this.tickerNews() : null}
            </div>
        )
    }
}

export default News;