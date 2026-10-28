import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
  createContext,
  useContext,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import gsap from "gsap";
import { cn } from "@/libs/utils";

// -------------------------------------------------------------
// Variants Definition
// -------------------------------------------------------------
export const tooltipVariants = cva(
  "inline-flex items-center text-center font-medium leading-tight select-none shadow-xl pointer-events-auto transition-colors z-50",
  {
    variants: {
      variant: {
        dark: "bg-slate-900 text-white border border-slate-800 shadow-slate-950/40",
        light: "bg-white text-gray-900 border border-gray-200 shadow-gray-400/20",
        primary: "bg-indigo-600 text-white border border-indigo-500 shadow-indigo-950/30",
        secondary: "bg-indigo-500 text-white border border-indigo-400 shadow-indigo-900/30",
        outline:
          "bg-white/90 dark:bg-slate-900/90 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-slate-700 backdrop-blur-md shadow-lg",
        gradient:
          "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white border-0 shadow-purple-900/40",
        destructive: "bg-red-600 text-white border border-red-500 shadow-red-950/30",
        success: "bg-emerald-600 text-white border border-emerald-500 shadow-emerald-950/30",
      },
      size: {
        sm: "px-2.5 py-1 text-xs rounded-md",
        md: "px-3.5 py-1.5 text-sm rounded-lg",
        lg: "px-4.5 py-2.5 text-base rounded-xl",
      },
    },
    defaultVariants: {
      variant: "dark",
      size: "md",
    },
  }
);

export type TooltipPosition =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end";

export type TooltipAnimation =
  | "scaleIn"
  | "fadeIn"
  | "slideUp"
  | "bounceIn"
  | "none";

export interface TooltipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tooltipVariants> {
  content?: React.ReactNode;
  position?: TooltipPosition;
  delay?: number;
  delayHide?: number;
  arrow?: boolean;
  interactive?: boolean;
  animation?: TooltipAnimation;
  disabled?: boolean;
  trigger?: "hover" | "click" | "focus" | "manual";
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  wrapperClassName?: string;
  asChild?: boolean;
}

// -------------------------------------------------------------
// Arrow & Placement Helpers
// -------------------------------------------------------------
const positionStyles: Record<TooltipPosition, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2.5",
  "top-start": "bottom-full left-0 mb-2.5",
  "top-end": "bottom-full right-0 mb-2.5",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2.5",
  "bottom-start": "top-full left-0 mt-2.5",
  "bottom-end": "top-full right-0 mt-2.5",
  left: "right-full top-1/2 -translate-y-1/2 mr-2.5",
  right: "left-full top-1/2 -translate-y-1/2 ml-2.5",
};

const arrowPositions: Record<TooltipPosition, string> = {
  top: "-bottom-1.5 left-1/2 -translate-x-1/2 border-r border-b",
  "top-start": "-bottom-1.5 left-3 border-r border-b",
  "top-end": "-bottom-1.5 right-3 border-r border-b",
  bottom: "-top-1.5 left-1/2 -translate-x-1/2 border-l border-t",
  "bottom-start": "-top-1.5 left-3 border-l border-t",
  "bottom-end": "-top-1.5 right-3 border-l border-t",
  left: "-right-1.5 top-1/2 -translate-y-1/2 border-t border-r",
  right: "-left-1.5 top-1/2 -translate-y-1/2 border-b border-l",
};

const arrowVariantStyles: Record<
  NonNullable<VariantProps<typeof tooltipVariants>["variant"]>,
  string
> = {
  dark: "bg-slate-900 border-slate-800",
  light: "bg-white border-gray-200",
  primary: "bg-indigo-600 border-indigo-500",
  secondary: "bg-indigo-500 border-indigo-400",
  outline: "bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-700",
  gradient: "bg-purple-600 border-purple-500",
  destructive: "bg-red-600 border-red-500",
  success: "bg-emerald-600 border-emerald-500",
};

// -------------------------------------------------------------
// Compound Tooltip Context
// -------------------------------------------------------------
interface TooltipContextType {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  position: TooltipPosition;
  variant: NonNullable<VariantProps<typeof tooltipVariants>["variant"]>;
  size: NonNullable<VariantProps<typeof tooltipVariants>["size"]>;
  arrow: boolean;
  animation: TooltipAnimation;
  interactive: boolean;
  tooltipId: string;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  showTooltip: () => void;
  hideTooltip: () => void;
  toggleTooltip: () => void;
}

