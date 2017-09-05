import {SalesforceClient} from "./service.jsx";
import Styles from "./root.less";

class TickerChanger extends React.Component {
    constructor(props) {
        super(props);
        this.toggleInput = this.toggleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.fetchAccountTicker = this.fetchAccountTicker.bind(this);
        this.state = {
            tickerStorage: '',
            inputShow: false,
            records: [],
            error: []
        }
    }

    componentDidMount() {
        let ticker = this.state.ticker;
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
            this.props.updateTicker(record);
        })
        .catch(error => {
            this.setState({ error: [...this.state.error, err] });
        })
        this.toggleInput();
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
            this.props.updateTicker(this.state.tickerStorage);
            this.toggleInput();
            this.setState({ tickerStorage: '' })
            //TODO: Handle an error state when ticker isn't valid
        }
    }

    //Account Ticker Selector Render
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

    render() {
        return (
          <div>
            {this.tickerInput()}
          </div>
        );
    }
}

export default TickerChanger;
