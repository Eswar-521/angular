# Testing

Use TestBed for components and Playwright/Cypress for E2E.

```ts
import { TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';
it('renders', async () => {
  await TestBed.configureTestingModule({ imports: [CounterComponent] }).compileComponents();
  const fixture = TestBed.createComponent(CounterComponent);
  fixture.detectChanges();
  expect(fixture.nativeElement.textContent).toContain('Count');
});
```
**Expected output:** Component compiles in isolation with its `imports`; assertions validate DOM.
