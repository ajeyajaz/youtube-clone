function InputField({type, placeholder, ...rest}){
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-5 py-3 rounded-full border border-gray-300"
      {...rest}
    />
  );
}

export default InputField;
