'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { HashLoader } from 'react-spinners';
import AuthProvider from '../context/AuthProvider';

export default function Loading({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const handleRouteChange = () => {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 1000);
        };

        handleRouteChange();

        return () => setIsLoading(false);
    }, [pathname, searchParams]);

    return (
        <>
            {isLoading && (
                <div className="loading-overlay">
                    <HashLoader color="#4ADE80" loading={isLoading} size={50} />
                </div>
            )}
            <AuthProvider>{children}</AuthProvider>
        </>
    );
}
