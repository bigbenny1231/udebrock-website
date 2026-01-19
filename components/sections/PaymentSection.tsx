"use client";

import { motion } from "framer-motion";
import { CreditCard, CheckCircle, FileText, ExternalLink } from "lucide-react";
import PaymentButton from "@/components/PaymentButton";

export default function PaymentSection() {
  return (
    <section id="payment" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block text-antique-600 font-semibold mb-4"
            >
              Secure Payments
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-forest-700 mb-4"
            >
              Pay Your Invoice
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-walnut-600"
            >
              Secure online payment processing powered by Square
            </motion.p>
          </div>

          {/* Payment Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-cream rounded-2xl shadow-lg p-8 md:p-12"
          >
            {/* How It Works */}
            <div className="mb-10">
              <h3 className="font-bold text-xl text-walnut-800 mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-antique-500" />
                How It Works
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-forest-500 text-cream rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-walnut-800">
                      Receive Your Quote
                    </p>
                    <p className="text-walnut-600 text-sm">
                      We&apos;ll email you a detailed quote with your project
                      details
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-forest-500 text-cream rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-walnut-800">
                      Click the Payment Button Below
                    </p>
                    <p className="text-walnut-600 text-sm">
                      You&apos;ll be taken to our secure Square payment page
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-forest-500 text-cream rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-walnut-800">
                      Find & Pay Your Invoice
                    </p>
                    <p className="text-walnut-600 text-sm">
                      Enter your email or invoice number to access your payment
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <div className="text-center py-8 border-t border-walnut-200">
              <PaymentButton size="lg" />
              <p className="text-sm text-walnut-500 mt-4">
                Secured by Square • PCI Compliant • SSL Encrypted
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mt-10 pt-10 border-t border-walnut-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-forest-600" />
                </div>
                <h4 className="font-semibold text-walnut-800 mb-1">
                  Secure & Safe
                </h4>
                <p className="text-sm text-walnut-600">
                  Bank-level encryption protects your payment information
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CreditCard className="w-6 h-6 text-forest-600" />
                </div>
                <h4 className="font-semibold text-walnut-800 mb-1">
                  Multiple Payment Methods
                </h4>
                <p className="text-sm text-walnut-600">
                  Credit cards, debit cards, and digital wallets accepted
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-forest-600" />
                </div>
                <h4 className="font-semibold text-walnut-800 mb-1">
                  Instant Confirmation
                </h4>
                <p className="text-sm text-walnut-600">
                  Receive immediate email confirmation of your payment
                </p>
              </div>
            </div>

            {/* Help Text */}
            <div className="mt-8 p-4 bg-forest-50 rounded-lg border border-forest-200">
              <p className="text-forest-700 text-center text-sm">
                <strong>Need help?</strong> Contact us at{" "}
                <a
                  href="mailto:contact@udebrockfinishes.com"
                  className="underline hover:text-forest-800"
                >
                  contact@udebrockfinishes.com
                </a>{" "}
                or call{" "}
                <a
                  href="tel:+19896193317"
                  className="underline hover:text-forest-800"
                >
                  (989) 619-3317
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
