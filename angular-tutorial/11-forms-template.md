# Forms: Template-Driven

Use `FormsModule` for simple forms; add validators and helpers.

```html
// component.html
<form #f="ngForm">
  <input name="email" ngModel required email />
  <button [disabled]="f.invalid">Submit</button>
</form>
```
**Expected output:** Button disables until email is valid; form value accessible via `f.value`.
