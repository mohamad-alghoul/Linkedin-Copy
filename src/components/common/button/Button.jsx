
import "./button.scss";

export const Button=({ title, onClick }) =>{
  return (
    <button className="common-btn" onClick={onClick}>
      {title}
    </button>
  );
}
