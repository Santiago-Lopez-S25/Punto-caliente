import React from "react";
import classNames from "classnames";

const classes = {
  root: "inline-flex items-center justify-center shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-0 focus:shadow focus:ring-1",
  primary: "bg-primary text-white border border-transparent hover:bg-hover",
  secondary: "bg-secondary text-white border border-transparent hover:bg-hover",
  custom: "border border-transparent",
  outline:
    "border border-border-400 bg-transparent text-body hover:text-white hover:bg-primary hover:border-primary",
  loading:
    "h-4 w-4 ml-2 rounded-full border-2 border-transparent border-t-2 animate-spin",
  disabled:
    "border border-border-base bg-gray-300 hover:bg-gray-300 border-border-400 text-body cursor-not-allowed",
  disabledOutline: "border border-border-base text-muted cursor-not-allowed",
  small: "px-2 py-0 h-6",
  normal: "px-3 py-0 h-9 text-sm h-10",
  big: "px-10 py-0 h-14",
};

const Button = React.forwardRef((props, ref) => {
  const {
    className,
    variant = "primary",
    size = "normal",
    children,
    active,
    loading = false,
    disabled = false,
    ...rest
  } = props;
  const classesName = classNames(
    classes.root,
    {
      [classes.primary]: !disabled && variant === "primary",
      [classes.secondary]: !disabled && variant === "secondary",
      [classes.disabled]: disabled && variant === "primary",
      [classes.outline]: !disabled && variant === "outline",
      [classes.disabledOutline]: disabled && variant === "outline",
      [classes.small]: size === "small",
      [classes.normal]: size === "normal",
      [classes.big]: size === "big",
    },
    className
  );

  return (
    <button
      aria-pressed={active}
      data-variant={variant}
      ref={ref}
      className={classesName}
      disabled={disabled}
      {...rest}
    >
      {children}
      {loading && (
        <span
          className={classes.loading}
          style={{
            borderTopColor: variant === "outline" ? "currentColor" : "#ffffff",
          }}
        />
      )}
    </button>
  );
});

Button.displayName = "Button";
export default Button;
