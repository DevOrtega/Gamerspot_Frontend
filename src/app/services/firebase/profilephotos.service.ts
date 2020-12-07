import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { Profilephotos } from 'src/app/interfaces/profilephotos';

@Injectable({
  providedIn: 'root'
})
export class ProfilephotosService {

  private photosCollection: AngularFirestoreCollection<Profilephotos>;

  constructor(private db:AngularFirestore, private storage:AngularFireStorage) {
    this.photosCollection = this.db.collection<Profilephotos>('profilephotos');
  }

  public getPhotos():AngularFirestoreCollection<Profilephotos> {
    return this.photosCollection;
  }

  public getPhotoByUsername(username:string) {
   return this.storage.ref(`profilephotos/${username}`);
  }

  public postPhoto(photo, username) {
    return this.storage.upload(`profilephotos/${username}`, photo);
  }
}