const TooltipContext = createContext<TooltipContextType | null>(null);

export const useTooltip = () => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error("useTooltip must be used within a Tooltip component");
  }
  return context;
};

// -------------------------------------------------------------
// Animation Helper using GSAP
// -------------------------------------------------------------
const runEntranceAnimation = (
  el: HTMLElement,
  animation: TooltipAnimation,
  position: TooltipPosition
) => {
  gsap.killTweensOf(el);

  switch (animation) {
    case "scaleIn":
      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.22, ease: "back.out(2)" }
      );
      break;
    case "fadeIn":
      gsap.fromTo(
        el,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: "power1.out" }
      );
      break;
    case "slideUp": {
      const isTop = position.startsWith("top");
      const isBottom = position.startsWith("bottom");
      const isLeft = position === "left";
      const isRight = position === "right";

      const fromVars: gsap.TweenVars = { opacity: 0 };
      if (isTop) fromVars.y = 8;
      else if (isBottom) fromVars.y = -8;
      else if (isLeft) fromVars.x = 8;
      else if (isRight) fromVars.x = -8;

      gsap.fromTo(
        el,
        fromVars,
        { x: 0, y: 0, opacity: 1, duration: 0.22, ease: "power2.out" }
      );
      break;
    }
    case "bounceIn":
      gsap.fromTo(
        el,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, ease: "bounce.out" }
      );
      break;
    case "none":
    default:
      gsap.set(el, { opacity: 1, scale: 1 });
      break;
  }
};

// -------------------------------------------------------------
// Main Tooltip Component (Supports both Simple & Compound API)
// -------------------------------------------------------------
export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      content,
      position = "top",
      variant = "dark",
      size = "md",
      delay = 150,
      delayHide = 100,
      arrow = true,
      interactive = false,
      animation = "scaleIn",
      disabled = false,
      trigger = "hover",
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      className,
      wrapperClassName,
      id,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledOpen !== undefined;
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLElement | null>(null);
    const uniqueId = useId();
    const tooltipId = id || `tooltip-${uniqueId}`;

    const updateOpen = useCallback(
      (newOpen: boolean) => {
        if (!isControlled) {
          setUncontrolledOpen(newOpen);
        }
        onOpenChange?.(newOpen);
      },
      [isControlled, onOpenChange]
    );

    const showTooltip = useCallback(() => {
      if (disabled) return;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (delay > 0) {
        timeoutRef.current = setTimeout(() => {
          updateOpen(true);
        }, delay);
      } else {
        updateOpen(true);
      }
    }, [disabled, delay, updateOpen]);

    const hideTooltip = useCallback(() => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (delayHide > 0) {
        timeoutRef.current = setTimeout(() => {
          updateOpen(false);
        }, delayHide);
      } else {
        updateOpen(false);
      }
    }, [delayHide, updateOpen]);

    const toggleTooltip = useCallback(() => {
      if (disabled) return;
      if (isOpen) {
        hideTooltip();
      } else {
        showTooltip();
      }
    }, [disabled, isOpen, hideTooltip, showTooltip]);

    // Animate on open state change
    useEffect(() => {
      if (isOpen && tooltipRef.current && animation !== "none") {
        runEntranceAnimation(tooltipRef.current, animation, position);
      }
    }, [isOpen, animation, position]);

    // Handle Escape key to dismiss
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isOpen) {
          updateOpen(false);
        }
      };
      if (isOpen) {
        window.addEventListener("keydown", handleKeyDown);
      }
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen, updateOpen]);

    // Cleanup timeout on unmount
    useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, []);

    // Check if children is compound (<TooltipTrigger /> / <TooltipContent />)
    const isCompound = content === undefined;

    const contextValue: TooltipContextType = {
      isOpen,
      setIsOpen: updateOpen,
      position,
      variant: variant || "dark",
      size: size || "md",
      arrow,
      animation,
      interactive,
      tooltipId,
      triggerRef,
      contentRef: tooltipRef,
      showTooltip,
      hideTooltip,
      toggleTooltip,
    };

    if (isCompound) {
      return (
        <TooltipContext.Provider value={contextValue}>
          <div
            ref={ref}
            className={cn("relative inline-flex items-center justify-center", wrapperClassName)}
            {...props}
          >
            {children}
          </div>
        </TooltipContext.Provider>
      );
    }

    // Simple API
    const handleMouseEnter = () => {
      if (trigger === "hover") showTooltip();
    };

    const handleMouseLeave = () => {
      if (trigger === "hover") hideTooltip();
    };

    const handleClick = () => {
      if (trigger === "click") toggleTooltip();
    };

    const handleFocus = () => {
      if (trigger === "focus" || trigger === "hover") showTooltip();
    };

    const handleBlur = () => {
      if (trigger === "focus" || trigger === "hover") hideTooltip();
    };

    return (
      <TooltipContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            "relative inline-flex items-center justify-center",
            wrapperClassName
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-describedby={isOpen ? tooltipId : undefined}
          {...props}
        >
          {children}

          {isOpen && (
            <div
              ref={(node) => {
                tooltipRef.current = node;
              }}
              id={tooltipId}
              role="tooltip"
              onMouseEnter={() => {
                if (interactive && trigger === "hover") {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                }
              }}
              onMouseLeave={() => {
                if (interactive && trigger === "hover") {
                  hideTooltip();
                }
              }}
              className={cn(
                "absolute whitespace-nowrap",
                positionStyles[position],
                tooltipVariants({ variant, size }),
                interactive ? "pointer-events-auto" : "pointer-events-none",
                className
              )}
            >
              {content}

              {arrow && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute w-2.5 h-2.5 rotate-45 pointer-events-none",
                    arrowPositions[position],
                    arrowVariantStyles[variant || "dark"]
                  )}
                />
              )}
            </div>
          )}
        </div>
      </TooltipContext.Provider>
    );
  }
);

