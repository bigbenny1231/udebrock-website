# Square Payment Link Setup

## Get Your Square Payment Link:

1. Go to [Square Dashboard](https://squareup.com/dashboard)
2. Navigate to **Payments** → **Payment Links** (or **Invoices**)
3. You can either:
   - **Use your main business payment page** (customers can look up their invoice)
   - **Create a dedicated payment link** for deposits/invoices

## Add to Your `.env`:

```env
NEXT_PUBLIC_SQUARE_PAYMENT_URL=https://square.link/u/YOUR_LINK_HERE
```

Or if using your main Square page:
```env
NEXT_PUBLIC_SQUARE_PAYMENT_URL=https://squareup.com/pay/YOUR_BUSINESS_NAME
```

## How It Works for Customers:

1. Customer clicks "Pay Invoice" button on your website
2. Taken to your Square payment page
3. They enter their email or invoice number
4. Square finds their invoice
5. They pay securely through Square
6. You both get instant confirmation

## Benefits:

✅ No API keys needed - completely secure  
✅ Square handles all payment processing  
✅ Customers can look up their own invoices  
✅ PCI compliant automatically  
✅ Works with all payment methods  
✅ No maintenance required  

## Example URLs:

- **Payment Link:** `https://square.link/u/abcd1234`
- **Business Page:** `https://squareup.com/pay/udebrock-finishes`
- **Invoice Page:** `https://squareup.com/invoices/preview/abc123`

Just paste whichever URL works best for your business!
