import React, { useState } from "react"
import { RiThumbDownLine } from "react-icons/ri"
import { WithTooltip } from "../ui/with-tooltip"
import { sendfeedback } from "./feedback_action"

export const MESSAGE_ICON_SIZE = 18

// Define an interface for the component's props
interface FeedbackProps {
  chat_id: string // Adjust the type as needed
  msg_id: string // Adjust the type as needed
}

const Feedback: React.FC<FeedbackProps> = ({ chat_id, msg_id }) => {
  const [isFeedbackFormVisible, setIsFeedbackFormVisible] = useState(false)
  const [feedbackText, setFeedbackText] = useState("")
  const [feedbackReason, setFeedbackReason] = useState("")

  const handleFeedbackSubmit = async () => {
    console.log(feedbackReason, feedbackText)
    setIsFeedbackFormVisible(false) // Close the feedback form
    setFeedbackText("") // Reset feedback text
    setFeedbackReason("") // Reset feedback reason
    sendfeedback(chat_id, feedbackText, msg_id)
  }

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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-600 p-4 rounded text-white w-1/2 max-w-lg">
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