Tooltip.displayName = "Tooltip";

// -------------------------------------------------------------
// Compound Components: TooltipTrigger & TooltipContent
// -------------------------------------------------------------
export interface TooltipTriggerProps
  extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

export const TooltipTrigger = React.forwardRef<HTMLElement, TooltipTriggerProps>(
  ({ children, asChild = false, className, ...props }, ref) => {
    const {
      showTooltip,
      hideTooltip,
      toggleTooltip,
      tooltipId,
      isOpen,
      triggerRef,
    } = useTooltip();

    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={(node: HTMLElement | null) => {
          (triggerRef as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onClick={toggleTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        aria-describedby={isOpen ? tooltipId : undefined}
        className={cn("inline-flex items-center cursor-pointer", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

TooltipTrigger.displayName = "TooltipTrigger";

export interface TooltipContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tooltipVariants> {
  position?: TooltipPosition;
  arrow?: boolean;
}

export const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  (
    {
      children,
      className,
      position: overridePosition,
      variant: overrideVariant,
      size: overrideSize,
      arrow: overrideArrow,
      ...props
    },
    ref
  ) => {
    const context = useTooltip();
    const position = overridePosition || context.position;
    const variant = overrideVariant || context.variant;
    const size = overrideSize || context.size;
    const arrow = overrideArrow !== undefined ? overrideArrow : context.arrow;

    if (!context.isOpen) return null;

    return (
      <div
        ref={(node) => {
          (context.contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        id={context.tooltipId}
        role="tooltip"
        onMouseEnter={() => {
          if (context.interactive) {
            context.showTooltip();
          }
        }}
        onMouseLeave={() => {
          if (context.interactive) {
            context.hideTooltip();
          }
        }}
        className={cn(
          "absolute whitespace-nowrap",
          positionStyles[position],
          tooltipVariants({ variant, size }),
          context.interactive ? "pointer-events-auto" : "pointer-events-none",
          className
        )}
        {...props}
      >
        {children}

        {arrow && (
          <span
            aria-hidden="true"
            className={cn(
              "absolute w-2.5 h-2.5 rotate-45 pointer-events-none",
              arrowPositions[position],
              arrowVariantStyles[variant || "dark"]
            )}
          />
        )}
      </div>
    );
  }
);

TooltipContent.displayName = "TooltipContent";
