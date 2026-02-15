import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';
import { createPortal } from 'react-dom';

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export const Dialog = ({ isOpen, onClose, title, children, footer }: DialogProps) => {
    if (typeof document === 'undefined') return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />
                    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-lg pointer-events-auto"
                        >
                            <Card className="bg-surface border-white/10 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
                                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                                    <h2 className="text-xl font-bold text-white">{title}</h2>
                                    <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>
                                <div className="p-6 overflow-y-auto">
                                    {children}
                                </div>
                                {footer && (
                                    <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end gap-2">
                                        {footer}
                                    </div>
                                )}
                            </Card>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};
