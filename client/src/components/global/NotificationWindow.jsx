// Modules
import React from 'react'
import AccentButton from './AccentButton';

// CSS
import './NotificationWindow.css'

/**
 * @typedef Props
 * @prop {string} text - Text to be displayed in window
 * @prop {string} buttonText - Text to be displayed in button
 * @prop {function} handleButtonClick - What happens when button is clicked
 */

/**
 * Notification window
 * @param {Props} props
 */
const NotificationWindow = ({text, buttonText, handleButtonClick}) => {
  return (
    <div className='notification-window'>
      <div className='window'>
        <div className='info'>
          <svg width="64" height="64" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.91 2.782a2.25 2.25 0 0 1 2.975.74l.083.138 7.759 14.009a2.25 2.25 0 0 1-1.814 3.334l-.154.006H4.243a2.25 2.25 0 0 1-2.041-3.197l.072-.143L10.031 3.66a2.25 2.25 0 0 1 .878-.878Zm9.505 15.613-7.76-14.008a.75.75 0 0 0-1.254-.088l-.057.088-7.757 14.008a.75.75 0 0 0 .561 1.108l.095.006h15.516a.75.75 0 0 0 .696-1.028l-.04-.086-7.76-14.008 7.76 14.008ZM12 16.002a.999.999 0 1 1 0 1.997.999.999 0 0 1 0-1.997ZM11.995 8.5a.75.75 0 0 1 .744.647l.007.102.004 4.502a.75.75 0 0 1-1.494.103l-.006-.102-.004-4.502a.75.75 0 0 1 .75-.75Z" fill="currentColor"/></svg>
          {text}
        </div>
        <AccentButton handleClick={handleButtonClick} height={"64px"}>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm3.22 6.97-4.47 4.47-1.97-1.97a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l5-5a.75.75 0 1 0-1.06-1.06Z" fill="currentColor"/></svg>
          {buttonText}
        </AccentButton>
      </div>
    </div>
  )
}

export default NotificationWindow
