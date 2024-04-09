import { Component, OnInit } from '@angular/core';
import { FetchQuotationsService } from '../service/fetch-quotations.service';
import { CommonModule, NgFor } from '@angular/common';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})

export class HomePageComponent implements OnInit {
  mainQuotation: any = null;
  otherQuotations: any[] = [];
  estimatedPrice!: number;

  constructor(private fetchQuotations: FetchQuotationsService, private db: Firestore) {}

  ngOnInit(): void {
    this.fetchQuotations.getData().subscribe(quotations => {
      if (quotations.length > 0) {
        this.mainQuotation = quotations[0];
        this.otherQuotations = quotations.slice(1);
      }
    });
  }

  submitPrice(quotation: any): void {
    const quotationRef = doc(this.db, `quotation/${quotation.id}`);
    updateDoc(quotationRef, { 
      price: this.estimatedPrice,
      status: 'done'
    }).then(() => {
      this.fetchQuotations.getData().subscribe(quotations => {
        if (quotations.length > 0) {
          this.mainQuotation = quotations[0];
          this.otherQuotations = quotations.slice(1);
        } else {
          this.mainQuotation = null;
        }
      });
    });
  }
}