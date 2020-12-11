import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { FirestoreService } from './firestore.service';
import { AuthenticationService } from './firebase-authentication.service';


@Injectable({
  providedIn: 'root'
})
export class APIService {
  private id;

  constructor(
    private http: HttpClient,
    private firestore: FirestoreService,
    private auth: AuthenticationService
  ) { }

  updateToken(id) {
    this.id = id;
  }

  signUp(user): Observable<any> {
    const userInfo = {
      'id': null,
      'username': user['email'],
      'email': user['email'],
      'name': `${user['first_name']} ${user['last_name']}`,
      'phone': `${user['phone']}`,
    };

    return new Observable((observer) => {
      this.auth.createAccount(user['email'], user['password'])
        .then(User => {
          // console.log(User);
          userInfo.id = User.uid;
          this.firestore.createWithId('clients', userInfo).then(usr => {
            // console.log(usr);
            observer.next(userInfo);
          }, err => {
            observer.error(err);
          });
        }).catch(err => {
          observer.error(err);
        });
    });

  }
 
  logIn(username: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.auth.login(username, password)
        .then(user => {
          observer.next({ id: user.uid });
        }).catch(err => {
          observer.error(err);
        });
    });

  }

  logout() {
    return this.auth.logout();
  }

  getUser(): Observable<any> {
    // console.log('id', this.id);
    return this.addIdToObject(this.id, this.firestore.getOne('clients', this.id));
  }

  getDriver(driverId): Observable<any> {
    return this.addIdToObject(driverId, this.firestore.getOne('drivers', driverId));
  }

  updateUser(id, userData): Observable<any> {
    //console.log('updateuser', userData);
    return from(this.firestore.update('clients', id, userData));
  }

  bookRide(rideData: any): Observable<any> {
    return this.snapshotToDataConverter(this.firestore.create('rides', rideData));
  }

  createDbCollection(db: string, data: any): Observable<any> {
    return this.snapshotToDataConverter(this.firestore.create(db, data));
  }

  getDbCollection(db, id): Observable<any> {
    return this.addIdToObject(id, this.firestore.getOne(db, id));
  }

  updateDbCollection(db, id, data): Observable<any> {
    return from(this.firestore.update(db, id, data));
  }


  getRide(rideId): Observable<any> {
    return this.addIdToObject(rideId, this.firestore.getOne('rides', rideId));
  }

  updateRideData(rideId, data): Observable<any> {
    return from(this.firestore.update('rides', rideId, data));
  }

  setRideTimeOut(rideId): Observable<any> {
    return new Observable((observer) => {
      this.getRide(rideId).subscribe(ride => {
        if (!ride['ride_accepted']) {
          this.updateRideData(rideId, { request_timeout: true })
            .subscribe(res => {
              observer.next({ message: [1] });
            }, err => {
              observer.next({ message: [0] });
            });
        } else {
          observer.next({ message: [0] });
        }
      }, err => {
        observer.error(err);
      });
    });
  }

  setRideRejected(rideId): Observable<any> {
    return this.updateRideData(rideId, { user_rejected: true });
  }

  // getRideHistory(userId): Observable<any> {
  //   return this.firestore.runQuery('rides', { field: 'clientId', operation: '==', searchKey: userId });
  // }

  getRideHistory(userId, recordsNbr): Observable<any> {
    return this.firestore.find('rides', ref => ref
    .where('clientId', '==', userId)
    .where('ride_completed', '==', true)
    .orderBy('createdAt', 'desc').limit(recordsNbr)); 
  }

  snapshotToDataConverter(query: Promise<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>>) {
    return new Observable((observer) => {
      query
        .then(ref => {
          const obj = ref.data();
          obj.id = ref.id;
          observer.next(obj);
        }).catch(err => {
          observer.error(err);
        });
    });
  }

  addIdToObject(id, obj: Observable<any>) {
    return new Observable((observer) => {
      if (id) {
        obj.subscribe(ref => {
          const newObj = ref;
          if(newObj){
            newObj.id = id;
          }
          observer.next(newObj);
        }, err => {
          observer.error(err);
        });
      } else {
        observer.error({ message: 'No ID' });
      }
    });
  }
}
