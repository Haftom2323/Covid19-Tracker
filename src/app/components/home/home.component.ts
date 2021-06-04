import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import {DataServiceService} from '../../services/data-service.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    totalConfirmed=0;
    totalActive=0;
    totalDeathes=0;
    totalRecovered=0;
  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe((res:any)=>{
      let data: GlobalDataSummary[]=[];
      let raw:any=[];
      let rows=res.split('\n');
      rows.splice(0,1);
      //console.log(rows[2])
       rows.forEach((row:any) => {
        let cols=row.split(/,(?=\S)/);
        let cs={country : cols[3],
        confirmed : +cols[7],
        deaths: +cols[8],
        recovered: +cols[9],
        active: +cols[10]
        };
        let temp: any=raw[cs.country];
        if(temp){
          temp.active=cs.active+ temp.active,
          temp.confirmed=cs.confirmed + temp.confirmed,
          temp.deaths=cs.deaths+temp.deaths,
          temp.recovered=cs.recovered+temp.recovered
          raw[cs.country]=temp;
        }else{
          raw[cs.country]=cs
        }
        
          
       //console.log(cols)
       });
       console.log(Object.values(raw));
  });

}
}