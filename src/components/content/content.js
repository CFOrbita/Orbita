import React, {Component} from "react";
import {
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import * as ROUTES from "../../utils/constants/routes";
import Trainings from "./trainings/trainings";
import FitEat from "./fiteat/fiteat";
import SignUpPage from './sign-up/sign-up.jsx';
import SignInPage from './sign-in/sign-in.jsx';
import PasswordForgetPage from './password-forget/password-forget.jsx';
import PasswordChangeForm from './password-change/password-change.jsx';
import AccountPage from './account/account.jsx';
import AdminPage from './admin/admin.jsx';
import {connect} from 'react-redux';
import Messages from './messages/messages.jsx'
import NoMatch from "./no-match/no-match.jsx";

class Content extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {authUser} = this.props;

    return (
      <main className="main">
        {
          !!authUser ?
            <p className="main__fake-text">Упех, вы зашли</p>
            :
            <p className="main__fake-text">
              Нужно {<Link to={ROUTES.SIGN_IN}>войти</Link>} в личный кабинет
              Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
            </p>
        }
        {/*<Messages/>*/}
        <Switch>
          <Route exact path={ROUTES.HOME}>
            <React.Fragment/>
          </Route>
          <Route path={ROUTES.TRAININGS} render={() => <Trainings/>}/>
          <Route path={ROUTES.FIT_EAT} component={FitEat}/>
          <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
          <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>
          <Route path={ROUTES.PASSWORD_CHANGE} component={PasswordChangeForm}/>
          <Route path={ROUTES.ACCOUNT} render={() => <AccountPage authUser={authUser}/>}/>
          <Route path={ROUTES.ADMIN} component={AdminPage}/>
          <Route path={ROUTES.NO_MATCH} component={NoMatch}/>
          <Route path="*">
            <Redirect to={ROUTES.NO_MATCH}/>
          </Route>
        </Switch>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Content);
