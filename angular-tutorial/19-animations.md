# Animations

Animate states and routes with the Angular animations API.

```ts
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  // ...
  animations: [
    trigger('fade', [
      transition(':enter', [ style({opacity:0}), animate('150ms ease-out', style({opacity:1})) ]),
      transition(':leave', [ animate('150ms ease-in', style({opacity:0})) ]),
    ])
  ]
})
```
**Expected output:** Elements fade on enter/leave; route transitions can reuse the same trigger.
