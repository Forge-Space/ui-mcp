/**
 * shadcn/ui Component Templates
 *
 * Provides pre-built templates for shadcn/ui components with proper
 * TypeScript types, accessibility features, and responsive design.
 */

import type { IGeneratedFile, IDesignContext } from '../../types.js';

export interface ShadcnTemplate {
  name: string;
  description: string;
  category: 'form' | 'navigation' | 'feedback' | 'layout' | 'data' | 'media';
  dependencies: string[];
  files: ShadcnTemplateFile[];
}

export interface ShadcnTemplateFile {
  path: string;
  content: string;
  type: 'component' | 'hook' | 'utility' | 'test' | 'story';
}

/**
 * Button Component Template
 */
export const buttonTemplate: ShadcnTemplate = {
  name: 'Button',
  description: 'A versatile button component with multiple variants and sizes',
  category: 'form',
  dependencies: ['@radix-ui/react-slot', 'class-variance-authority', 'clsx', 'tailwind-merge'],
  files: [
    {
      path: 'components/ui/button.tsx',
      type: 'component',
      content: `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }`,
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

  it("applies variant classes correctly", () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByRole("button")
    expect(button).toHaveClass("bg-destructive")
  })

  it("is accessible", () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole("button")
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute("disabled")
  })
})`,
    },
    {
      path: 'components/ui/button.stories.tsx',
      type: 'story',
      content: `import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./button"

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Button",
  },
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost",
  },
}

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link",
  },
}

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small",
  },
}

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large",
  },
}

export const Icon: Story = {
  args: {
    size: "icon",
    children: "🔥",
  },
}`,
    },
  ],
};

/**
 * Card Component Template
 */
export const cardTemplate: ShadcnTemplate = {
  name: 'Card',
  description: 'A flexible card container with header, content, and footer sections',
  category: 'layout',
  dependencies: ['clsx', 'tailwind-merge'],
  files: [
    {
      path: 'components/ui/card.tsx',
      type: 'component',
      content: `import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }`,
    },
  ],
};

/**
 * Input Component Template
 */
export const inputTemplate: ShadcnTemplate = {
  name: 'Input',
  description: 'A flexible input component with validation and accessibility features',
  category: 'form',
  dependencies: ['clsx', 'tailwind-merge'],
  files: [
    {
      path: 'components/ui/input.tsx',
      type: 'component',
      content: `import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }`,
    },
  ],
};

/**
 * Get all shadcn templates
 */
export function getShadcnTemplates(): ShadcnTemplate[] {
  return [
    buttonTemplate,
    cardTemplate,
    inputTemplate,
    // Add more templates as needed
  ];
}

/**
 * Get template by name
 */
export function getShadcnTemplate(name: string): ShadcnTemplate | undefined {
  const templates = getShadcnTemplates();
  return templates.find((template) => template.name.toLowerCase() === name.toLowerCase());
}

/**
 * Generate shadcn component files
 */
export function generateShadcnComponent(
  templateName: string,
  designContext: IDesignContext,
  customizations?: Record<string, unknown>
): IGeneratedFile[] {
  const template = getShadcnTemplate(templateName);

  if (!template) {
    throw new Error(`Template "${templateName}" not found`);
  }

  return template.files.map((file) => ({
    path: file.path,
    content: applyDesignContext(file.content, designContext, customizations),
  }));
}

/**
 * Apply design context to template content
 */
function applyDesignContext(
  content: string,
  designContext: IDesignContext,
  customizations?: Record<string, unknown>
): string {
  let result = content;

  // Apply color palette customizations
  if (designContext.colorPalette) {
    const { primary, secondary, accent, destructive } = designContext.colorPalette;

    result = result.replace(/bg-primary/g, `bg-[${primary}]`);
    result = result.replace(/text-primary/g, `text-[${primary}]`);
    result = result.replace(/bg-secondary/g, `bg-[${secondary}]`);
    result = result.replace(/text-secondary/g, `text-[${secondary}]`);
    result = result.replace(/bg-accent/g, `bg-[${accent}]`);
    result = result.replace(/text-accent/g, `text-[${accent}]`);
    result = result.replace(/bg-destructive/g, `bg-[${destructive}]`);
    result = result.replace(/text-destructive/g, `text-[${destructive}]`);
  }

  // Apply typography customizations
  if (designContext.typography) {
    const { fontFamily } = designContext.typography;
    result = result.replace(/font-sans/g, `font-[${fontFamily}]`);
  }

  // Apply spacing customizations
  if (designContext.spacing) {
    const { unit: _unit } = designContext.spacing;
    // This would require more sophisticated parsing for Tailwind classes
    // For now, we'll keep the default spacing
  }

  // Apply customizations
  if (customizations) {
    Object.entries(customizations).forEach(([key, value]) => {
      const placeholder = new RegExp(`\\$\\{${key}\\}`, 'g');
      result = result.replace(placeholder, String(value));
    });
  }

  return result;
}
