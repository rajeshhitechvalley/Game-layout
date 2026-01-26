import { Gamepad2 } from 'lucide-react';

interface AppLogoIconProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const AppLogoIcon = ({ className = '', size = 'md' }: AppLogoIconProps) => {
    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-10 h-10',
    };

    return (
        <div className={`rounded-xl gradient-bg-primary flex items-center justify-center ${sizeClasses[size]} ${className}`}>
            <Gamepad2 className="w-3/4 h-3/4 text-background" />
        </div>
    );
};

export default AppLogoIcon;
