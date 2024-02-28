import React, { FC } from "react"

interface ChatbotUISVGProps {
  theme: "dark" | "light"
  scale?: number // Optional scaling factor
}

export const ChatbotUISVG: FC<ChatbotUISVGProps> = ({ theme, scale = 1 }) => {
  // Adjust the fillColor based on the theme
  const fillColor = theme === "dark" ? "#fff" : "#000"

  return (
    <svg
      width={`${400 * scale}px`} // Adjust the width based on the scale
      height={`${400 * scale}px`} // Adjust the height based on the scale
      viewBox="0 0 400 400" // Use the viewBox from the new SVG
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        transform="translate(0,400) scale(0.1,-0.1)" // Use the transform from the new SVG
        fill={fillColor} // Use the fillColor based on the theme
        stroke="none"
      >
        <path d="M1625 2810 c-209 -125 -380 -232 -382 -237 -1 -4 191 -123 427 -263 l429 -255 0 -517 c1 -285 4 -518 7 -518 3 0 176 102 385 227 l379 228 0 521 0 521 -422 253 c-233 140 -427 257 -433 261 -5 4 -181 -95 -390 -221z" />
        <path d="M1140 1937 l0 -464 378 -227 c208 -124 381 -226 385 -226 4 0 6 78 5 172 l-3 173 -237 143 -238 144 0 287 0 288 -137 83 c-76 46 -141 85 -145 87 -5 2 -8 -205 -8 -460z" />
      </g>
    </svg>
  )
}
