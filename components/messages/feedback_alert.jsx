import { X } from "lucide-react"
import React, { useState } from "react"
import { RiThumbDownLine } from "react-icons/ri"
import { RiThumbUpLine } from "react-icons/ri"
import { RxCrossCircled } from "react-icons/rx"

export const MESSAGE_ICON_SIZE = 18
const FeedbackComponent = () => {
  const [feedbackGiven, setFeedbackGiven] = useState(false)

  const handleFeedback = feedback => {
    // Process the feedback
    console.log(feedback)
    setFeedbackGiven(true)
  }

  const handleClose = () => {
    setFeedbackGiven(true)
  }

  if (feedbackGiven) return null

  return (
    <div
      style={{
        width: "21rem", // This corresponds to bg-gray-800
        color: "white",
        padding: "1rem", // This corresponds to p-4
        borderRadius: "0.5rem", // This corresponds to rounded-lg
        border: "1px solid #4B5563" // This corresponds to a gray border color
      }}
    >
      <div>
        <span>Is this conversation helpful?</span>
        <button
          style={{ padding: "0 0.4rem 0 0.6rem" }}
          onClick={() => handleFeedback("positive")}
          className="text-white-500 hover:text-green-400 mx-1 px-11"
          aria-label="Thumbs up"
        >
          <RiThumbUpLine />
        </button>
        <button
          onClick={() => handleFeedback("negative")}
          className="text-white-500 hover:text-red-400 mx-10"
          aria-label="Thumbs down"
        >
          <RiThumbDownLine />
        </button>
        <button
          style={{ padding: "0 0.6rem 0 1.0rem" }}
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-400 mx-1"
          aria-label="Close"
        >
          <RxCrossCircled size={MESSAGE_ICON_SIZE} />
        </button>
      </div>
    </div>
  )
}

export default FeedbackComponent
