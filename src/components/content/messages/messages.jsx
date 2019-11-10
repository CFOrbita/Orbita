import React, {Component} from "react";
import {withFirebase} from '../../Firebase/index';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withAuthorization, withEmailVerification} from "../session";
import * as ROLES from "../../../utils/constants/roles";
import Preloader from "../preloader/preloader.jsx";

const LIMIT = 5;

const MessageList = ({authUser, messages, onRemoveMessage, onEditMessage}) => {
  return <ul>
    {messages.length > 0 && messages.map(message => (
      <MessageItem key={message.uid}
                   authUser={authUser}
                   message={message}
                   onEditMessage={onEditMessage}
                   onRemoveMessage={onRemoveMessage}/>
    ))}
  </ul>
};

class MessageItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.message.text,
    };

    this.onToggleEditMode = this.onToggleEditMode.bind(this);
    this.onChangeEditText = this.onChangeEditText.bind(this);
    this.onSaveEditText = this.onSaveEditText.bind(this);
  }

  onToggleEditMode() {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.message.text,
    }));
  }

  onChangeEditText(event) {
    this.setState({editText: event.target.value});
  }

  onSaveEditText() {
    this.props.onEditMessage(this.props.message, this.state.editText);

    this.setState({editMode: false});
  }

  render() {
    const {authUser, message, onRemoveMessage} = this.props;
    const {editMode, editText} = this.state;

    return (
      <li>
        {editMode ?
          <input
            type="text"
            value={editText}
            onChange={this.onChangeEditText}
          />
          :
          <span>
            <strong>{message.username}</strong> {message.text}
            {message.editedAt && <span>(Edited)</span>}
          </span>
        }
        {authUser.uid === message.userId && (
          <span>
            {editMode ?
              <span>
                <button onClick={this.onSaveEditText}>Save</button>
                <button onClick={this.onToggleEditMode}>Reset</button>
              </span>
              :
              <button onClick={this.onToggleEditMode}>Edit</button>
            }
            {!editMode &&
            <button
              type="button"
              onClick={() => onRemoveMessage(message.uid)}
            >
              Delete
            </button>
            }
          </span>
        )}
      </li>
    );
  }
}

class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: false,
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onCreateMessage = this.onCreateMessage.bind(this);
    this.onRemoveMessage = this.onRemoveMessage.bind(this);
    this.onEditMessage = this.onEditMessage.bind(this);
    this.onNextPage = this.onNextPage.bind(this);
  }

  componentDidMount() {
    if (!this.props.messages.length) {
      this.setState({loading: true});
    }

    this.onListenForMessages();
  }

  componentDidUpdate(props) {
    if (props.limit !== this.props.limit) {
      this.onListenForMessages();
    }
  }

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  onListenForMessages() {
    this.setState({loading: true});

    this.props.firebase
      .messages()
      .orderByChild('createdAt')
      .limitToLast(this.props.limit)
      .on('value', snapshot => {
        this.props.onSetMessages(snapshot.val());

        this.setState({loading: false});
      });
  }

  onNextPage() {
    this.props.onSetMessagesLimit(this.props.limit + LIMIT);
  }

  onChangeText(event) {
    this.setState({text: event.target.value});
  }

  onCreateMessage(event, authUser) {
    event.preventDefault();

    this.props.firebase.messages().push({
      text: this.state.text,
      userId: authUser.uid,
      username: authUser.username,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({text: ''});
  }

  onRemoveMessage(uid) {
    this.props.firebase.message(uid).remove();
  }

  onEditMessage(message, text) {
    const {uid, ...messageSnapshot} = message;

    this.props.firebase.message(message.uid).set({
      ...messageSnapshot,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  }

  render() {
    const {messages, authUser} = this.props;
    const {text, loading} = this.state;

    return (
      <div>
        {!loading && messages &&
        <button type="button" onClick={this.onNextPage}>
          More
        </button>
        }
        {loading && <span>Loading...</span>}
        {messages ?
          <MessageList authUser={authUser}
                       messages={messages}
                       onEditMessage={this.onEditMessage}
                       onRemoveMessage={this.onRemoveMessage}/>
          :
          <div>There are no messages ...</div>
        }
        <form onSubmit={event => this.onCreateMessage(event, authUser)}>
          <input
            type="text"
            value={text}
            onChange={this.onChangeText}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  messages: Object.keys(state.messageState.messages || {}).map(
    key => ({
      ...state.messageState.messages[key],
      uid: key,
    }),
  ),
  limit: state.messageState.limit,
});

const mapDispatchToProps = dispatch => ({
  onSetMessages: messages =>
    dispatch({type: 'MESSAGES_SET', messages}),
  onSetMessagesLimit: limit =>
    dispatch({type: 'MESSAGES_LIMIT_SET', limit}),
});

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withFirebase,
  withEmailVerification,
  withAuthorization(condition),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Messages);
