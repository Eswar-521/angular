```js 
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

  ngOnInit() {
    console.log('Component Initialized');
  }

  ngOnDestroy() {
    console.log('Component Destroyed');
  }
}
```

---

## Code Explanation 
```js
 import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
```
- Imports Angular features needed for creating the component and handling lifecycle + DOM access.

- Component → to define an Angular component

- OnInit → hook that runs when the component is created

- OnDestroy → hook that runs when component is removed

- ViewChild → used to access an element in the template

- ElementRef → wrapper object for the actual DOM element
```js
import { CommonModule } from '@angular/common';
```

- Imports common Angular functionality like *ngIf, *ngFor, pipes, etc.
- Standalone components require this module explicitly.

```js
 @Component({
```
- Starts the decorator that makes this class a component.
- Angular reads everything inside this object as metadata.

```js
selector: 'app-hello',
```

- Defines the custom HTML tag that displays this component:
```js
<app-hello></app-hello>
```
```js
standalone: true,
```

- Means this component does NOT require an NgModule.
- It can run independently and import everything it needs here.

```js
imports: [CommonModule],
```

- Standalone components list their dependencies here.
- This replaces NgModule declarations.

```js
template: \<h1 #title>Hello {{name}}</h1>
```

- Component UI template.

`#title` → template reference used with ViewChild

`{{name}}` → interpolation showing the value of the variable name

```js
export class HelloComponent implements OnInit, OnDestroy {
```

- Defines the component class.
- Also ensures the class contains ngOnInit() and ngOnDestroy() methods.

` name = 'Angular'`

- A simple class property.
- Displayed inside template as “Hello Angular”.

```js
@ViewChild('title') title!: ElementRef<HTMLHeadingElement>;
```

Gets access to the `<h1>` element.

`title`  matches the #title in template 

`ElementRef<HTMLHeadingElement>` → gives direct access to the DOM element

```js
ngOnInit() { console.log('Component Initialized'); }
```

- Lifecycle hook → runs when component is created & view initialized.
- Used for: API calls, subscriptions, default setups, logging.

```js
ngOnDestroy() { console.log('Component Destroyed'); }
```
- Lifecycle hook → runs when component is removed from DOM.
- Used for: cleanup, clearing timers, unsubscribing from Observables.
