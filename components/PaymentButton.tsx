"use client";

import Link from "next/link";
import { ExternalLink, CreditCard } from "lucide-react";

interface PaymentButtonProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function PaymentButton({
  variant = "primary",
  size = "md",
  className = "",
}: PaymentButtonProps) {
  const squareUrl = process.env.NEXT_PUBLIC_SQUARE_PAYMENT_URL;

  if (!squareUrl) {
    return null; // Don't show button if URL not configured
  }

  const sizeClasses = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg",
  };

  const variantClasses = {
    primary:
      "bg-antique-500 hover:bg-antique-400 text-walnut-900 shadow-md hover:shadow-lg",
    secondary:
      "bg-forest-500 hover:bg-forest-400 text-cream shadow-md hover:shadow-lg",
  };

  return (
    <Link
      href={squareUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      <CreditCard className="w-5 h-5" />
      Pay Invoice
      <ExternalLink className="w-4 h-4" />
    </Link>
  );
}
