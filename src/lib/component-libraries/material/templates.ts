/**
 * Material-UI Component Templates
 */

import type { IGeneratedFile, IDesignContext } from '../../types.js';

export interface MaterialTemplate {
  name: string;
  description: string;
  category: 'form' | 'navigation' | 'feedback' | 'layout' | 'data';
  packages: string[];
  files: MaterialTemplateFile[];
}

export interface MaterialTemplateFile {
  path: string;
  content: string;
  type: 'component' | 'hook' | 'utility' | 'test';
}

export const buttonTemplate: MaterialTemplate = {
  name: 'Button',
  description: 'Material Design button with ripple effect and variants',
  category: 'form',
  packages: ['@mui/material', '@emotion/react', '@emotion/styled'],
  files: [
    {
      path: 'components/ui/button.tsx',
      type: 'component',
      content: `import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"

export const PrimaryButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 3),
  fontWeight: 600,
}))

export { Button }
export type { ButtonProps } from "@mui/material/Button"`,
    },
  ],
};

export const textFieldTemplate: MaterialTemplate = {
  name: 'TextField',
  description: 'Material Design text field with label, helper text, and validation',
  category: 'form',
  packages: ['@mui/material', '@emotion/react', '@emotion/styled'],
  files: [
    {
      path: 'components/ui/text-field.tsx',
      type: 'component',
      content: `import TextField from "@mui/material/TextField"
import { styled } from "@mui/material/styles"

export const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius,
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}))

export { TextField }
export type { TextFieldProps } from "@mui/material/TextField"`,
    },
  ],
};

export const dialogTemplate: MaterialTemplate = {
  name: 'Dialog',
  description: 'Material Design dialog with title, content, and actions',
  category: 'feedback',
  packages: ['@mui/material', '@emotion/react', '@emotion/styled'],
  files: [
    {
      path: 'components/ui/dialog.tsx',
      type: 'component',
      content: `import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import { styled } from "@mui/material/styles"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}))

interface AppDialogProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children?: React.ReactNode
  actions?: React.ReactNode
}

export function AppDialog({ open, onClose, title, description, children, actions }: AppDialogProps) {
  return (
    <BootstrapDialog onClose={onClose} open={open}>
      {title && (
        <DialogTitle sx={{ m: 0, p: 2 }}>
          {title}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}
      <DialogContent dividers>
        {description && <DialogContentText>{description}</DialogContentText>}
        {children}
      </DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </BootstrapDialog>
  )
}

export { Dialog, DialogTitle, DialogContent, DialogActions }`,
    },
  ],
};

export const themeTemplate: MaterialTemplate = {
  name: 'Theme',
  description: 'Material-UI theme configuration with custom palette and typography',
  category: 'layout',
  packages: ['@mui/material', '@emotion/react', '@emotion/styled'],
  files: [
    {
      path: 'lib/theme.ts',
      type: 'utility',
      content: `import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb",
      light: "#60a5fa",
      dark: "#1d4ed8",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#64748b",
      light: "#94a3b8",
      dark: "#475569",
      contrastText: "#ffffff",
    },
    error: {
      main: "#ef4444",
    },
    warning: {
      main: "#f59e0b",
    },
    success: {
      main: "#22c55e",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
    },
  },
})

export default theme`,
    },
    {
      path: 'components/providers/theme-provider.tsx',
      type: 'component',
      content: `"use client"

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { theme } from "@/lib/theme"

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}`,
    },
  ],
};

export function getMaterialTemplates(): MaterialTemplate[] {
  return [buttonTemplate, textFieldTemplate, dialogTemplate, themeTemplate];
}

export function getMaterialTemplate(name: string): MaterialTemplate | undefined {
  return getMaterialTemplates().find((t) => t.name.toLowerCase() === name.toLowerCase());
}

export function generateMaterialComponent(
  templateName: string,
  _designContext: IDesignContext,
  _customizations?: Record<string, unknown>
): IGeneratedFile[] {
  const template = getMaterialTemplate(templateName);
  if (!template) throw new Error(`Material-UI template "${templateName}" not found`);
  return template.files.map((f) => ({ path: f.path, content: f.content }));
}
