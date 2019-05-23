import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { ResultService } from '../../services/result.service';
import { SpecialService } from '../../services/special.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {

  specials: any;
  results: any;

  constructor(public resultService: ResultService, public specialService: SpecialService ) {

  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev.detail.value);
    this.getResultsBySpecial(ev.detail.value)
  }

  async getResults() {
    await this.resultService.getResult()
      .subscribe(res => {
        this.results = res;
      });
  }

  async getResultsBySpecial(idSpecial) {
    await this.resultService.getResultBySpecial(idSpecial)
      .subscribe( res => {
        console.log(res);
        this.results = res;
      })
  }

  async getSpecials() {
    await this.specialService.getSpecial()
    .subscribe(res => {
      console.log(res);
      this.specials = res;
    })
  }

  isChecked(special) {
    if(special.name === "ES1") {
      return true;
    }
    return false;
  }

  ngOnInit() {
   this.getSpecials();
  }

}
