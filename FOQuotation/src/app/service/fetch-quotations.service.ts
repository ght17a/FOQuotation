import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FetchQuotationsService {
  selectedQuotation: any = null;
  
  constructor(
    private db: Firestore
  ) { }

  getData(): Observable<any[]> {
    const quotations = collection(this.db, 'quotation');
    const pendingQuotations = query(quotations, where('status', '==', 'pending'));
    return collectionData(pendingQuotations, { idField: 'id'}) as Observable<any[]>; 
  }
}
