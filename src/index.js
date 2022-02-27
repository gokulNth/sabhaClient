import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/HomePage';
import Detail from './Pages/DetailPage';
import './css/spectre.css';
import './index.css';
import './css/spectre-icons.css';
import ElectionPage from './Pages/ElectionPage';
import { ToastComp } from './Components/UtilComp';
import { throttle } from './Utils/Constant';
import { OfflineVotes, OnlineVotes } from './Components/VotingMode';
import LoginForm from './Forms/LoginForm';
import VoteCount from './Pages/VoteCount';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showToast: false,
      showAlert: false,
      showSuccess: false,
      toastMessage: null,
      toastImage: null,
      additionalIfo: null,
    };
    this.showToastFn = this.showToastFn.bind(this);
    this.hideToastFn = this.hideToastFn.bind(this);
  }
  showToastFn(component, mode) {
    const { toastMessage, toastImage, additionalIfo } = component;
    this.setState({ toastMessage, toastImage, additionalIfo });
    if (mode === 'success') {
      this.setState({ showSuccess: true });
      throttle(this.hideToastFn, 2500);
    } else if (mode === 'error') {
      this.setState({ showAlert: true });
    } else {
      this.setState({ showToast: true });
      throttle(this.hideToastFn, 2500);
    }
  }
  hideToastFn() {
    this.setState({ showToast: false, showAlert: false, showSuccess: false });
  }
  render() {
    const {
      showToast,
      showAlert,
      showSuccess,
      toastMessage,
      toastImage,
      additionalIfo,
    } = this.state;
    const mode = showAlert ? 'error' : showSuccess ? 'success' : undefined;
    return (
      <BrowserRouter>
        <Routes>
          <Route exact element={<Home />} path='/' />
          <Route
            exact
            element={<LoginForm showToastFn={this.showToastFn} />}
            path='/login'
          />
          <Route exact element={<VoteCount />} path='/votecount' />
          <Route
            exact
            element={<ElectionPage showToastFn={this.showToastFn} />}
            path='/election'
          />
          <Route
            exact
            element={<OnlineVotes showToastFn={this.showToastFn} />}
            path='/election/online'
          />
          <Route
            exact
            element={<OfflineVotes showToastFn={this.showToastFn} />}
            path='/election/offline'
          />
          <Route exact element={<Detail />} path='/:mid' />
        </Routes>
        {(showToast || showAlert || showSuccess) && (
          <ToastComp
            mode={mode}
            toastMessage={toastMessage}
            toastImage={toastImage}
            additionalIfo={additionalIfo}
            hideToastFn={this.hideToastFn}
          />
        )}
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
