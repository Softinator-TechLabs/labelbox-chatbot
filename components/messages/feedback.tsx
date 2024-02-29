import React, { useState } from "react"
import { RiThumbDownLine } from "react-icons/ri"
import { WithTooltip } from "../ui/with-tooltip"
//import { sendfeedback } from "./feedback_action"; //data redundancy code
import { sendfeedback } from "./feedbackaction" //no data redundancy code
import { useTheme } from "next-themes"

export const MESSAGE_ICON_SIZE = 18

interface FeedbackProps {
  chat_id: string
  msg_id: string
}

const Feedback: React.FC<FeedbackProps> = ({ chat_id, msg_id }) => {
  const [isFeedbackFormVisible, setIsFeedbackFormVisible] = useState(false)
  const [feedbackText, setFeedbackText] = useState("")
  const [feedbackReason, setFeedbackReason] = useState("")
  const { theme } = useTheme() // Use the useTheme hook to get the current theme

  const handleFeedbackSubmit = async () => {
    console.log(feedbackReason, feedbackText)
    setIsFeedbackFormVisible(false)
    setFeedbackText("")
    setFeedbackReason("")
    sendfeedback(chat_id, feedbackText, msg_id)
  }

  // Determine modal background and text color based on the current theme
  const modalBgColor = theme === "dark" ? "bg-gray-800" : "bg-white"
  const textColor = theme === "dark" ? "text-white" : "text-black"

  return (
    <>
      <div className="flex justify-between">
        <button
          className="ml-2 p-1 rounded"
          onClick={() => setIsFeedbackFormVisible(true)}
        >
          <div className="h-5 w-5">
            <WithTooltip
              delayDuration={500}
              side="bottom"
              display={<div>Feedback</div>}
              trigger={
                <RiThumbDownLine
                  className="cursor-pointer hover:opacity-50"
                  size={MESSAGE_ICON_SIZE}
                />
              }
            />
          </div>
        </button>
      </div>

      {isFeedbackFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className={`${modalBgColor} p-4 rounded ${textColor} w-1/2 max-w-lg`}
          >
            <h3 className="text-lg">Provide additional feedback</h3>
            <div className="my-2">{/* Placeholder for feedback options */}</div>
            <textarea
              className="w-full h-20 p-2 border"
              placeholder="Feel free to add specific details"
              value={feedbackText}
              onChange={e => setFeedbackText(e.target.value)}
            />
            <div className="flex justify-end space-x-2 mt-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleFeedbackSubmit}
              >
                Submit
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setIsFeedbackFormVisible(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Feedback
