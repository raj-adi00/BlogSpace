import React from 'react'

function Logo({ width = '100px' }) {
    return (
        <svg width="200" height="75" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
             
        <g transform="translate(50, 25)">
          <polygon points="10,10 50,40 20,70 0,50" fill="#4caf50"/>
          <polygon points="50,40 60,50 40,70 20,70" fill="#388e3c"/>
          <circle cx="0" cy="50" r="5" fill="#1b5e20"/>
        </g>
      
        <text x="120" y="85" fontFamily="Georgia, serif" fontSize="36" fill="white" fontWeight="bold">
          BlogSpace
        </text>
      
        <text x="120" y="110" fontFamily="Arial, sans-serif" fontSize="14" fill="white" >
          Your daily dose of insights
        </text>
      </svg>
      
      
    )
}

export default Logo