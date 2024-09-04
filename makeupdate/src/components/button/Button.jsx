import React from "react";
import "./button.css";

function Button() {
  const shovHide = () => {
    let a = document.getElementById("btn");
    let b = document.getElementById("text");
    let c = document.getElementById("span1");
    let d = document.getElementById("text2");
    if (a.style.display === "none" ) {
      a.style.display = "block";
      b.style.display = "block"
      d.style.display = "none"
      c.innerText = 'Сохранить измененные'
    } else if (a.style.display === "block") {
      a.style.display = "none";
      b.style.display = "none"
      b.style.width = '378px'
      b.style.resize = "none"
      b.style.height = '171px'
      b.style.background = '#F0F0F0'
      b.style.borderRadius = '10px'
      d.style.display = "block"
      c.innerText = 'Редактировать'
      
    }
  };

  return (
    <div>
      <button onClick={shovHide} className="btn1"><span id="span1" className="i">Редактировать</span></button>
      <span id="btn" style={{ display: "none", fontSize: "1vw",height: 'auto', marginBottom:'5px'}}>
      <form action="" id="btn">
            <input type="text" className="myInput" id="btn" placeholder="Введите Имя*" />
            <input type="text" className="myInput" id="btn" placeholder="Введите Фамилию*"/>
            <input type="text" className="myInput" id="btn"placeholder="Введите Telegram"/>
            <input type="text" className="myInput" id="btn"placeholder="Введите Телефон"/>
            <input type="text" className="myInput" id="btn"placeholder="Введите Местоположение"/>
           </form>     
      </span> 
    </div>
  );
}

export default Button;
