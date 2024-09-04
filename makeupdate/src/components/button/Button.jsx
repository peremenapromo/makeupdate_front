import React from "react";


function Button() {
  const shovHide = () => {
    let a = document.getElementById("btn");
    let b = document.getElementById("text");
    if (a.style.display === "none" && b.style.display === 'none') {
      a.style.display = "block";
      b.style.display = "block"
    } else if (a.style.display === "block") {
      a.style.display = "none";
      b.style.display = "none"
      b.style.width = '378px'
      b.style.resize = "none"
      b.style.height = '171px'
      b.style.background = '#F0F0F0'
      b.style.borderRadius = '10px'

    }
  };

  return (
    <div>
      <button onClick={shovHide} className="btn1">Редактировать</button>
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
