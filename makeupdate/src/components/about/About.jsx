import React from "react";

function About() {
  return (
    <div className="about2">
      Заполните описание
      <textarea
        type="text"
        id="text"
        style={{ display: "none", fontSize: "1vw", resize: 'none', width:'371px', height: '171px', background: '#F0F0F0', borderRadius: '10px', marginTop: '10px', padding: '10px'}}
        className="input2"
        placeholder="Введите описание"
      />
    </div>
  );
}

export default About;
