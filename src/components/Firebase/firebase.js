import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyAQGtssL0EuSWljNUA1U7rDzbd4v9cY9CY",
  authDomain: "orbita-fb594.firebaseapp.com",
  databaseURL: "https://orbita-fb594.firebaseio.com",
  projectId: "orbita-fb594",
  storageBucket: "",
  messagingSenderId: "104716026364",
  appId: "1:104716026364:web:4b07ff41c01b31b4"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
    this.serverValue = app.database.ServerValue;
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    this.doCreateUserWithEmailAndPassword = this.doCreateUserWithEmailAndPassword.bind(this);
    this.doSignInWithEmailAndPassword = this.doSignInWithEmailAndPassword.bind(this);
    this.doSignInWithGoogle = this.doSignInWithGoogle.bind(this);
    this.doSignOut = this.doSignOut.bind(this);
    this.doPasswordReset = this.doPasswordReset.bind(this);
    this.doPasswordUpdate = this.doPasswordUpdate.bind(this);
    this.onAuthUserListener = this.onAuthUserListener.bind(this);
    this.user = this.user.bind(this);
    this.users = this.users.bind(this);
    this.message = this.message.bind(this);
    this.messages = this.messages.bind(this);
    this.training = this.training.bind(this);
    this.trainings = this.trainings.bind(this);
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  doSignInWithEmailAndPassword(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  doSignInWithGoogle() {
    return this.auth.signInWithPopup(this.googleProvider);
  }

  doSignOut() {
    return this.auth.signOut();
  }

  doPasswordReset(email) {
    return this.auth.sendPasswordResetEmail(email);
  }

  doPasswordUpdate(password) {
    return this.auth.currentUser.updatePassword(password);
  }

  doSendEmailVerification () {
    return this.auth.currentUser.sendEmailVerification({
      url: 'http://localhost:1337',
    });
  }

  // *** Merge Auth and DB User API *** //

  onAuthUserListener(next, fallback) {
    return this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();
            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });
  }

  // *** User API ***

  user(uid) {
    return this.db.ref(`users/${uid}`)
  }

  users() {
    return this.db.ref('users')
  }

  // *** Message API ***

  message(uid) {
    return this.db.ref(`messages/${uid}`)
  }

  messages() {
    return this.db.ref('messages')
  }

  // *** Trainings API ***

  training(userUid, trainigUid) {
    return this.db.ref(`trainings/${userUid}/${trainigUid}`)
  }

  trainings(userUid) {
    return this.db.ref(`trainings/${userUid}`)
  }
}

export default Firebase;
