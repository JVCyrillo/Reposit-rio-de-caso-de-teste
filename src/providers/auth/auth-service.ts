import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase'

@Injectable()
export class AuthServiceProvider {

  constructor(private storage: Storage) {
    
  }

  doLogin(email: string, password: string) {
    var promise = new Promise((resolve, reject) => {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
        return firebase.auth().signInWithEmailAndPassword(email, password).then((credential) => {
          console.log(`Logged as ${credential.user.uid}`)
          firebase.firestore().collection('accounts').doc(credential.user.uid).get().then((doc) => {
            if (doc.exists) {
              var userData = doc.data()
              userData['uid'] = doc.id;
              this.storage.set('currentUser', JSON.stringify(userData));
              resolve()
            } else {
              reject()
            }
          })
        }).catch((error) => {
          reject(error)
        })
      })
    })
    return promise
  }

  doRegister(email: string, password: string, userData) {
    var promise = new Promise((resolve, reject) => {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then((credential) => {
          // Success
          firebase.firestore().collection('accounts').doc(credential.user.uid).set(userData).then(() => {
            this.observerUser(credential.user.uid)
            resolve()
          }).catch((err) => {
            reject(err)
          }).catch((error) => {
            reject(error)
          })
        })
      }).catch((error) => {
        reject(error)
      })
    })
    return promise
  }

  observerUser(uid: string) {
    firebase.firestore().collection('accounts').doc(uid).onSnapshot((doc) => {
      if (doc.exists) {
        var userData = doc.data()
        userData['uid'] = doc.id;
        this.storage.set('currentUser', JSON.stringify(userData));
      }
    })
  }

  getCurrentUser() {
    var promise = new Promise((resolve, reject) => {
      this.storage.get('currentUser').then((result) => {
        resolve(JSON.parse(result))
      }).catch(() => {
        reject()
      })
    })
    return promise
  }

  updateUser(uid: string, userData) {
    var promise = new Promise((resolve, reject) => {
      firebase.firestore().collection('accounts').doc(uid).update(userData).then(() => {
        firebase.firestore().collection('account').doc(uid).get().then((userDoc) => {
          this.storage.set('currentUser', userDoc.data())
          resolve()
        })
      }).catch((error) => {
        reject(error)
      })
    })
    return promise
  }

  signOut() {
    firebase.auth().signOut()
    this.storage.remove('currentUser')
  }

}
