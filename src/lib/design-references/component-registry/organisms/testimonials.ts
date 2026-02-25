import type { IComponentSnippet } from '../types.js';

export const testimonialSnippets: IComponentSnippet[] = [
  {
    id: 'testimonial-carousel',
    name: 'Testimonial Carousel',
    category: 'organism',
    type: 'testimonial',
    variant: 'carousel',
    tags: ['testimonial', 'carousel', 'social-proof', 'reviews'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'startup', 'agency'],
    visualStyles: ['minimal-editorial', 'soft-depth'],
    jsx: `<section className="py-20 sm:py-28" aria-labelledby="testimonials-heading">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
      <h2 id="testimonials-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Loved by thousands of users</h2>
      <p className="mt-4 text-lg text-muted-foreground">See what our customers have to say about their experience.</p>
    </div>
    <div className="relative mx-auto mt-16 max-w-3xl">
      <div className="overflow-hidden rounded-2xl border bg-card p-8 shadow-sm sm:p-12">
        <div className="flex items-center gap-1 text-warning" aria-label="5 star rating">
          <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
        </div>
        <blockquote className="mt-6 text-xl font-medium text-foreground leading-relaxed">"This platform completely transformed how we ship products. The speed and reliability are unmatched. Our team can now focus on building features instead of fighting infrastructure."</blockquote>
        <div className="mt-8 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-foreground">SJ</div>
          <div>
            <div className="text-sm font-semibold text-foreground">Sarah Johnson</div>
            <div className="text-sm text-muted-foreground">VP of Engineering, TechCorp</div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-center gap-2">
        <button type="button" className="h-2 w-2 rounded-full bg-primary" aria-label="Show testimonial 1" aria-current="true"></button>
        <button type="button" className="h-2 w-2 rounded-full bg-muted transition-colors hover:bg-muted-foreground" aria-label="Show testimonial 2"></button>
        <button type="button" className="h-2 w-2 rounded-full bg-muted transition-colors hover:bg-muted-foreground" aria-label="Show testimonial 3"></button>
      </div>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      section: 'py-20 sm:py-28',
      card: 'overflow-hidden rounded-2xl border bg-card p-8 shadow-sm sm:p-12',
      stars: 'flex items-center gap-1 text-warning',
      quote: 'mt-6 text-xl font-medium text-foreground leading-relaxed',
      author: 'mt-8 flex items-center gap-4',
      dots: 'mt-8 flex items-center justify-center gap-2',
      dotActive: 'h-2 w-2 rounded-full bg-primary',
      dotInactive: 'h-2 w-2 rounded-full bg-muted hover:bg-muted-foreground',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-labelledby', 'aria-label', 'aria-current'],
      keyboardNav: 'Tab through carousel dots, Enter to select',
      contrastRatio: '7:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'section', headingLevel: 'h2' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm'] },
    quality: {
      antiGeneric: [
        'star rating with fill-current yellow',
        'carousel dots with aria-current state',
        'avatar initials fallback',
        'text-xl for quote emphasis',
      ],
      inspirationSource: 'Stripe testimonials',
      craftDetails: [
        'max-w-3xl for readable quote length',
        'rounded-2xl + shadow-sm for card depth',
        'leading-relaxed on quote for readability',
      ],
    },
  },
  {
    id: 'testimonial-grid',
    name: 'Testimonial Grid',
    category: 'organism',
    type: 'testimonial',
    variant: 'grid',
    tags: ['testimonial', 'grid', 'social-proof'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'startup'],
    visualStyles: ['minimal-editorial', 'soft-depth'],
    jsx: `<section className="py-20 sm:py-28" aria-labelledby="testimonial-grid-heading">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
      <h2 id="testimonial-grid-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">What our customers say</h2>
      <p className="mt-4 text-lg text-muted-foreground">Join thousands of happy customers building better products.</p>
    </div>
    <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-xl border bg-card p-6">
        <div className="flex items-center gap-1 text-warning" aria-label="5 star rating">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">"Switching to this platform was the best decision we made this year. Our deployment time went from hours to minutes."</p>
        <div className="mt-6 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">MK</div>
          <div>
            <div className="text-sm font-semibold text-foreground">Michael Kim</div>
            <div className="text-xs text-muted-foreground">CTO, StartupXYZ</div>
          </div>
        </div>
      </div>
      <div className="rounded-xl border bg-card p-6">
        <div className="flex items-center gap-1 text-warning" aria-label="5 star rating">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">"The developer experience is fantastic. Everything just works out of the box. No more configuration nightmares."</p>
        <div className="mt-6 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">EP</div>
          <div>
            <div className="text-sm font-semibold text-foreground">Emily Park</div>
            <div className="text-xs text-muted-foreground">Lead Developer, DesignCo</div>
          </div>
        </div>
      </div>
      <div className="rounded-xl border bg-card p-6">
        <div className="flex items-center gap-1 text-warning" aria-label="5 star rating">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">"Outstanding support and rock-solid reliability. We've scaled from 100 to 10,000 users without a single issue."</p>
        <div className="mt-6 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">JD</div>
          <div>
            <div className="text-sm font-semibold text-foreground">James Davis</div>
            <div className="text-xs text-muted-foreground">Product Lead, GrowthApp</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      grid: 'mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3',
      card: 'rounded-xl border bg-card p-6',
      stars: 'flex items-center gap-1 text-warning',
      quote: 'mt-4 text-sm text-muted-foreground leading-relaxed',
      author: 'mt-6 flex items-center gap-3',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-labelledby', 'aria-label'],
      keyboardNav: 'N/A — content',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'section', headingLevel: 'h2' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'lg'] },
    quality: {
      antiGeneric: [
        'uniform 3-column grid layout',
        'consistent card structure',
        'stars above quote for hierarchy',
        'realistic customer quotes with specific metrics',
      ],
      inspirationSource: 'Cal.com testimonials',
      craftDetails: [
        'gap-6 for breathing room between cards',
        'h-4 w-4 smaller stars for grid context',
        'text-xs on role for compact author info',
      ],
    },
  },
  {
    id: 'testimonial-wall-of-love',
    name: 'Wall of Love (Masonry)',
    category: 'organism',
    type: 'testimonial',
    variant: 'wall-of-love',
    tags: ['testimonial', 'masonry', 'wall-of-love', 'twitter'],
    mood: ['playful', 'creative', 'editorial'],
    industry: ['saas', 'startup', 'agency'],
    visualStyles: ['bento-grid', 'retro-playful'],
    jsx: `<section className="py-20 sm:py-28" aria-labelledby="wall-of-love-heading">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
      <h2 id="wall-of-love-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Wall of Love</h2>
      <p className="mt-4 text-lg text-muted-foreground">Real tweets from real customers who love what we do.</p>
    </div>
    <div className="mx-auto mt-16 columns-1 gap-6 sm:columns-2 lg:columns-3">
      <div className="mb-6 break-inside-avoid rounded-xl border bg-card p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">AL</div>
            <div>
              <div className="text-sm font-semibold text-foreground">Alex Lee</div>
              <div className="text-xs text-muted-foreground">@alexlee</div>
            </div>
          </div>
          <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
        </div>
        <p className="mt-4 text-sm text-foreground leading-relaxed">Just shipped our first feature in 2 hours using this platform. Mind blown. This is what dev tools should feel like.</p>
      </div>
      <div className="mb-6 break-inside-avoid rounded-xl border bg-card p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">RN</div>
            <div>
              <div className="text-sm font-semibold text-foreground">Rachel Nguyen</div>
              <div className="text-xs text-muted-foreground">@racheln</div>
            </div>
          </div>
          <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
        </div>
        <p className="mt-4 text-sm text-foreground leading-relaxed">We've tried every platform out there. This is the only one that actually delivers on its promises. No BS, just results. Our team loves it and our customers are happier than ever.</p>
      </div>
      <div className="mb-6 break-inside-avoid rounded-xl border bg-card p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">DM</div>
            <div>
              <div className="text-sm font-semibold text-foreground">David Miller</div>
              <div className="text-xs text-muted-foreground">@davidm</div>
            </div>
          </div>
          <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
        </div>
        <p className="mt-4 text-sm text-foreground leading-relaxed">The support team is incredible. They helped us migrate our entire stack in a weekend.</p>
      </div>
      <div className="mb-6 break-inside-avoid rounded-xl border bg-card p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">SC</div>
            <div>
              <div className="text-sm font-semibold text-foreground">Sofia Chen</div>
              <div className="text-xs text-muted-foreground">@sofiachen</div>
            </div>
          </div>
          <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
        </div>
        <p className="mt-4 text-sm text-foreground leading-relaxed">10x improvement in our build times. This tool pays for itself in saved developer hours.</p>
      </div>
      <div className="mb-6 break-inside-avoid rounded-xl border bg-card p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">TB</div>
            <div>
              <div className="text-sm font-semibold text-foreground">Tom Brown</div>
              <div className="text-xs text-muted-foreground">@tombrown</div>
            </div>
          </div>
          <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
        </div>
        <p className="mt-4 text-sm text-foreground leading-relaxed">Finally, a platform that understands modern development workflows. The CLI is chef's kiss.</p>
      </div>
      <div className="mb-6 break-inside-avoid rounded-xl border bg-card p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">LP</div>
            <div>
              <div className="text-sm font-semibold text-foreground">Lisa Park</div>
              <div className="text-xs text-muted-foreground">@lisapark</div>
            </div>
          </div>
          <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
        </div>
        <p className="mt-4 text-sm text-foreground leading-relaxed">Best investment we made this year.</p>
      </div>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      masonry: 'mx-auto mt-16 columns-1 gap-6 sm:columns-2 lg:columns-3',
      card: 'mb-6 break-inside-avoid rounded-xl border bg-card p-6',
      header: 'flex items-start justify-between gap-3',
      author: 'flex items-center gap-3',
      quote: 'mt-4 text-sm text-foreground leading-relaxed',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-labelledby', 'aria-hidden'],
      keyboardNav: 'N/A — content',
      contrastRatio: '7:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'section', headingLevel: 'h2' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'lg'] },
    quality: {
      antiGeneric: [
        'masonry layout with CSS columns',
        'Twitter icon for social proof',
        'varied content lengths for natural flow',
        'break-inside-avoid prevents card splitting',
      ],
      inspirationSource: 'Testimonial.to wall of love',
      craftDetails: [
        'columns-1 → columns-2 → columns-3 responsive',
        'mb-6 for vertical spacing between cards',
        'gap-6 for gutter between columns',
      ],
    },
  },
  {
    id: 'testimonial-featured',
    name: 'Featured Testimonial',
    category: 'organism',
    type: 'testimonial',
    variant: 'featured',
    tags: ['testimonial', 'featured', 'large', 'quote'],
    mood: ['premium', 'editorial', 'bold'],
    industry: ['saas', 'agency', 'general'],
    visualStyles: ['minimal-editorial', 'dark-premium'],
    jsx: `<section className="py-20 sm:py-28" aria-labelledby="featured-testimonial-heading">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-muted/50 to-muted px-8 py-16 sm:px-12 sm:py-20 lg:px-16">
      <svg className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 text-primary/5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
      <div className="relative">
        <blockquote>
          <p className="text-2xl font-medium text-foreground leading-relaxed sm:text-3xl lg:text-4xl">"This platform has fundamentally changed how we think about product development. What used to take weeks now takes days. Our entire engineering culture has shifted towards shipping faster and iterating smarter."</p>
        </blockquote>
        <div className="mt-10 flex items-center gap-6">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center text-lg font-bold text-foreground">AM</div>
          <div>
            <div className="text-base font-semibold text-foreground">Anna Martinez</div>
            <div className="text-sm text-muted-foreground">Co-Founder & CEO, InnovateNow</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      container:
        'relative overflow-hidden rounded-3xl border bg-gradient-to-br from-muted/50 to-muted px-8 py-16 sm:px-12 sm:py-20 lg:px-16',
      quoteIcon: 'absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 text-primary/5',
      quote: 'text-2xl font-medium text-foreground leading-relaxed sm:text-3xl lg:text-4xl',
      author: 'mt-10 flex items-center gap-6',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-labelledby', 'aria-hidden'],
      keyboardNav: 'N/A — content',
      contrastRatio: '7:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'section', headingLevel: 'h2' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'lg'] },
    quality: {
      antiGeneric: [
        'large quote marks as decorative background',
        'gradient background for visual interest',
        'text-2xl → text-4xl responsive quote size',
        'rounded-3xl for premium feel',
      ],
      inspirationSource: 'Linear featured testimonials',
      craftDetails: [
        'overflow-hidden clips decorative quote',
        'relative positioning for layering',
        'h-16 w-16 larger avatar for featured treatment',
      ],
    },
  },
  {
    id: 'testimonial-video',
    name: 'Video Testimonials',
    category: 'organism',
    type: 'testimonial',
    variant: 'video',
    tags: ['testimonial', 'video', 'multimedia'],
    mood: ['professional', 'bold'],
    industry: ['saas', 'agency', 'ecommerce'],
    visualStyles: ['soft-depth', 'corporate-trust'],
    jsx: `<section className="py-20 sm:py-28" aria-labelledby="video-testimonials-heading">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
      <h2 id="video-testimonials-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Hear from our customers</h2>
      <p className="mt-4 text-lg text-muted-foreground">Real stories from real people who transformed their business.</p>
    </div>
    <div className="mx-auto mt-16 grid max-w-6xl gap-8 lg:grid-cols-2">
      <div className="group rounded-2xl border bg-card overflow-hidden">
        <div className="relative aspect-video bg-muted">
          <button type="button" className="absolute inset-0 flex items-center justify-center transition-transform group-hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-label="Play video testimonial from Sarah Chen">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90">
              <svg className="h-6 w-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </button>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full border-2 border-white/20 bg-muted flex items-center justify-center text-xs font-semibold text-white">SC</div>
              <div>
                <div className="text-sm font-semibold text-white">Sarah Chen</div>
                <div className="text-xs text-white/80">Head of Product, TechFlow</div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <p className="text-sm text-muted-foreground leading-relaxed">"Implementing this solution reduced our time-to-market by 60%. The ROI was clear within the first month."</p>
        </div>
      </div>
      <div className="group rounded-2xl border bg-card overflow-hidden">
        <div className="relative aspect-video bg-muted">
          <button type="button" className="absolute inset-0 flex items-center justify-center transition-transform group-hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-label="Play video testimonial from Marcus Johnson">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90">
              <svg className="h-6 w-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </button>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full border-2 border-white/20 bg-muted flex items-center justify-center text-xs font-semibold text-white">MJ</div>
              <div>
                <div className="text-sm font-semibold text-white">Marcus Johnson</div>
                <div className="text-xs text-white/80">CTO, DataScale</div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <p className="text-sm text-muted-foreground leading-relaxed">"The scalability and performance exceeded our expectations. We went from 1K to 1M users seamlessly."</p>
        </div>
      </div>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      grid: 'mx-auto mt-16 grid max-w-6xl gap-8 lg:grid-cols-2',
      card: 'group rounded-2xl border bg-card overflow-hidden',
      videoWrapper: 'relative aspect-video bg-muted',
      playButton: 'absolute inset-0 flex items-center justify-center group-hover:scale-105',
      playIcon: 'flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg',
      gradient: 'absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent',
      overlay: 'absolute bottom-0 left-0 right-0 p-4',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-labelledby', 'aria-label', 'aria-hidden'],
      keyboardNav: 'Tab to play button, Enter/Space to play',
      contrastRatio: '7:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'section', headingLevel: 'h2' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'lg'] },
    quality: {
      antiGeneric: [
        'aspect-video for 16:9 ratio',
        'gradient overlay for text legibility',
        'play button with hover scale effect',
        'author info overlaid on video',
      ],
      inspirationSource: 'Loom testimonials',
      craftDetails: [
        'group-hover:scale-105 on play button',
        'shadow-lg on play icon for depth',
        'ml-0.5 to optically center play triangle',
      ],
    },
  },
];
