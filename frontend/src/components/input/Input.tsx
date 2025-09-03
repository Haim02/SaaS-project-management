
type InputProps = {
  type: React.HTMLInputTypeAttribute | undefined;
  name?: string
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  autoComplete?: React.HTMLInputAutoCompleteAttribute | undefined
};

const Input = ({className, onChange, name, placeholder, type, value, ...moreProps}: InputProps) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...moreProps}
      className={`border rounded w-full p-3 mb-4 ${className}`}
    />
  );
}

export default Input
