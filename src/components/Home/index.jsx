import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
import React from 'react';
import { enquireScreen } from 'enquire-js';
import Banner from './Banner';
import Footer from '../GlobalFooter';
import Header from './Header';
import Page1 from './Page1';
import Page2 from './Page2';
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
          <Header
            isMobile={this.state.isMobile}
            currentUser={this.props.currentUser}
            landing={this.props.landing}
          />
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
  landing: PropTypes.bool,
};

export default Home;
