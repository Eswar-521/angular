# SSR/SSG with Angular Universal

Set up Universal for SSR/SSG and enable hydration.

```bash
# Add universal in an existing app
ng add @nguniversal/express-engine

# In main.ts (browser)
import { provideClientHydration } from '@angular/platform-browser';
bootstrapApplication(AppComponent, { providers: [provideClientHydration()] });
```
**Expected output:** First paint is server-rendered HTML; client hydrates seamlessly, improving SEO and TTFB.
