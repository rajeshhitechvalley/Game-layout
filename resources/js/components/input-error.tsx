interface InputErrorProps {
    message?: string;
}

const InputError = ({ message }: InputErrorProps) => {
    if (!message) return null;

    return (
        <p className="text-sm text-destructive mt-1">
            {message}
        </p>
    );
};

export default InputError;
