import PropTypes from 'prop-types'

import './colorsBox.css';

const ColorsBox = ({
  text, colors
}) => {
  return (
        <>
        {text}
        {text === 'Color'
          ? <div className='size-box'>
       {colors.map((c, index) => {
         return (
           <div key={index} className='sizes'>
           <div key={index} className='color-box' style={{ 'background-color': c }} />

           </div>

         )
       })}

   </div>
          : <div className='size-box'>
   {colors.map((s, index) => {
     return (
       <div key={index} className='sizes'>
     {s}

   </div>
     )
   })}

 </div>
      }
        </>

  )
}
ColorsBox.propTypes = {
  text: PropTypes.string,
  colors: PropTypes.array
}
export default ColorsBox;
