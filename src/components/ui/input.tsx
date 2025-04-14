
import * as React from "react"
import { useCallback } from "react"
import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  formatAs?: "creditCard" | "expiryDate"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, formatAs, onChange, value, ...props }, ref) => {
    // Handle credit card formatting
    const handleCreditCardChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const inputVal = e.target.value.replace(/\D/g, ''); // Remove non-digits
      if (inputVal.length > 16) return; // Limit to 16 digits
      
      // Format with spaces every 4 digits
      let formattedValue = '';
      for (let i = 0; i < inputVal.length; i++) {
        if (i > 0 && i % 4 === 0) formattedValue += ' ';
        formattedValue += inputVal[i];
      }
      
      e.target.value = formattedValue;
      onChange?.(e);
    }, [onChange]);

    // Handle expiry date formatting
    const handleExpiryDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const inputVal = e.target.value.replace(/\D/g, ''); // Remove non-digits
      if (inputVal.length > 4) return; // Limit to 4 digits (MMYY)
      
      let formattedValue = inputVal;
      // Add slash after first 2 digits
      if (inputVal.length > 2) {
        formattedValue = inputVal.substring(0, 2) + '/' + inputVal.substring(2);
      }
      
      e.target.value = formattedValue;
      onChange?.(e);
    }, [onChange]);

    // Choose which handler to use based on formatAs prop
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (formatAs === "creditCard") {
        handleCreditCardChange(e);
      } else if (formatAs === "expiryDate") {
        handleExpiryDateChange(e);
      } else {
        onChange?.(e);
      }
    }, [formatAs, handleCreditCardChange, handleExpiryDateChange, onChange]);

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        onChange={handleChange}
        value={value}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
