import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: string;
  symbol: string;
  place:string;
}
var ELEMENT_DATA = [
  {position: 1, name: 'Sciance Collge   ', weight: 'Floor 1 ', symbol: '   110   ' , place:'113245'},
  
];

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  displayedColumns: string[] = ['College', 'Floor', 'Class' ];

  gender: string = "male";

  questionList = [
    {
      question: {
        id: "Q1",
        query: "Gender:",
      },
      options: [
        {
          id: "Male",
          text: "Male",
        },
        {
          id: "Female",
          text: "Female",
        },
      ],
      selected: {
        id: "",
        text: "",
      },
    },
  ];
   planHidden:boolean = false;
   searchInput = ""

   dataSource:MatTableDataSource<PeriodicElement> 

  constructor(private spinner: NgxSpinnerService) { 
    this.dataSource = 
    new MatTableDataSource( ELEMENT_DATA);
  }
  public SearchAction(value:string){
    this.showLoader()
    this.hideLoader()

    if(value === "14G0110"){

      this.planHidden = true
    }else{
      this.planHidden = false
    }
  
  }
  ngOnInit(): void {
  }
showLoader(){
  console.log("yes")
  this.spinner.show(); 
}
hideLoader(){
  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinner.hide();
  }, 3000);
}
}
