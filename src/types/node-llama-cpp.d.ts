/**
 * Minimal type declarations for node-llama-cpp (optional dependency).
 * The full library is only loaded at runtime when model files are available.
 */
declare module 'node-llama-cpp' {
  export function getLlama(): Promise<Llama>;

  export interface Llama {
    loadModel(opts: { modelPath: string }): Promise<LlamaModel>;
  }

  export interface LlamaModel {
    createContext(): Promise<LlamaContext>;
    dispose(): Promise<void>;
  }

  export interface LlamaContext {
    getSequence(): LlamaContextSequence;
    dispose(): Promise<void>;
  }

  export interface LlamaContextSequence {
    // Context sequence methods used by LlamaChatSession
    readonly context: LlamaContext;
  }

  export class LlamaChatSession {
    constructor(opts: { contextSequence: LlamaContextSequence });
    prompt(text: string, opts?: { maxTokens?: number; temperature?: number }): Promise<string>;
    dispose(): Promise<void>;
  }
}
