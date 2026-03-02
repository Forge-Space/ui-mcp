/**
 * DashboardPayments — reference component for payments dashboard UI.
 * Matches generate_ui_component style: React, Tailwind, shadcn-like structure.
 * Used by tests and as target for generate_ui_component("dashboard_payments").
 */

import type { ReactNode } from 'react';

export interface PaymentItem {
  id: string;
  description: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'refunded';
  date: string;
}

export interface DashboardPaymentsProps {
  title?: string;
  items?: PaymentItem[];
  onRefund?: (paymentId: string) => void;
  className?: string;
  children?: ReactNode;
}

const defaultItems: PaymentItem[] = [
  { id: 'pay-1', description: 'Subscription', amount: 2999, currency: 'BRL', status: 'completed', date: '2025-03-01' },
  { id: 'pay-2', description: 'Refund', amount: -500, currency: 'BRL', status: 'refunded', date: '2025-02-28' },
];

function formatAmount(amount: number, currency: string): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  }).format(amount / 100);
}

export function DashboardPayments({
  title = 'Payments',
  items = defaultItems,
  onRefund,
  className = '',
}: DashboardPaymentsProps) {
  return (
    <div className={`rounded-lg border border-border bg-card text-card-foreground shadow-sm ${className}`.trim()}>
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="divide-y divide-border">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 gap-4"
            role="row"
            aria-label={`Payment ${item.id} ${item.description}`}
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{item.description}</p>
              <p className="text-sm text-muted-foreground">{item.date}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`font-mono text-sm ${item.amount >= 0 ? 'text-foreground' : 'text-destructive'}`}>
                {formatAmount(item.amount, item.currency)}
              </span>
              <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground">
                {item.status}
              </span>
              {onRefund && item.status === 'completed' && (
                <button
                  type="button"
                  onClick={() => onRefund(item.id)}
                  className="text-sm text-destructive hover:underline focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  Refund
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPayments;
