interface HeadingProps {
    variant?: 'default' | 'small' | 'large';
    title: string;
    description?: string;
}

const Heading = ({ variant = 'default', title, description }: HeadingProps) => {
    const variantClasses = {
        default: 'text-2xl font-bold',
        small: 'text-lg font-semibold',
        large: 'text-3xl font-black',
    };

    return (
        <div>
            <h2 className={variantClasses[variant]}>
                {title}
            </h2>
            {description && (
                <p className="text-muted-foreground mt-1">
                    {description}
                </p>
            )}
        </div>
    );
};

export default Heading;
