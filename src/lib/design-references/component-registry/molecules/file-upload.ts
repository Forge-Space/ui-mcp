import type { IComponentSnippet } from '../types.js';

export const fileUploadSnippets: IComponentSnippet[] = [
  {
    id: 'file-upload-dropzone',
    name: 'Dropzone Upload',
    category: 'molecule',
    type: 'file-upload',
    variant: 'dropzone',
    tags: ['drag-drop', 'upload', 'file', 'input'],
    mood: ['energetic', 'futuristic'],
    industry: ['general', 'saas', 'media'],
    visualStyles: ['soft-depth', 'soft-depth'],
    jsx: `<div className="w-full max-w-md rounded-lg border-2 border-dashed border-border bg-muted/30 p-8 text-center transition-colors hover:border-primary hover:bg-accent/50">
  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
    <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
  </div>
  <h3 className="mb-2 text-sm font-semibold text-foreground">Drop files here</h3>
  <p className="mb-4 text-xs text-muted-foreground">or click to browse from your computer</p>
  <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/90">
    Select Files
  </button>
  <p className="mt-3 text-xs text-muted-foreground">Supports: JPG, PNG, PDF (max 10MB)</p>
</div>`,
    tailwindClasses: {
      dropzone:
        'w-full max-w-md rounded-lg border-2 border-dashed border-border bg-muted/30 p-8 text-center transition-colors hover:border-primary hover:bg-accent/50',
      icon: 'mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10',
      title: 'mb-2 text-sm font-semibold text-foreground',
      description: 'mb-4 text-xs text-muted-foreground',
      button: 'rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/90',
      hint: 'mt-3 text-xs text-muted-foreground',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-label=Upload files'],
      keyboardNav: 'Tab to button, Enter to select files, drag and drop supported',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input[type=file]' },
    responsive: { strategy: 'mobile-first', breakpoints: ['max-w-md for dropzone width'] },
    quality: {
      antiGeneric: ['border-2 border-dashed for visual distinction', 'hover:border-primary for interactive feedback'],
      inspirationSource: 'react-dropzone pattern',
      craftDetails: ['rounded-full bg-primary/10 for icon background', 'transition-colors for smooth hover'],
    },
  },
  {
    id: 'file-upload-button',
    name: 'Button Upload',
    category: 'molecule',
    type: 'file-upload',
    variant: 'button',
    tags: ['button', 'upload', 'simple', 'input'],
    mood: ['minimal', 'professional'],
    industry: ['general', 'saas', 'saas'],
    visualStyles: ['minimal-editorial', 'linear-modern'],
    jsx: `<div className="flex items-center gap-3">
  <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
    <span>Choose File</span>
    <input type="file" className="hidden" />
  </label>
  <span className="text-sm text-muted-foreground">No file selected</span>
</div>`,
    tailwindClasses: {
      container: 'flex items-center gap-3',
      label:
        'inline-flex cursor-pointer items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
      input: 'hidden',
      status: 'text-sm text-muted-foreground',
    },
    a11y: {
      roles: [],
      ariaAttributes: ['aria-label=Choose file'],
      keyboardNav: 'Tab to label, Enter opens file picker',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input[type=file]' },
    responsive: { strategy: 'mobile-first', breakpoints: ['gap-3 for label-status spacing'] },
    quality: {
      antiGeneric: ['cursor-pointer on label for UX', 'hidden input with label association'],
      inspirationSource: 'Standard HTML file input pattern',
      craftDetails: ['inline-flex items-center gap-2 for icon-text alignment', 'transition-colors for hover feedback'],
    },
  },
  {
    id: 'file-upload-avatar',
    name: 'Avatar Upload',
    category: 'molecule',
    type: 'file-upload',
    variant: 'avatar',
    tags: ['avatar', 'saas', 'image', 'upload'],
    mood: ['professional', 'professional'],
    industry: ['media', 'saas', 'saas'],
    visualStyles: ['soft-depth', 'gradient-mesh'],
    jsx: `<div className="flex items-center gap-4">
  <div className="relative h-24 w-24">
    <div className="h-full w-full overflow-hidden rounded-full border-2 border-border bg-muted">
      <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-muted-foreground">
        JD
      </div>
    </div>
    <label className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground transition-colors hover:bg-primary/90">
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      <input type="file" accept="image/*" className="hidden" />
    </label>
  </div>
  <div>
    <h4 className="text-sm font-semibold text-foreground">Profile Photo</h4>
    <p className="mt-1 text-xs text-muted-foreground">JPG, PNG or GIF (max 2MB)</p>
    <button className="mt-2 text-xs text-destructive transition-colors hover:underline">Remove</button>
  </div>
</div>`,
    tailwindClasses: {
      container: 'flex items-center gap-4',
      avatarWrapper: 'relative h-24 w-24',
      avatar: 'h-full w-full overflow-hidden rounded-full border-2 border-border bg-muted',
      placeholder: 'flex h-full w-full items-center justify-center text-2xl font-semibold text-muted-foreground',
      uploadButton:
        'absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground transition-colors hover:bg-primary/90',
      input: 'hidden',
      info: 'text-sm font-semibold text-foreground',
      hint: 'mt-1 text-xs text-muted-foreground',
      remove: 'mt-2 text-xs text-destructive transition-colors hover:underline',
    },
    a11y: {
      roles: [],
      ariaAttributes: ['aria-label=Upload profile photo'],
      keyboardNav: 'Tab to upload button, Enter opens file picker',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input[type=file]' },
    responsive: { strategy: 'mobile-first', breakpoints: ['h-24 w-24 for avatar size'] },
    quality: {
      antiGeneric: ['absolute bottom-0 right-0 for badge positioning', 'rounded-full for circular avatar'],
      inspirationSource: 'Profile photo upload patterns',
      craftDetails: ['border-2 border-card for upload button outline', 'accept=image/* for file type filtering'],
    },
  },
  {
    id: 'file-upload-progress',
    name: 'Progress Upload',
    category: 'molecule',
    type: 'file-upload',
    variant: 'linear-modern',
    tags: ['linear-modern', 'upload', 'status', 'loading'],
    mood: ['professional', 'energetic'],
    industry: ['saas', 'devtools', 'media'],
    visualStyles: ['linear-modern', 'soft-depth'],
    jsx: `<div className="w-full max-w-md space-y-3">
  <div className="rounded-lg border border-border bg-card p-4">
    <div className="mb-3 flex items-start gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
        <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-card-foreground truncate">project-proposal.pdf</p>
        <p className="text-xs text-muted-foreground">2.4 MB • 65% uploaded</p>
      </div>
      <button className="rounded-sm p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
      <div className="h-full w-2/3 rounded-full bg-primary transition-all duration-300"></div>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'w-full max-w-md space-y-3',
      fileCard: 'rounded-lg border border-border bg-card p-4',
      fileHeader: 'mb-3 flex items-start gap-3',
      fileIcon: 'flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10',
      fileInfo: 'flex-1 min-w-0',
      fileName: 'text-sm font-medium text-card-foreground truncate',
      fileStatus: 'text-xs text-muted-foreground',
      progressBar: 'h-1.5 overflow-hidden rounded-full bg-muted',
      progressFill: 'h-full rounded-full bg-primary transition-all duration-300',
    },
    a11y: {
      roles: ['progressbar'],
      ariaAttributes: ['role=progressbar', 'aria-valuenow=65', 'aria-valuemin=0', 'aria-valuemax=100'],
      keyboardNav: 'Tab to cancel button',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'linear-modern' },
    responsive: { strategy: 'mobile-first', breakpoints: ['max-w-md for file card'] },
    quality: {
      antiGeneric: ['truncate for long filenames', 'transition-all duration-300 for smooth progress'],
      inspirationSource: 'Dropbox upload progress',
      craftDetails: ['min-w-0 for proper truncation', 'h-1.5 thin progress bar'],
    },
  },
  {
    id: 'file-upload-multi',
    name: 'Multi-File Upload',
    category: 'molecule',
    type: 'file-upload',
    variant: 'multi',
    tags: ['multiple', 'batch', 'upload', 'minimal-editorial'],
    mood: ['professional', 'professional'],
    industry: ['saas', 'devtools', 'media'],
    visualStyles: ['soft-depth', 'minimal-editorial'],
    jsx: `<div className="w-full max-w-md">
  <div className="mb-3 rounded-lg border-2 border-dashed border-border bg-muted/30 p-6 text-center">
    <label className="cursor-pointer">
      <svg className="mx-auto mb-2 h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
      <p className="text-sm text-foreground">Add files</p>
      <input type="file" multiple className="hidden" />
    </label>
  </div>
  <div className="space-y-2">
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
      <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-card-foreground truncate">document1.pdf</p>
        <p className="text-xs text-muted-foreground">1.2 MB</p>
      </div>
      <button className="rounded-sm p-1 text-muted-foreground transition-colors hover:text-destructive">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
      </button>
    </div>
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
      <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-card-foreground truncate">screenshot.png</p>
        <p className="text-xs text-muted-foreground">850 KB</p>
      </div>
      <button className="rounded-sm p-1 text-muted-foreground transition-colors hover:text-destructive">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
      </button>
    </div>
  </div>
  <div className="mt-4 flex justify-end gap-2">
    <button className="rounded-md bg-secondary px-4 py-2 text-sm text-secondary-foreground transition-colors hover:bg-secondary/80">Clear All</button>
    <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/90">Upload 2 Files</button>
  </div>
</div>`,
    tailwindClasses: {
      container: 'w-full max-w-md',
      dropzone: 'mb-3 rounded-lg border-2 border-dashed border-border bg-muted/30 p-6 text-center',
      fileList: 'space-y-2',
      fileItem: 'flex items-center gap-3 rounded-lg border border-border bg-card p-3',
      fileInfo: 'flex-1 min-w-0',
      fileName: 'text-sm font-medium text-card-foreground truncate',
      fileSize: 'text-xs text-muted-foreground',
      deleteButton: 'rounded-sm p-1 text-muted-foreground transition-colors hover:text-destructive',
      actions: 'mt-4 flex justify-end gap-2',
    },
    a11y: {
      roles: ['minimal-editorial'],
      ariaAttributes: ['role=list', 'role=listitem', 'aria-label=Delete file'],
      keyboardNav: 'Tab to add/delete buttons, Enter activates',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input[type=file]' },
    responsive: { strategy: 'mobile-first', breakpoints: ['max-w-md for file list'] },
    quality: {
      antiGeneric: ['space-y-2 for file list spacing', 'hover:text-destructive for delete feedback'],
      inspirationSource: 'File attachment patterns',
      craftDetails: ['min-w-0 for truncation', 'multiple attribute on input'],
    },
  },
];
