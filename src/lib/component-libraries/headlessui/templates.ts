/**
 * Headless UI Component Templates
 */

import type { IGeneratedFile, IDesignContext } from '../../types.js';

export interface HeadlessTemplate {
  name: string;
  description: string;
  category: 'form' | 'navigation' | 'feedback' | 'layout' | 'data';
  primitives: string[];
  files: HeadlessTemplateFile[];
}

export interface HeadlessTemplateFile {
  path: string;
  content: string;
  type: 'component' | 'hook' | 'utility' | 'test';
}

export const dialogTemplate: HeadlessTemplate = {
  name: 'Dialog',
  description: 'Accessible dialog with focus trapping and scroll locking',
  category: 'feedback',
  primitives: ['@headlessui/react'],
  files: [
    {
      path: 'components/ui/dialog.tsx',
      type: 'component',
      content: `"use client"

import { Fragment } from "react"
import { Dialog as HeadlessDialog, Transition } from "@headlessui/react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface DialogProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function Dialog({ open, onClose, title, description, children, className }: DialogProps) {
  return (
    <Transition appear show={open} as={Fragment}>
      <HeadlessDialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessDialog.Panel
                className={cn(
                  "w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all",
                  className
                )}
              >
                <div className="flex items-start justify-between">
                  {title && (
                    <HeadlessDialog.Title className="text-lg font-semibold leading-6 text-gray-900">
                      {title}
                    </HeadlessDialog.Title>
                  )}
                  <button
                    type="button"
                    className="ml-auto rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
                {description && (
                  <HeadlessDialog.Description className="mt-1 text-sm text-gray-500">
                    {description}
                  </HeadlessDialog.Description>
                )}
                <div className="mt-4">{children}</div>
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  )
}`,
    },
  ],
};

export const comboboxTemplate: HeadlessTemplate = {
  name: 'Combobox',
  description: 'Accessible combobox with search and keyboard navigation',
  category: 'form',
  primitives: ['@headlessui/react'],
  files: [
    {
      path: 'components/ui/combobox.tsx',
      type: 'component',
      content: `"use client"

import { useState } from "react"
import { Combobox as HeadlessCombobox, Transition } from "@headlessui/react"
import { Check, ChevronDown } from "lucide-react"
import { Fragment } from "react"
import { cn } from "@/lib/utils"

interface ComboboxOption {
  id: string | number
  label: string
  value: string
}

interface ComboboxProps {
  options: ComboboxOption[]
  value?: ComboboxOption | null
  onChange: (value: ComboboxOption) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function Combobox({ options, value, onChange, placeholder = "Select option...", disabled, className }: ComboboxProps) {
  const [query, setQuery] = useState("")

  const filtered = query === ""
    ? options
    : options.filter(opt =>
        opt.label.toLowerCase().includes(query.toLowerCase())
      )

  return (
    <HeadlessCombobox value={value} onChange={onChange} disabled={disabled}>
      <div className={cn("relative", className)}>
        <div className="relative w-full cursor-default overflow-hidden rounded-lg border border-gray-300 bg-white text-left shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <HeadlessCombobox.Input
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            displayValue={(opt: ComboboxOption) => opt?.label ?? ""}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
          />
          <HeadlessCombobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </HeadlessCombobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <HeadlessCombobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filtered.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filtered.map((opt) => (
                <HeadlessCombobox.Option
                  key={opt.id}
                  className={({ active }) =>
                    cn("relative cursor-default select-none py-2 pl-10 pr-4", active ? "bg-teal-600 text-white" : "text-gray-900")
                  }
                  value={opt}
                >
                  {({ selected, active }) => (
                    <>
                      <span className={cn("block truncate", selected ? "font-medium" : "font-normal")}>
                        {opt.label}
                      </span>
                      {selected && (
                        <span className={cn("absolute inset-y-0 left-0 flex items-center pl-3", active ? "text-white" : "text-teal-600")}>
                          <Check className="h-4 w-4" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </HeadlessCombobox.Option>
              ))
            )}
          </HeadlessCombobox.Options>
        </Transition>
      </div>
    </HeadlessCombobox>
  )
}`,
    },
  ],
};

export const tabsTemplate: HeadlessTemplate = {
  name: 'Tabs',
  description: 'Accessible tabs with keyboard navigation',
  category: 'navigation',
  primitives: ['@headlessui/react'],
  files: [
    {
      path: 'components/ui/tabs.tsx',
      type: 'component',
      content: `"use client"

import { Tab } from "@headlessui/react"
import { cn } from "@/lib/utils"

interface TabItem {
  label: string
  content: React.ReactNode
  disabled?: boolean
}

interface TabsProps {
  tabs: TabItem[]
  defaultIndex?: number
  onChange?: (index: number) => void
  className?: string
}

export function Tabs({ tabs, defaultIndex = 0, onChange, className }: TabsProps) {
  return (
    <Tab.Group defaultIndex={defaultIndex} onChange={onChange}>
      <Tab.List className={cn("flex space-x-1 rounded-xl bg-blue-900/20 p-1", className)}>
        {tabs.map((tab, idx) => (
          <Tab
            key={idx}
            disabled={tab.disabled}
            className={({ selected }) =>
              cn(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white text-blue-700 shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white",
                tab.disabled && "cursor-not-allowed opacity-50"
              )
            }
          >
            {tab.label}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-2">
        {tabs.map((tab, idx) => (
          <Tab.Panel
            key={idx}
            className="rounded-xl bg-white p-3 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
          >
            {tab.content}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}`,
    },
  ],
};

export function getHeadlessTemplates(): HeadlessTemplate[] {
  return [dialogTemplate, comboboxTemplate, tabsTemplate];
}

export function getHeadlessTemplate(name: string): HeadlessTemplate | undefined {
  return getHeadlessTemplates().find((t) => t.name.toLowerCase() === name.toLowerCase());
}

export function generateHeadlessComponent(
  templateName: string,
  designContext: IDesignContext,
  customizations?: Record<string, any>
): IGeneratedFile[] {
  const template = getHeadlessTemplate(templateName);
  if (!template) throw new Error(`Headless UI template "${templateName}" not found`);
  return template.files.map((f) => ({ path: f.path, content: f.content }));
}
