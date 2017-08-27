// Copyright 2017 Quip

import Styles from "./root.less";

class Root extends React.Component {
    render() {
        return (
          <div className={Styles.hello}>
            <div className={Styles.newsInput}>
              <label>Add a Ticker Symbol</label>
              <input placeholder="Ticker"/>
            </div>
            <div className={Styles.newsResult}>
              <h4><a>News article title</a></h4>
              <span>Article Author</span>
              <span>Published</span>
            </div>
          </div>
        );
    }
}

quip.elements.initialize({
    initializationCallback: function(root) {
        ReactDOM.render(<Root/>, root);
    }
});
