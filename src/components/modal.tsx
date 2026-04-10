"use client"

import { useState, type ReactNode } from "react"
import { X } from "lucide-react"

interface ModalProps {
  trigger: ReactNode
  title: string
  description: string
}

export function Modal({ trigger, title, description }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{trigger}</div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-card text-card-foreground rounded-xl shadow-lg max-w-md w-full border border-border">
            <div className="flex justify-between items-center p-6 border-b border-border">
              <h3 className="text-lg font-semibold">{title}</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-muted-foreground mb-4">{description}</p>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-sm font-medium text-foreground mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  className="w-full px-3 py-2 border border-input bg-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand"
                  placeholder="Enter amount"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border border-input rounded-md text-sm font-medium text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-brand"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-brand text-brand-foreground rounded-md text-sm font-medium hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-brand"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

