import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";
import { cn } from "./../../libs/utils";

const InputOTP = ({ className, containerClassName, ...props }) => (
  <OTPInput
    containerClassName={cn(
      "flex items-center has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
);
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        "relative h-10 w-10 text-center text-sm",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className
      )}
      {...props}
    >
      <input
        className={cn(
          "absolute inset-0 h-full w-full rounded-md border border-input bg-transparent text-center text-sm transition-all",
          isActive && "border-primary"
        )}
        value={char}
        disabled={props.disabled}
      />
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center animate-caret-blink">
          <div className="h-4 w-px bg-foreground duration-150" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = ({ ...props }) => (
  <div role="separator" {...props}>
    <Dot />
  </div>
);
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }; 