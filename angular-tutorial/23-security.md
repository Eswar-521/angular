# Security & Hardening

Angular escapes HTML by default; use `DomSanitizer` carefully and prefer CSP.

```ts
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
safe(html: string): SafeHtml { return this.sanitizer.bypassSecurityTrustHtml(html); }
```
**Expected output:** Only trusted content is rendered; avoid bypass unless you fully control the source.
