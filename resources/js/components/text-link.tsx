import { Link } from '@inertiajs/react';

interface TextLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

const TextLink = ({ href, children, className = '' }: TextLinkProps) => {
    return (
        <Link
            href={href}
            className={`text-primary hover:underline font-medium ${className}`}
        >
            {children}
        </Link>
    );
};

export default TextLink;
