import React, {Component} from 'react';
import {withFirebase} from '../../Firebase/context';
import Input from "../../shared/input/input.jsx";
import Button from "../../shared/button/button.jsx";

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    const {passwordOne} = this.state;

    this.props.firebase.doPasswordUpdate(passwordOne)
      .then(() => {
        console.log('upd success');
        this.setState({...INITIAL_STATE});
      })
      .catch(error => {
        this.setState({error});
      });

    event.preventDefault();
  };

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const {passwordOne, passwordTwo, error} = this.state;
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
      <div className="pass-change">
        <h1 className="pass-change__title">Смена пароля</h1>
        <form className="pass-change__form" onSubmit={this.onSubmit}>
          <Input name="passwordOne"
                 value={passwordOne}
                 onChange={this.onChange}
                 type="password"
                 placeholder="New Password"/>
          <Input name="passwordTwo"
                 value={passwordTwo}
                 onChange={this.onChange}
                 type="password"
                 placeholder="Confirm New Password"/>
          <Button disabled={isInvalid}
                  type="submit"
                  text="Change"/>
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

export default withFirebase(PasswordChangeForm);
