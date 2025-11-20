# 16 Signals

Content will be added here.
# 🌟 Angular Signals — Fresher Notes

## 1️⃣ What Are Signals?

**Signals are a new reactivity system in Angular (from Angular 16+).**

A **signal is a special variable** that:
- Stores a value  
- Automatically notifies Angular when the value changes  
- Updates the UI automatically  

👉 Think of a signal like a **smart variable**.

---

## 2️⃣ Why Do We Use Signals?

| Benefit | Meaning |
|---------|---------|
|  No Need for Observables | Easier for beginners |
|  Automatic UI Updates | When value changes, UI changes |
|  No async pipe needed | Directly use in HTML |
|  Super Simple State Management | Good for counters, lists, forms |

---

## 3️⃣ How to Create a Signal?

```ts
import { signal } from '@angular/core';

count = signal(0);
```

**Update it**

```js
count.set(5);
count.update(value => value + 1);
```

**Read it**

```js
{{ count() }}
```

## In our Project we use Signals At Home Component.ts 

```js

import { Component, effect, signal } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html'
})
export class HomeComponent {

  //  Signal instead of normal array
  students = signal<Student[]>([]);

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe(data => {
      this.students.set(data);  // update signal value
    });
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.students.update(list => list.filter(s => s.id !== id));
    });
  }
}
```

## Here we have the Some other type of Computed Signal and Effect Signal 

**Computed Signal**

```js
name = signal('Ram');

greeting = computed(() => `Hello, ${this.name()}`);
```

**In Html**

```js
<p>{{ greeting() }}</p>
```


**Effect Signal**

```js
score = signal(0);

constructor() {
  effect(() => {
    console.log("Score changed:", this.score());
  });
}
```

- Signal = smart variable that triggers UI updates

- Works without observables

- Easy to use in HTML — just call signalName()

- Use .set() or .update() to change values

- Great for storing student list, selected student, form data, etc.

