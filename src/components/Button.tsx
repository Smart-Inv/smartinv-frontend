const Button = ({
  textColor = 'text-white',
  bgColor = 'text-light-red',
  className = '',
  ...props
}) => {
  return (
    <button className={`px-5 py-2 cursor-pointer rounded ${textColor} ${bgColor} ${className}`}
      {...props}>
    </button>
  );
};

export default Button;