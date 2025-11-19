```ts
import { fromEvent, switchMap, debounceTime, map, catchError, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';

// Listen for typing in a search box
const searchBox = document.getElementById('search');

// Stream of keyup events
const keyup$ = fromEvent(searchBox, 'keyup');

// Advanced pipeline
const result$ = keyup$.pipe(

  debounceTime(300),
  // Wait 300ms after user stops typing

  map(event => event.target.value),
  // Extract input value from event

  switchMap(query =>
    ajax.getJSON(`https://api.example.com/search?q=${query}`).pipe(
      // Cancel previous API calls when new query arrives

      catchError(() => of({ error: true }))
      // If an error happens → return fallback value
    )
  )
);

result$.subscribe(console.log);
```

## Code Explanation 

```md
### `fromEvent(searchBox, 'keyup');`
Creates an Observable that emits every time the user types in the search box.

---

### `.pipe(debounceTime(300))`
Waits 300ms after the user stops typing before emitting.
Prevents firing API calls for every single keystroke.

---

### `.pipe(map(event => event.target.value))`
Transforms the event → extracts the actual text typed by user.

---

### `switchMap(query => ajax.getJSON(...))`
This is the MOST important operator for search/autocomplete.

- Cancels previous API requests  
- Creates a new API request for the latest search query  
- Ensures only the latest result shows  
- Prevents race conditions  

---

### `catchError(() => of({ error: true }))`
Handles API failure.
Instead of crashing, it returns a fallback Observable.

---

### `result$.subscribe(console.log)`
Subscribes to the final transformed Observable.
Prints:
- API results  
- Or `{ error: true }` if the call fails  

This demonstrates:
- Event streams  
- Debounce  
- Mapping values  
- Canceling old requests  
- Error handling  
- Subscribing to live data  

