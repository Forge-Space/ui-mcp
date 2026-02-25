export const reduxToolkitPattern = {
  id: 'redux-toolkit',
  name: 'Redux Toolkit Slice Pattern',
  code: `import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface EntityState {
  items: Record<string, Entity>;
  ids: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EntityState = {
  items: {},
  ids: [],
  status: 'idle',
  error: null,
};

export const fetchEntities = createAsyncThunk(
  'entities/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/entities');
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json();
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
    }
  }
);

const entitySlice = createSlice({
  name: 'entities',
  initialState,
  reducers: {
    addEntity(state, action: PayloadAction<Entity>) {
      state.items[action.payload.id] = action.payload;
      state.ids.push(action.payload.id);
    },
    removeEntity(state, action: PayloadAction<string>) {
      delete state.items[action.payload];
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEntities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEntities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        for (const entity of action.payload) {
          state.items[entity.id] = entity;
          state.ids.push(entity.id);
        }
      })
      .addCase(fetchEntities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { addEntity, removeEntity } = entitySlice.actions;
export default entitySlice.reducer;

interface Entity {
  id: string;
  [key: string]: unknown;
}`,
};
