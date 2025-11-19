

```ts
import { FormGroup, FormControl, Validators } from '@angular/forms';

form = new FormGroup({
  email: new FormControl(
    '', 
    [Validators.required, Validators.email]
  ),
  tags: new FormControl<string[]>([])
});
```

## Code Explanation : 

### `import { FormGroup, FormControl, Validators } from '@angular/forms';`
Imports all the required classes for creating Reactive Forms:
- **FormControl** → represents an individual form field
- **FormGroup** → group of multiple controls (the whole form)
- **Validators** → built-in validation methods

---

###  `form = new FormGroup({ ... })`
Creates a new form using **FormGroup**.
This becomes your entire form model in TypeScript.
`form` now represents the whole form.

---

###  `email: new FormControl('', [...])`
Defines a single input field called `email`.
- Initial value: `''` (empty string)
- Validator list includes:
  - `Validators.required` → cannot be empty
  - `Validators.email` → must be valid email format  
Email field will be invalid until a proper email is entered.

---

###  `tags: new FormControl<string[]>([])`
Defines a control named `tags`.
- Initial value: an empty string array `[]`
- No validators
- Useful for adding dynamic tags list later

---

### ⭐ Expected Behavior:
- `form.valid` becomes **false** until a valid email is provided.
- `form.get('email')?.errors` will show validation errors.
- `tags` is available as an empty array, ready to store multiple values.
- The form is completely controlled via TypeScript.
