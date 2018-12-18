import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent implements OnInit {
  @Input() checked: Boolean;
  @Input() canActivate: Boolean;
  @Output() active: EventEmitter<any> = new EventEmitter();
  canUseSwitch = false;
  constructor() { }

  ngOnInit() {
    if (this.checked) {
      this.canUseSwitch = true;
    } else if (!this.checked && this.canActivate) {
      this.canUseSwitch = true;
    } else {
      this.canUseSwitch = false;
    }
  }
  switch() {
    this.active.emit(this.checked);
  }
}
