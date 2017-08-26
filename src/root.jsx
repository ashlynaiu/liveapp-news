// Copyright 2017 Quip

import Styles from "./root.less";

class Root extends React.Component {
    render() {
        return <div className={Styles.hello}>Hello, world!</div>;
    }
}

quip.elements.initialize({
    initializationCallback: function(root) {
        ReactDOM.render(<Root/>, root);
    }
});
