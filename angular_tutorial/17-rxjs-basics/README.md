# 17 Rxjs Basics

##  What is RxJS?

**RxJS (Reactive Extensions for JavaScript) is a library that helps Angular work with data that arrives in the future, like API calls, user clicks, timers, and streams.**

In simple words:

> **RxJS helps Angular wait for data and react to it automatically.**

---

##  Why Do We Need RxJS?

Angular apps deal with many operations that don't complete immediately:

- API calls  
- User inputs  
- Button clicks  
- Loading data  
- Timer-based actions  

These are **asynchronous**, so Angular uses RxJS to handle them properly.

---

## Core Idea of RxJS (Very Simple)

### Observable  
A source of future data (API response, event, value).

###  Subscribe  
Your code that “listens” for the data when it arrives.

###  Operators  
Functions that transform the data (like `map`, `filter`, etc.).

---

##  Definition 

> **RxJS lets Angular work smoothly with data that arrives over time by using Observables and Subscriptions.**

---

## RxJS in Our Student Manager Project

### In the service: 

```ts
getStudents(): Observable<Student[]> {
  return of([...this.students]);
}
```

- of() creates an Observable

- It delivers student data when someone subscribes

In the Home component:
```js
this.studentService.getStudents().subscribe(data => {
  this.students = data;
});
```

This means:

- The component “subscribes”

- When the data arrives → Angular updates the UI

- This is the simplest real use of RxJS.

## Why Subscribe?

Because:

- An Observable does nothing until you subscribe to it.

- It waits quietly until someone asks for the data.

- This is called lazy execution, and it makes Angular very efficient.


- RxJS = library for async programming

- Observable = stream of future data

- Subscribe = receive the data

- Angular uses RxJS for all HTTP requests

- our project uses RxJS when loading student data 