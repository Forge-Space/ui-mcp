import type { ITemplatePack } from '../types.js';

export const startupLandingPack: ITemplatePack = {
  id: 'startup-landing',
  name: 'Startup Landing',
  description:
    'Modern marketing site for startups inspired by Cal.com, Resend, ' +
    'and Clerk with landing, pricing, blog, and changelog',
  appType: 'marketing',
  pages: [
    {
      path: '/',
      compositionId: 'landing-hero-features',
      title: 'Home',
      isIndex: true,
    },
    {
      path: '/pricing',
      compositionId: 'pricing-tiers',
      title: 'Pricing',
      isIndex: false,
    },
    {
      path: '/blog',
      compositionId: 'blog-listing',
      title: 'Blog',
      isIndex: false,
    },
    {
      path: '/changelog',
      compositionId: 'changelog-page',
      title: 'Changelog',
      isIndex: false,
    },
  ],
  theme: {
    colorSystemId: 'zinc-manrope',
    fontPairingId: 'manrope-system',
    visualStyle: 'minimal-editorial',
    mood: 'minimal',
  },
  sharedComponents: ['nav-transparent-sticky', 'footer-newsletter-cta'],
  quality: {
    antiGeneric: [
      'Avoid generic "Build amazing things" or "Ship faster" hero text',
      'Skip vague feature descriptions without clear user benefits',
      'No stock photos of people pointing at laptops',
      'Avoid pricing tiers with "Most Popular" badge on middle option',
      'Skip meaningless social proof numbers without context',
    ],
    designPhilosophy:
      'Inspired by Cal.com, Resend, and Clerk: clear value proposition, ' +
      'minimal visual design with bold typography, purposeful white space, ' +
      'authentic social proof, concise feature explanations',
    inspirationSources: [
      'Cal.com (cal.com) - Clear hero, integrated demo',
      'Resend (resend.com) - Code-first positioning, clean pricing',
      'Clerk (clerk.com) - Developer-focused copy, minimal design',
    ],
  },
};
