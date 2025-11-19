# RxJS Advanced Concepts

After understanding basic Observables, `map()`, `filter()`, and `subscribe()`,  
Angular developers must learn **advanced RxJS patterns** because HttpClient, Router, Forms, and Signals heavily rely on them.

Below are the most important advanced topics.

---

## 1. Higher-Order Mapping Operators

When an Observable returns another Observable (e.g., HTTP request inside another request),  
we must “flatten” the inner stream. RxJS provides 4 important operators:

### **1. switchMap()**
- Cancels previous request  
- Starts a new one  
- Used for search/autocomplete  
- Prevents outdated data

### **2. mergeMap()**
- Runs all inner Observables in parallel  
- Fastest, but no order control  
- Great for sending multiple API calls at once

### **3. concatMap()**
- Runs tasks one after another (queue)  
- Maintains order  
- Used for form submissions, database operations

### **4. exhaustMap()**
- Ignores new values while one request is active  
- Perfect for “Login” buttons → prevents double submission

---

## 2. Subjects & Multicasting

**Subject** is both:
- an Observable (you can subscribe to it)
- an Observer (you can push values into it)

### Types of Subjects:
- **Subject** → basic stream  
- **BehaviorSubject** → stores last value  
- **ReplaySubject** → replays old values to new subscribers  
- **AsyncSubject** → only emits last value when completed  

Subjects are used for:
- State management  
- Event buses  
- Sharing Values across components  

---

## 3. Error Handling Operators

### **catchError()**
Catches errors and returns fallback value.

### **retry() / retryWhen()**
Retries failed HTTP calls.

### **throwError()**
Manually create error Observable.

---

## 4. Combination Operators

Used to combine multiple Observables:

- **combineLatest()** → latest values from all Observables  
- **forkJoin()** → waits for all Observables to complete (like Promise.all)  
- **zip()** → pairs values from Observables step-by-step  
- **withLatestFrom()** → combines main stream with latest value of another  

These are used for:
- Making multiple API calls together  
- Merging router events with form data  
- Synchronizing multiple streams  

---

## 5. Time-Based Operators

Used for throttling, delaying, and controlling time.

- **debounceTime(ms)** → wait before emitting (search boxes)  
- **throttleTime(ms)** → limit how often values emit  
- **delay(ms)** → delay output  
- **interval(ms)** → emit values periodically  
- **timer(ms)** → emit after delay  

---

## 6. shareReplay()

One of the most important operators in Angular.

Used to:
- Cache API results  
- Avoid multiple HTTP calls  
- Share the same response with multiple subscribers  

Example:  
One HTTP call → many components use the value.

---

## 7. Expected Behavior (Advanced RxJS)

With advanced operators you can:
- Cancel API calls (switchMap)  
- Run them in parallel (mergeMap)  
- Guarantee order (concatMap)  
- Prevent double action (exhaustMap)  
- Cache results (shareReplay)  
- Retry failing requests (retry)  
- Combine streams (combineLatest)  

These patterns make Angular apps efficient, reactive, and scalable.
