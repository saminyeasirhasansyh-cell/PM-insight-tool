
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CardProps extends HTMLMotionProps<"div"> {
    className?: string;
    children: React.ReactNode;
}

export const Card = ({ className, children, ...props }: CardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={cn("bg-surface/40 backdrop-blur-md border border-white/5 rounded-xl p-6 shadow-xl", className)}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export const CardHeader = ({ className, children }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("flex flex-col space-y-1.5 pb-4", className)}>{children}</div>
);

export const CardTitle = ({ className, children }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={cn("text-lg font-semibold leading-none tracking-tight text-white", className)}>{children}</h3>
);

export const CardContent = ({ className, children }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("text-gray-300", className)}>{children}</div>
);
