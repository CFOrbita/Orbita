import React, {Component} from 'react';
import {withFirebase} from '../../Firebase/context';
import Input from "../../shared/input/input.jsx";
import Button from "../../shared/button/button.jsx";

const PasswordForgetPage = () => (
  <div className="pass-forget">
    <h1>Восстановление пароля</h1>
    <PasswordForgetForm/>
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    const {email} = this.state;

    this.props.firebase.doPasswordReset(email)
      .then(() => {

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
    const {email, error} = this.state;
    const isInvalid = email === '';

    return (
      <form className="pass-forget__form" onSubmit={this.onSubmit}>
        <Input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <Button disabled={isInvalid} type="submit" text='Reset'/>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}


export default PasswordForgetPage;
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export {PasswordForgetForm};
