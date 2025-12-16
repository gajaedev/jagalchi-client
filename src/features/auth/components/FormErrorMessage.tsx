interface FormErrorMessageProps {
  message?: string;
}

export function FormErrorMessage({ message }: FormErrorMessageProps) {
  if (!message) return null;

  return (
    <p role="alert" className="text-destructive text-sm font-medium">
      {message}
    </p>
  );
}
