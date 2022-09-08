import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
@Component({
  selector: 'app-animacion',
  templateUrl: './animacion.page.html',
  styleUrls: ['./animacion.page.scss'],
})
export class AnimacionPage implements OnInit {

  constructor(
    private anim: AnimationController,
    public router: Router
  ) {
    setTimeout(()=>{
      this.router.navigateByUrl('home');
    }, 3000)
  }

  ngOnInit(): void {
    this.anim.create()
      .addElement(document.querySelector("img"))
      .duration(1000)
      .delay(500)
      .keyframes([
        { offset: 0, transform: "scale(1) rotate3d(-1, 1, 0, 0deg)"},
        {offset: 0.50,transform: "scale(2) rotate3d(-1, 1, 0, 180deg)"},
        {offset: 1, transform: "scale(1) rotate3d(-1, 1, 0, 360deg)"}
    ])
    .play()
    this.anim.create()
      .addElement(document.querySelector("H1"))
      .duration(3000)
      .delay(1500)
      .keyframes([
        {offset: 0, transform: "scale(1)", opacity: 0},
        {offset: 0.20,transform: "scale(1)", opacity: 1},
        {offset: 0.90,transform: "scale(1)", opacity:1},
        {offset: 1, transform: "scale(1)", opacity:1}
    ])
    .play()
    
  }

}