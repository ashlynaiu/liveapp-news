// Copyright 2017 Quip
import {SalesforceClient}from "./service.jsx"
import Styles from "./root.less";

class Root extends React.Component {
    constructor(props) {
        super(props);
        this.toggleInput = this.toggleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.fetchAccountTicker = this.fetchAccountTicker.bind(this);
        this.state = {
            news: null,
            ticker: 'CRM',
            tickerStorage: '',
            close: null,
            open: null,
            priceChange: null,
            inputShow: false,
            records: [],
            error: []
        }
    }

    componentWillMount() {
        let ticker = this.state.ticker;
        this.fetchNews(ticker);
        this.fetchDetails(ticker);
        this.fetchAccounts();
    }

    fetchAccounts() {
        let sfClient = new SalesforceClient()
        sfClient.fetchRecordTypeData("Account")
        .then(response => {
            let records = response.records
            this.setState({records: records});
        })
        .catch(error => {
            this.setState({ error: [...this.state.error, err] });
        })
    }

    fetchAccountTicker(event) {
        let accountID = event.target.value;
        let sfClient = new SalesforceClient();
        sfClient.fetchRecord(accountID)
        .then(response => {
            let record = response.results[0].result.fields.TickerSymbol.value
            this.setState({ticker: record});
        })
        .catch(error => {
            this.setState({ error: [...this.state.error, err] });
        })
        this.toggleInput();
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
            this.setState({ error: [...this.state.error, err] });
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

    //Render the tickerNews
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

    //Input component functions
    toggleInput() {
        return this.state.inputShow ? this.setState({ inputShow : false }) : this.setState({ inputShow : true });
    }

    handleUpdate(event) {
        this.setState({tickerStorage: event.target.value})
    }

    handleSubmit() {
        if (this.state.tickerStorage) {
            this.setState({ticker: this.state.tickerStorage})
            this.fetchDetails(this.state.tickerStorage)
            this.fetchNews(this.state.tickerStorage)
            this.toggleInput();
            this.setState({ tickerStorage: '' })
            //TODO: Handle an error state when ticker isn't valid
        }
    }

    //Render the input
    tickerInput() {
        if(this.state.inputShow) {
            return (
                <div>
                    <div className={Styles.newsInput}>
                        <input placeholder="Change Ticker"
                        value={this.state.tickerStorage} onChange={this.handleUpdate} />
                        <button onClick={this.handleSubmit}>Change</button>
                    </div>
                    <a onClick={this.toggleInput}>Close</a>
                    <div className={Styles.selectAccount}>
                        {this.state.records ? this.selectAccountTicker() : null}
                    </div>
                </div>
            )
        }
        else {
            return ( <a onClick={this.toggleInput}>Change Ticker Symbol</a> );
        }
    }

    tickerDetails() {
        let priceChangeStatus = this.state.priceChange < 0 ? Styles.statusDown : Styles.statusUp;
        let priceChange = this.state.priceChange < 0 ? this.state.priceChange : `+ ${this.state.priceChange}`
        return (
            <div className={Styles.details}>
                <h3>{this.state.ticker}</h3>
                <div className={`${priceChangeStatus} ${Styles.priceChange}`}>
                    {priceChange}
                </div>
            </div>
        )
    }

    selectAccountTicker() {
        let options = () => {
            return ( this.state.records.map((record, index) => <option key={index} value={record.Id}>{record.Name}</option> ))
        }
        return (
            <div class="slds-form-element">
                <label class="slds-form-element__label" for="select-01">Select An Account</label>
                <div class="slds-form-element__control">
                    <div class="slds-select_container">
                        <select class="slds-select" id="select-01" onChange={this.fetchAccountTicker}>
                            <option>Select Option</option>
                            {options()}
                      </select>
                    </div>
                </div>
            </div>
        )
    }

    //Render APP
    render() {
        return (
          <div className={Styles.news}>
            {this.state.priceChange ? this.tickerDetails() : null}
            <div className={Styles.myBook}>
                <div className={Styles.leftColumn}>
                    <span className={Styles.label}>Clients Affected</span>
                    <h4>60%</h4>
                </div>
                <div className={Styles.rightColumn}>
                    <span className={Styles.label}>Total AUM</span>
                    <h4>$2,130,000</h4>
                </div>
            </div>
            <span className={Styles.label}>Recent {this.state.ticker} News</span>
            {this.state.news ? this.tickerNews() : null}
            {this.tickerInput()}
          </div>
        );
    }
}

quip.elements.initialize({
    initializationCallback: function(root) {
        var rootRecord = quip.elements.getRootRecord();
        ReactDOM.render(<Root/>, root);
    }
});
