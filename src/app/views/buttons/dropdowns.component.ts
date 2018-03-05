import { Component } from '@angular/core';

@Component({
  templateUrl: 'dropdowns.component.html',
})
export class DropdownsComponent {

  constructor() { }

  items: string[] = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];

  onHidden(): void {
    console.log('Dropdown is hidden');
  }
  onShown(): void {
    console.log('Dropdown is shown');
  }
  isOpenChange(): void {
    console.log('Dropdown state is changed');
  }

  status: { isOpen: boolean } = { isOpen: false };

  toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isOpen = !this.status.isOpen;
  }

  change(value: boolean): void {
    this.status.isOpen = value;
  }

  disabled: boolean = false;

  isDropup: boolean = true;

  autoClose: boolean = false;
}
