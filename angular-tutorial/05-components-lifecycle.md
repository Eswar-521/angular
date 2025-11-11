# Components & Lifecycle

Standalone components declare `standalone: true` and list their `imports`. Use lifecycle hooks where needed.

```ts
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [CommonModule],
  template: `<h1 #title>Hello {{name}}</h1>`
})
export class HelloComponent implements OnInit, OnDestroy {
  name = 'Angular';
  @ViewChild('title') title!: ElementRef<HTMLHeadingElement>;
  ngOnInit(){ /* setup */ }
  ngOnDestroy(){ /* cleanup */ }
}
```
**Expected output:** Renders an H1 and runs setup/cleanup at the right times; `imports` replaces NgModule declarations.
