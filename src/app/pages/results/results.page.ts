import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';


import { ResultService } from '../../services/result.service';
import { SpecialService } from '../../services/special.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {

  specials: any;
  results : any;

  constructor(public resultService: ResultService, public specialService: SpecialService, private socket: Socket) {

    this.getResults().subscribe(data => {
      this.results.push(data);
    })

  }

  segmentChanged(ev: any) {
    this.getResultsBySpecial(ev.detail.value)
  }
  /*
  async getResults() {
    await this.resultService.getResults()
      .subscribe(res => {
        this.results = res;
      });
  }*/

  getResults() {
    let observable= new Observable(observer => {
      this.socket.on('resultAdded', (data) => {
        console.log("socket received")
        observer.next(data);
      });
    });
    return observable;
  }

  async getResultsBySpecial(idSpecial) {
    await this.resultService.getResultBySpecial(idSpecial)
      .subscribe( res => {
        console.log(res);
        res.sort((a, b) => {
          return a.pos - b.pos
        })
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
   this.results = this.resultService.results;

  }

}
