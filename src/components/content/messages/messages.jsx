import React, {Component} from "react";
import {withFirebase} from '../../Firebase/index';
import AuthUserContext from "../session/context";
import {compose} from "recompose";
import {withAuthorization, withEmailVerification} from "../session";
import * as ROLES from "../../../utils/constants/roles";
import Preloader from "../preloader/preloader.jsx";

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

class MessagesBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: false,
      messages: [],
      limit: 5,
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onCreateMessage = this.onCreateMessage.bind(this);
    this.onRemoveMessage = this.onRemoveMessage.bind(this);
    this.onEditMessage = this.onEditMessage.bind(this);
    this.onNextPage = this.onNextPage.bind(this);
  }

  componentDidMount() {
    this.onListenForMessages();
  }

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  onListenForMessages() {
    this.setState({loading: true});

    this.props.firebase
      .messages()
      .orderByChild('createdAt')
      .limitToLast(this.state.limit)
      .on('value', snapshot => {
        const messageObject = snapshot.val();

        if (messageObject) {
          const messageList = Object.keys(messageObject).map(key => ({
            ...messageObject[key],
            uid: key,
          }));

          this.setState({
            messages: messageList,
            loading: false,
          });
        } else {
          this.setState({messages: null, loading: false});
        }
      });
  }

  onNextPage() {
    this.setState(state => ({ limit: state.limit + 5 }), this.onListenForMessages);
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
    const { uid, ...messageSnapshot } = message;

    this.props.firebase.message(message.uid).set({
      ...messageSnapshot,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  }

  render() {
    const {text, messages, loading} = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {!loading && messages &&
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
            }
            {loading && <Preloader/>}
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
        )
        }
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

const Messages = compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase,
)(MessagesBase);

export default Messages;
