import './TextArea.css';

const TextArea = ({label, name, register, placeholder}) => {
  const className = 'TextArea';

  return (
    <div className={className}>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea className={`${className}__textarea`} id={name} {...register(name, {required: true})}
                placeholder={placeholder || ""}/>
    </div>
  )
}

export default TextArea;