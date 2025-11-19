```js
import { Component, signal, computed, effect } from '@angular/core';
```

- ➡️ import { … } = We are bringing Angular features into this file.
- ➡️ Component = Used to create Angular component.
- ➡️ signal = Creates reactive state variable.
- ➡️ computed = Automatically recalculates when signal changes.
- ➡️ effect = Runs code whenever a signal updates.
- ➡️ @angular/core = Main Angular library.

```js
@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <button (click)="inc()">
      Count: {{ count() }} | Double: {{ double() }}
    </button>
  `
})
```
- ➡️ @Component({...}) = This is Angular’s decorator that defines a
component.
- ➡️ selector: 'app-counter' = The name used in HTML (<app-counter>).
- ➡️ standalone: true = No module needed → simple component.
- ➡️ template: = HTML UI of this component.
- ➡️ <button (click)="inc()"> = On click → call inc() method.
- ➡️ {{ count() }} = Reads signal value.
- ➡️ {{ double() }} = Reads computed value.

```js
export class CounterComponent {
      count = signal(0);
        double = computed(() => this.count() * 2);
          constructor() {
    effect(() => console.log('count:', this.count()));
  }
  inc() {
    this.count.update(v => v + 1);
  }
}
```

- ➡️ export class = Creating a class that Angular will use.
- ➡️ CounterComponent = Name of the component

```js
  count = signal(0);
```
- ➡️ count = A variable.
- ➡️ signal(0) = Create reactive variable with default value 0.
- ➡️ When this changes → UI updates automatically.

```js
  double = computed(() => this.count() * 2);
```

- ➡️ double = Another variable.
- ➡️ computed() = Auto-updating formula.
- ➡️ this.count() = Read current count value.
- ➡️ * 2 = Multiply by 2.
- ➡️ Whenever count changes → double recalculates.

```js
  constructor() {
```
- ➡️ constructor() = Runs when component is created.

```js
    effect(() => console.log('count:', this.count()));
```
- ➡️ effect() = Runs code every time signal changes.
- ➡️ Logs new count value in browser console.
- ➡️ Great for debugging.

```js
  }
```
- ➡️ Ends the constructor.

```js
 inc() {
```
- ➡️ inc() = Method that runs when the button is clicked.

```js
    this.count.update(v => v + 1);
```

- ➡️ count.update() = Update the signal value.
- ➡️ v => v + 1 = Take old value v and increase by 1.
- ➡️ This triggers UI update + effect() log.

```js
  }
}
```
- ➡️ Ends the method and component class.

## ⭐ Expected Output

- Button shows current count
- Clicking increases value
- Double value updates automatically
- Console logs updates

---

# HOW TO RUN THIS IN VS CODE :

**Open VS Code → Terminal**

## Install Angular CLI 

```js
npm install -g @angular/cli
```
- ➡️ Installs Angular command line tool.
- ➡️ Needed to create Angular projects.

### STEP 2 — Create New Angular Project

```js
- ng new my-angular-app
```
- ➡️ Creates new project folder with all Angular setup.
- ➡️ Choose Yes → Standalone Components when asked.


### STEP 3 — Open the project folder in VS Code

```js
cd my-angular-app
```

- ➡️ Moves inside project
- ➡️ VS Code can now detect Angular files.


### STEP 4 — Generate new component
```js
ng generate component counter --standalone
```

`➡️ Creates folder:`

- src/app/counter/

`➡️ Creates file:`

- counter.component.ts

### STEP 5 — Replace the code

Go to: 
```js
src/app/counter/counter.component.ts
```
- Delete everything inside → paste the full code I gave.

### STEP 6 — Set CounterComponent as main component

```js
src/main.ts
```
Replace With :

```js
import { bootstrapApplication } from '@angular/platform-browser';
import { CounterComponent } from './app/counter/counter.component';

bootstrapApplication(CounterComponent);
```

- ➡️ This starts the app with your CounterComponent.
- ➡️ No modules needed standalone approach.

### STEP 7 — Run the application
```js
ng serve
```
- ➡️ Angular dev server starts.
- ➡️ Compiles your app automatically.