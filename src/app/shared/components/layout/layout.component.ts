import { Component } from '@angular/core';
import { HeadComponent } from '../head/head.component';
import { SideComponent } from '../side/side.component';
import { FootComponent } from '../foot/foot.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeadComponent, SideComponent, FootComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export default class LayoutComponent {

}
