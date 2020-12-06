import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ButtonsService {
  public activeButton: string;

  constructor() {
    this.activeButton = 'btn1';
  }

  public setActive(buttonName: string): void {
    this.activeButton = buttonName;
  }

  public isActive(buttonName: string): boolean {
    return this.activeButton === buttonName;
  }
}
