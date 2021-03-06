import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {

  public modalRef: BsModalRef;
  public initialState: any;
  public radioSel: any;

  public defualtSelectedItem: string;
  public selectedItem: string;

  public shopData: any;
  public selectedItemVal: any;
  public itemsList: any = [
    {
      name: 'Price -- High Low',
      value: 'high_low'
    },
    {
      name: 'Price -- Low High',
      value: 'low_high'
    },
    {
      name: 'Discount',
      value: 'discount'
    }
  ];

  constructor(private modalService: BsModalService, private shareDataService: DataService) { } // {2}
  /**
   * Method to open modal/dialog*/
  public openModal(template: TemplateRef<any>) {

    this.modalRef = this.modalService.show(
      template,
      {
        class: 'modal-sm modal-dialog-centered'
      }
    );

  }

  ngOnInit() {
    /**
     * Selecting Default Radio item here*/
    this.defualtSelectedItem = "high_low";
    this.getSelecteditem();
  }

  /** 
   * Method Get the row item from the array */
  getSelecteditem() {
    this.radioSel = this.itemsList.find(Item => Item.value === this.defualtSelectedItem);
    this.selectedItem = this.radioSel.value;
  }

  /**
   * Method to Radio Change Event*/
  onItemChange(item) {
    this.getSelecteditem();
  }
  /**
   * Method to sort items by options*/
  sortByOptions(selectedOptionVal) {
    this.selectedItemVal = selectedOptionVal;

    switch (selectedOptionVal) {

      case "high_low":
        {
          this.shopData = this.shareDataService.getShopListData().sort((high: any, low: any) => (high.price < low.price) ? 1 : -1);
          break;
        }

      case "low_high":
        {
          this.shopData = this.shareDataService.getShopListData().sort((high: any, low: any) => (high.price > low.price) ? 1 : -1);

          break;
        }

      case "discount":
        {
          this.shopData = this.shareDataService.getShopListData().sort((high: any, low: any) => { return (low.discount - high.discount) });
          console.log('discountdata', this.shopData)
          break;
        }

      default: {
        this.shopData = this.shareDataService.getShopListData().sort((high: any, low: any) => (high.price < low.price) ? 1 : -1);
        break;
      }

    }

    this.modalService.hide(1);
    this.shareDataService.shareData.next(this.shopData);
  }

}
