# Templates, Binding & Directives

Bind properties, listen to events, and use structural/attribute directives.

```html
// template snippet
<input [(ngModel)]="search" placeholder="Search" />
<p *ngIf="search; else empty">You typed {{ search }}</p>
<ng-template #empty><em>Nothing yet</em></ng-template>

<ul>
  <li *ngFor="let item of items; trackBy: trackById">{{ item.name }}</li>
</ul>
```
**Expected output:** Two-way binding mirrors input; conditional and list render with stable identity via trackBy.
