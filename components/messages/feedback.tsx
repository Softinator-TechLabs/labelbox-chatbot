import React, { useState } from "react"
import { RiThumbDownLine } from "react-icons/ri"
import { WithTooltip } from "../ui/with-tooltip"
import { getMessagesByChatId } from "../../db/messages"
import { sendfeedback } from "./feedback_action"

export const MESSAGE_ICON_SIZE = 18

const Feedback = ({ chat_id, msg_id }) => {
  const [isFeedbackFormVisible, setIsFeedbackFormVisible] = useState(false)
  const [feedbackText, setFeedbackText] = useState("")
  const [feedbackReason, setFeedbackReason] = useState("")

  const handleFeedbackSubmit = async () => {
    // Process feedback here (e.g., send to backend)
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
          className="ml-2 rounded p-1 "
          onClick={() => setIsFeedbackFormVisible(true)}
        >
          <div className="size-5">
            {/* <RiThumbDownLine className="hover:opacity-50"
            size={MESSAGE_ICON_SIZE}
            /> */}
            <WithTooltip
              delayDuration={500}
              side="bottom"
              display={<div>feedback</div>}
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
        // This container centers the modal
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          // This is the modal itself
          <div className="w-1/2 max-w-lg rounded bg-gray-600 p-4 text-white">
            <h3 className="text-lg">Provide additional feedback</h3>
            {/* Feedback options */}
            <div className="my-2">
              {/* ... add buttons for each feedback reason */}
            </div>
            <textarea
              className="h-20 w-full border p-2"
              placeholder="Feel free to add specific details"
              value={feedbackText}
              onChange={e => setFeedbackText(e.target.value)}
            />
            <div className="mt-2 flex justify-end space-x-2">
              <button
                className="rounded bg-blue-500 px-4 py-2 text-white"
                onClick={handleFeedbackSubmit}
              >
                Submit
              </button>
              <button
                className="rounded bg-gray-500 px-4 py-2 text-white"
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
