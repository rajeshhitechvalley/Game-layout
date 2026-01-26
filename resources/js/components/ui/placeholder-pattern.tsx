interface PlaceholderPatternProps {
    className?: string;
}

const PlaceholderPattern = ({ className = '' }: PlaceholderPatternProps) => {
    return (
        <div 
            className={`absolute inset-0 -z-10 overflow-hidden ${className}`}
            aria-hidden="true"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
            <svg
                className="absolute inset-0 h-full w-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern
                        id="grid"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M 40 0 L 0 0 0 40"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-border/20"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        </div>
    );
};

export { PlaceholderPattern };
export default PlaceholderPattern;
