import React, { ReactNode } from 'react';

interface Props {
    title: string;
    subtitle?: string;
    children: ReactNode;
    className?: string;
}

export function AnimeSection({ title, subtitle, children, className = '' }: Props) {
    return (
        <section className={`${className}`}>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                    {title}
                </h2>
                {subtitle && (
                    <p className="text-gray-400 text-sm">
                        {subtitle}
                    </p>
                )}
            </div>
            {children}
        </section>
    );
}