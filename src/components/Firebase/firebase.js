import app from 'firebase/app';
import 'firebase/auth';

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

    this.doCreateUserWithEmailAndPassword = this.doCreateUserWithEmailAndPassword.bind(this);
    this.doSignInWithEmailAndPassword = this.doSignInWithEmailAndPassword.bind(this);
    this.doSignOut = this.doSignOut.bind(this);
    this.doPasswordReset = this.doPasswordReset.bind(this);
    this.doPasswordUpdate = this.doPasswordUpdate.bind(this);
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  doSignInWithEmailAndPassword(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password)
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
}

export default Firebase;
