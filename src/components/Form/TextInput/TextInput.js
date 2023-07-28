import './TextInput.css'

const TextInput = ({register, name, label, placeholder=""}) => {
  const className = 'TextInput';
  return (
    <div className={className}>
      {label && (<label htmlFor={name}>{label}</label>)}
      <input className={`${className}__inputField`} type="text" id={name} placeholder={placeholder} {...register(name)} />
    </div>
  )
}

export default TextInput;