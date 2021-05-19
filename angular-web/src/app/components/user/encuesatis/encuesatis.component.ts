import { Component, OnInit } from '@angular/core';
import { Encuesta } from 'src/app/models/encuesta';
import { EncuesatisService } from 'src/app/services/encuesatis.service';

@Component({
  selector: 'app-encuesatis',
  templateUrl: './encuesatis.component.html',
  styleUrls: ['./encuesatis.component.scss']
})
export class EncuesatisComponent implements OnInit {
  public contador: number;
  public encuestaCreate: Encuesta = new Encuesta(0,"","6");

constructor(public encuestaservice: EncuesatisService) { }



ngOnInit(): void {
}

califica(item): void {
  console.log(item);
  this.contador = item;
  this.encuestaCreate.calificacion=this.contador;
  for(let i = 0; i <5; i++) {
  let b = i + 1;
  if (i < this.contador) {
    document.getElementById((b) + "estrella").style.color = "orange";
  } else {
    document.getElementById((b) + "estrella").style.color = "black";
  }
}

  }

addEncuesta():void {
  console.log("sddsdcsdcsdcsdcsdc")
  console.log(this.encuestaCreate)
  this.encuestaservice.registerEncuesta(this.encuestaCreate).subscribe(
    res => {
    console.log(res);
  },error => {
    console.log(error)
  })
  }
}

