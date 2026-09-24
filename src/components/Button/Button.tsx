import { type ButtonHTMLAttributes } from 'react';
import './Button.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'accent' | 'outline' | 'link';
}

export default function Button({
                                   children,
                                   variant = 'accent',
                                   className = '',
                                   ...props
                               }: ButtonProps) {
    return (
        <button
            className={`btn btn--${variant} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
