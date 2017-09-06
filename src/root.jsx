import {SalesforceClient} from "./service.jsx";
import News from "./news.jsx";
import TickerDetails from "./tickerDetails.jsx";
import TickerChanger from "./tickerChanger.jsx";
import Styles from "./root.less";

class Root extends React.Component {
    constructor(props) {
        super(props);
        this.updateTicker = this.updateTicker.bind(this);
        this.state = {
            ticker: 'CRM'
        }
    }

    updateTicker(newTicker) {
        this.setState({ticker: newTicker})
    }

    //Render APP
    render() {
        return (
          <div className={Styles.news}>
            <TickerDetails ticker={this.state.ticker}></TickerDetails>
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
            <News ticker={this.state.ticker}></News>
            <TickerChanger updateTicker={this.updateTicker}></TickerChanger>
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
