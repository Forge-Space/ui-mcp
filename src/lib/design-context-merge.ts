import type { IDesignContext } from '@forgespace/siza-gen';

export function deepMergeContext(base: IDesignContext, override: Partial<IDesignContext>): IDesignContext {
  return {
    typography: override.typography ? { ...base.typography, ...override.typography } : base.typography,
    colorPalette: override.colorPalette ? { ...base.colorPalette, ...override.colorPalette } : base.colorPalette,
    spacing: override.spacing ? { ...base.spacing, ...override.spacing } : base.spacing,
    borderRadius: override.borderRadius ? { ...base.borderRadius, ...override.borderRadius } : base.borderRadius,
    shadows: override.shadows ? { ...base.shadows, ...override.shadows } : base.shadows,
    iconSet: override.iconSet ?? base.iconSet,
    animationLib: override.animationLib ?? base.animationLib,
    buttonVariants: override.buttonVariants ?? base.buttonVariants,
  };
}
