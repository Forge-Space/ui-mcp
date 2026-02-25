export { zustandPatterns } from './zustand.js';
export { reduxToolkitPatterns } from './redux-toolkit.js';
export { tanstackQueryPatterns } from './tanstack-query.js';

export const stateManagementPatterns = {
  zustand: {
    name: 'Zustand',
    description: 'Lightweight state management with minimal boilerplate',
    pros: [
      'Simple API',
      'Small bundle size',
      'No boilerplate',
      'Good TypeScript support',
      'Easy to use with React hooks',
    ],
    cons: ['Less ecosystem/middleware than Redux', 'Manual optimization needed for large stores'],
    bestFor: ['Small to medium apps', 'Simple state needs', 'Quick prototyping'],
  },
  'redux-toolkit': {
    name: 'Redux Toolkit',
    description: 'Official Redux toolset with simplified patterns',
    pros: [
      'Large ecosystem',
      'Excellent DevTools',
      'Built-in middleware',
      'RTK Query for data fetching',
      'Industry standard',
    ],
    cons: ['More boilerplate than alternatives', 'Steeper learning curve', 'Larger bundle size'],
    bestFor: ['Large applications', 'Complex state logic', 'Team familiarity with Redux'],
  },
  'tanstack-query': {
    name: 'TanStack Query',
    description: 'Server state management with caching and synchronization',
    pros: [
      'Automatic caching',
      'Background refetching',
      'Optimistic updates',
      'Excellent TypeScript support',
      'Works with any data fetching library',
    ],
    cons: [
      'Only for server state',
      'Requires separate solution for client state',
      'Learning curve for advanced features',
    ],
    bestFor: ['API-heavy applications', 'Real-time data', 'Server state synchronization'],
  },
  jotai: {
    name: 'Jotai',
    description: 'Primitive and flexible state management',
    pros: [
      'Atomic state model',
      'No boilerplate',
      'Great TypeScript support',
      'Small bundle size',
      'React Suspense support',
    ],
    cons: ['Smaller ecosystem', 'Different mental model', 'Less documentation'],
    bestFor: ['Modern React apps', 'Atomic state needs', 'Suspense integration'],
  },
};
