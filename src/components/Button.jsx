import style from './Button.module.css';

const Button = ({ children, onClick }) => {
  return (
    <button className={style} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
