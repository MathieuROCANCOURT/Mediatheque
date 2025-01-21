import {usePage} from '@inertiajs/react';
import {PageProps, User} from "../types";

interface AuthCheckProps {
    children: React.ReactNode;
    role?: string;
    permission?: string;
    fallback?: React.ReactNode;
}

export default function AuthCheck({
                                      children,
                                      permission,
                                      fallback = null
                                  }: AuthCheckProps) {
    const {auth} = usePage<PageProps>().props;
    const user: User | null = auth.user;

    if (!user) {
        return fallback;
    }

    if (permission && !user.permissions[0].includes(permission)) {
        return fallback;
    }

    return <>{children}</>;
}
