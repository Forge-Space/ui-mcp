/**
 * Radix UI Component Templates
 *
 * Provides templates for Radix UI primitives with proper TypeScript types,
 * accessibility features, and composition patterns.
 */

import type { IGeneratedFile, IDesignContext } from '../../types.js';

export interface RadixTemplate {
  name: string;
  description: string;
  category: 'form' | 'navigation' | 'feedback' | 'layout' | 'data';
  primitives: string[];
  files: RadixTemplateFile[];
}

export interface RadixTemplateFile {
  path: string;
  content: string;
  type: 'component' | 'hook' | 'utility' | 'test' | 'story';
}

/**
 * Button Component Template (Radix Primitive)
 */
export const buttonTemplate: RadixTemplate = {
  name: 'Button',
  description: 'Accessible button primitive with full keyboard and screen reader support',
  category: 'form',
  primitives: ['@radix-ui/react-slot', '@radix-ui/react-focus-scope'],
  files: [
    {
      path: 'components/ui/button.tsx',
      type: 'component',
      content: `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

const Button = React.forwardRef<
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
        ref={ref}
        {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }`,
    },
    {
      path: 'components/ui/button.test.tsx',
      type: 'test',
      content: `import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Button } from "./button"

describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument()
  })

  it("handles click events", async () => {
    const handleClick = jest.fn()
    const user = userEvent.setup()

    render(<Button onClick={handleClick}>Click me</Button>)

    await user.click(screen.getByRole("button"))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("is accessible", () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole("button")
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute("disabled")
    expect(button).toHaveAttribute("aria-disabled", "true")
  })

  it("supports asChild prop", () => {
    render(
      <Button asChild>
        <span>Custom button content</span>
      </Button>
    )

    expect(screen.getByText("Custom button content")).toBeInTheDocument()
  })
})`,
    },
  ],
};

/**
 * Dialog Component Template (Radix Primitive)
 */
export const dialogTemplate: RadixTemplate = {
  name: 'Dialog',
  description: 'Accessible dialog primitive with overlay management and focus trapping',
  category: 'feedback',
  primitives: ['@radix-ui/react-dialog', '@radix-ui/react-portal'],
  files: [
    {
      path: 'components/ui/dialog.tsx',
      type: 'component',
      content: `import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogOverlay = DialogPrimitive.Overlay

const DialogContent = DialogPrimitive.Content

const DialogHeader = React.forwardRef<
  React.HTMLAttributes<HTMLDivElement>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
))
DialogHeader.displayName = "DialogHeader"

const DialogTitle = React.forwardRef<
  React.HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef<
  React.HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = "DialogDescription"

const DialogClose = DialogPrimitive.Close

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}

const DialogFooter = React.forwardRef<
  React.HTMLAttributes<HTMLDivElement>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
))
DialogFooter.displayName = "DialogFooter"`,
    },
  ],
};

/**
 * Dropdown Menu Component Template (Radix Primitive)
 */
export const dropdownMenuTemplate: RadixTemplate = {
  name: 'DropdownMenu',
  description: 'Accessible dropdown menu with keyboard navigation and submenus',
  category: 'navigation',
  primitives: ['@radix-ui/react-dropdown-menu', '@radix-ui/react-navigation-menu'],
  files: [
    {
      path: 'components/ui/dropdown-menu.tsx',
      type: 'component',
      content: `import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { ChevronDown, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuContent = DropdownMenuPrimitive.Content

const DropdownMenuItem = DropdownMenuPrimitive.Item

const DropdownMenuSeparator = DropdownMenuPrimitive.Separator

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuSubTrigger = DropdownMenuPrimitive.SubTrigger

const DropdownMenuSubContent = DropdownMenuPrimitive.SubContent

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}`,
    },
  ],
};

/**
 * Tooltip Component Template (Radix Primitive)
 */
export const tooltipTemplate: RadixTemplate = {
  name: 'Tooltip',
  description: 'Accessible tooltip primitive with positioning and delay options',
  category: 'feedback',
  primitives: ['@radix-ui/react-tooltip'],
  files: [
    {
      path: 'components/ui/tooltip.tsx',
      type: 'component',
      content: `import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = TooltipPrimitive.Content

export {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
}`,
    },
  ],
};

/**
 * Get all Radix templates
 */
export function getRadixTemplates(): RadixTemplate[] {
  return [
    buttonTemplate,
    dialogTemplate,
    dropdownMenuTemplate,
    tooltipTemplate,
    // Add more templates as needed
  ];
}

/**
 * Get template by name
 */
export function getRadixTemplate(name: string): RadixTemplate | undefined {
  const templates = getRadixTemplates();
  return templates.find((template) => template.name.toLowerCase() === name.toLowerCase());
}

/**
 * Generate Radix component files
 */
export function generateRadixComponent(
  templateName: string,
  designContext: IDesignContext,
  customizations?: Record<string, any>
): IGeneratedFile[] {
  const template = getRadixTemplate(templateName);

  if (!template) {
    throw new Error(`Template "${templateName}" not found`);
  }

  return template.files.map((file) => ({
    path: file.path,
    content: applyDesignContextToRadix(file.content, designContext, customizations),
  }));
}

/**
 * Apply design context to Radix template content
 */
function applyDesignContextToRadix(
  content: string,
  designContext: IDesignContext,
  customizations?: Record<string, any>
): string {
  let result = content;

  // Apply design context customizations
  if (designContext.colorPalette) {
    const { primary, secondary, accent } = designContext.colorPalette;

    // Radix components are typically unstyled, so we'd apply colors via CSS variables
    result = result.replace(/var\(--primary\)/g, `var(--primary, ${primary})`);
    result = result.replace(/var\(--secondary\)/g, `var(--secondary, ${secondary})`);
    result = result.replace(/var\(--accent\)/g, `var(--accent, ${accent})`);
  }

  // Apply customizations
  if (customizations) {
    Object.entries(customizations).forEach(([key, value]) => {
      const placeholder = new RegExp(`\\${key}`, 'g');
      result = result.replace(placeholder, String(value));
    });
  }

  return result;
}
