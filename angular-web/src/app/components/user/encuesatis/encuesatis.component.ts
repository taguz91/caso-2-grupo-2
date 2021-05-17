import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encuesatis',
  templateUrl: './encuesatis.component.html',
  styleUrls: ['./encuesatis.component.scss']
})
export class EncuesatisComponent implements OnInit {


  public contador: number;
  constructor() { }



  ngOnInit(): void {
  }

  califica (item): void{
    console.log(item);
    this.contador = item;
    for (let i = 0; i <5;i++){
      let b=i+1;
      if (i<this.contador) {
        document.getElementById((b)+"estrella").style.color="orange";
      }else{
        document.getElementById((b)+"estrella").style.color="black";
      }
    }

  }
}

