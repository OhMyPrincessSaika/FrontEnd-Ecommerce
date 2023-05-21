import React from 'react'

const Color = (props) => {
  const {colors,setColor} = props;

  return (
    <ul className="colors ps-0 mb-0">
       {
        colors?.map((color,i) => {
          
          return   <li 
          key={i}
          className="color"
          onClick={() => {
            const colorSelector = document.querySelector('.color');
            if(colorSelector.classList.contains('active')) {
              colorSelector.classList.remove('active');
              setColor('')
            }else{
              colorSelector.classList.add('active')
              setColor(color.value);
            }
          }} 
          style={{backgroundColor:color.value}}></li>
         
        })
       }
    </ul>
  )
}

export default Color