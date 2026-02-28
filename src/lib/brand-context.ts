import { brandToDesignContext, designContextStore, type BrandIdentityInput } from '@forgespace/siza-gen';

export async function withBrandContext<T>(brandJson: string | undefined, fn: () => Promise<T>): Promise<T> {
  if (!brandJson) return fn();

  const previous = designContextStore.get();
  try {
    const brand: BrandIdentityInput = JSON.parse(brandJson);
    const partial = brandToDesignContext(brand);
    designContextStore.update(partial);
    return await fn();
  } finally {
    designContextStore.set(previous);
  }
}

export function withBrandContextSync<T>(brandJson: string | undefined, fn: () => T): T {
  if (!brandJson) return fn();

  const previous = designContextStore.get();
  try {
    const brand: BrandIdentityInput = JSON.parse(brandJson);
    const partial = brandToDesignContext(brand);
    designContextStore.update(partial);
    return fn();
  } finally {
    designContextStore.set(previous);
  }
}
