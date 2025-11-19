# RxJS Basics (Fundamentals)

RxJS (Reactive Extensions for JavaScript) is a library used heavily inside Angular.  
It powers major Angular features such as:
- HttpClient
- Router events
- Form valueChanges
- Signals interoperability
- Async streams everywhere

RxJS gives you **Observables**, which let you work with:
- Data that arrives over time
- Streams (events, HTTP, timers)
- Async operations
- Multiple values, not just one promise

---

## 1. What is an Observable?

An Observable is a **stream of values over time**.  
Think of it like:
- YouTube live video → keeps sending data  
- Button clicks → every click is an event  
- HttpClient response → data arrives once

Observables can emit:
- 1 value  
- Many values  
- Zero values  
- Errors  
- Completion event

Unlike Promises, Observables can be:
- Cancelled  
- Retried  
- Transformed  
- Combined

---

## 2. What is `pipe()`?

`pipe()` is used to apply **operators** to an Observable.

Operators allow:
- Transforming values  
- Filtering values  
- Combining streams  
- Delaying or throttling events  
- Handling errors  

Example:
```ts
.pipe(map(), filter(), tap())
```
Operators always return a `new Observable`.


## 3. Common Operators 

Transformation Operators

- `map()` → transforms values

- `switchMap()` → cancel & replace stream

- `concatMap()` → queue operations

- `mergeMap()` → parallel operations 

**Filtering Operators**

- `filter()` → allow only matching values

- `take()` → take limited number of values

- `debounceTime()` → wait before emitting

**Creation Operators**

- `of()` → create Observable of values

- `from()` → create Observable from array/promise

- `interval()` → emit values every second

## 4. What is subscribe()?

`subscribe()` is how you start listening to the Observable.

It receives:

- next value

- error

- complete

Example:
```js
observable.subscribe(
  value => console.log(value),
  err => console.error(err),
  () => console.log('done')
);
```
Without `subscribe()`, Observables do not run — they are lazy.

## 5. Expected Behavior of Example

- The code creates an Observable of values: 1, 2, 3

- `map()` multiplies each by 2 → 2, 4, 6

- `filter()` keeps only values greater than 2 → 4, 6

- `subscribe()` prints:

4
6

This shows how Observables transform data step-by-step through operators.