import Styles from "./root.less";

class TickerDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            close: null,
            open: null,
            ticker: '',
            priceChange: null,
            error: []
        }
    }

    componentWillMount() {
        let ticker = this.props.ticker;
        this.fetchDetails(ticker);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.ticker !== nextProps.ticker) {
            this.fetchDetails(nextProps.ticker);
        }
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

    render() {
        let priceChangeStatus = this.state.priceChange < 0 ? Styles.statusDown : Styles.statusUp;
        let priceChange = this.state.priceChange < 0 ? this.state.priceChange : `+ ${this.state.priceChange}`;
        return (
            <div className={Styles.details}>
                <h3>{this.props.ticker}</h3>
                <div className={`${priceChangeStatus} ${Styles.priceChange}`}>
                    {priceChange}
                </div>
            </div>
        )
    }
}

export default TickerDetails;