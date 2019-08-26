import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { enquireScreen } from 'enquire-js';
import Header from './Header';
import Banner from './Banner';
import Page1 from './Page1';
import Page2 from './Page2';
import Footer from '../GlobalFooter';
import styles from './static/style.less';

let isMobile;

enquireScreen(b => {
  isMobile = !!b;
});

class Home extends React.PureComponent {
  state = {
    isMobile: !!isMobile,
  };
  componentDidMount() {
    enquireScreen(b => {
      this.setState({
        isMobile: !!b,
      });
    });
  }
  render() {
    return (
      <DocumentTitle title="MUNEW">
        <div className="munew-landing">
          <Header isMobile={this.state.isMobile} currentUser={this.props.currentUser}/>
          <div className="home-wrapper">
            <Banner isMobile={this.state.isMobile} />
            <Page1 isMobile={this.state.isMobile} />
            {/* <Page2 /> */}
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

Home.propTypes = {
  currentUser: PropTypes.object,
};

export default Home;
