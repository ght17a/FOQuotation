import { Component, OnInit } from '@angular/core';
import { FetchQuotationsService } from '../service/fetch-quotations.service';
import { Observable } from 'rxjs';
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
  quotations$!: Observable<any[]>;
  selectedQuotation: any = null;
  estimatedPrice!: number;

  constructor(private fetchQuotations: FetchQuotationsService, private db: Firestore) {}

  ngOnInit(): void {
    this.quotations$ = this.fetchQuotations.getData();
  }

  openModal(quotation: any): void {
    this.selectedQuotation = quotation;
    this.estimatedPrice = quotation.price || 0;
    document.querySelector('.modal').style.display = 'block';
  }

  closeModal(): void {
    this.selectedQuotation = null;
    document.querySelector('.modal').style.display = 'none';
  }

  updatePrice(): void {
    const quotationRef = doc(this.db, `quotation/${this.selectedQuotation.id}`);
    updateDoc(quotationRef, { price: this.estimatedPrice }).then(() => {
      this.closeModal();
      // You might want to refresh the list or show a success message
    });
  }
}
