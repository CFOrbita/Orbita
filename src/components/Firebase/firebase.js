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
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword(email, password) {
    this.auth.createUserWithEmailAndPassword(email, password);
  }

  doSignInWithEmailAndPassword(email, password) {
    this.auth.signInWithEmailAndPassword(email, password)
  }

  doSignOut() {
    this.auth.signOut();
  }

  doPasswordReset(email) {
    this.auth.sendPasswordResetEmail(email);
  }

  doPasswordUpdate(password) {
    this.auth.currentUser.updatePassword(password);
  }
}

export default Firebase;
