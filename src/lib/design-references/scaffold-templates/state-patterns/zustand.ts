export const zustandPatterns = {
  basic: {
    name: 'Basic Zustand Store',
    description: 'Simple state store with actions',
    code: `import { create } from 'zustand';

interface State {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCountStore = create<State>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));`,
  },

  withSelectors: {
    name: 'Zustand with Selectors',
    description: 'Store with optimized selectors to prevent re-renders',
    code: `import { create } from 'zustand';
import { createSelector } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
}

interface State {
  users: User[];
  addUser: (user: User) => void;
  removeUser: (id: string) => void;
  updateUser: (id: string, data: Partial<User>) => void;
}

export const useUserStore = create<State>((set) => ({
  users: [],
  addUser: (user) =>
    set((state) => ({ users: [...state.users, user] })),
  removeUser: (id) =>
    set((state) => ({ users: state.users.filter((u) => u.id !== id) })),
  updateUser: (id, data) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? { ...u, ...data } : u)),
    })),
}));

// Selectors
export const selectUserById = (id: string) =>
  createSelector(
    (state: State) => state.users,
    (users) => users.find((u) => u.id === id)
  );

export const selectUserCount = createSelector(
  (state: State) => state.users,
  (users) => users.length
);`,
  },

  withMiddleware: {
    name: 'Zustand with Middleware',
    description: 'Store with persist and devtools middleware',
    code: `import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface AuthState {
  user: { id: string; name: string } | null;
  token: string | null;
  login: (user: { id: string; name: string }, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        login: (user, token) => set({ user, token }),
        logout: () => set({ user: null, token: null }),
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({ user: state.user, token: state.token }),
      }
    )
  )
);`,
  },

  async: {
    name: 'Zustand with Async Actions',
    description: 'Store with async operations and loading states',
    code: `import { create } from 'zustand';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface State {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
}

export const useTodoStore = create<State>((set, get) => ({
  todos: [],
  loading: false,
  error: null,

  fetchTodos: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/todos');
      const todos = await response.json();
      set({ todos, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  addTodo: async (title) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      const newTodo = await response.json();
      set((state) => ({
        todos: [...state.todos, newTodo],
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  toggleTodo: async (id) => {
    const todo = get().todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      const response = await fetch(\`/api/todos/\${id}\`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      const updated = await response.json();
      set((state) => ({
        todos: state.todos.map((t) => (t.id === id ? updated : t)),
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));`,
  },

  slices: {
    name: 'Zustand with Slices',
    description: 'Modular store using slice pattern',
    code: `import { create } from 'zustand';

interface UserSlice {
  user: { id: string; name: string } | null;
  setUser: (user: { id: string; name: string } | null) => void;
}

interface SettingsSlice {
  theme: 'light' | 'dark';
  language: string;
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: string) => void;
}

const createUserSlice = (set: any): UserSlice => ({
  user: null,
  setUser: (user) => set({ user }),
});

const createSettingsSlice = (set: any): SettingsSlice => ({
  theme: 'light',
  language: 'en',
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
});

type StoreState = UserSlice & SettingsSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createUserSlice(...a),
  ...createSettingsSlice(...a),
}));`,
  },
};
