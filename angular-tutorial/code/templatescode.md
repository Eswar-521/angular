

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-template-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Template & Directives Demo</h2>

    <!-- Structural Directive: *ngIf -->
    <p *ngIf="showMessage">This message is visible</p>

    <!-- Structural Directive: *ngFor -->
    <ul>
      <li *ngFor="let item of fruits">{{ item }}</li>
    </ul>

    <!-- Attribute Directive: ngClass -->
    <div [ngClass]="{ active: isActive }">Styled Box</div>

    <!-- Attribute Directive: ngStyle -->
    <p [ngStyle]="{ color: textColor }">Colored Text</p>

    <!-- Event Binding -->
    <button (click)="toggleMessage()">Toggle Message</button>
    <button (click)="toggleActive()">Toggle Active</button>
  `
})
export class TemplateDemoComponent {
  showMessage = true;
  fruits = ['Apple', 'Banana', 'Mango'];
  isActive = false;
  textColor = 'blue';

  toggleMessage() {
    this.showMessage = !this.showMessage;
  }

  toggleActive() {
    this.isActive = !this.isActive;
  }
}
```

## FULL CODE EXPLANATION
```js
import { Component } from '@angular/core';
```
- Imports the component decorator to create Angular components.
```js
import { CommonModule } from '@angular/common';
```

- Required for directives like *ngIf, *ngFor, [ngClass], [ngStyle].

```js
@Component({
```
- Starts component metadata.

```js
selector: 'app-template-demo',
```

- HTML tag to use this component: <app-template-demo></app-template-demo>.
```js
standalone: true,
```

- Component works without NgModule.

```js
imports: [CommonModule],
```

- Standalone component dependencies CommonModule is required for directives.

```js
template: \ ... ``
```
- Defines the UI using HTML + Angular directives.