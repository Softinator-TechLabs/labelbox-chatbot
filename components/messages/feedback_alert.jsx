import React, { useState } from "react";
import { RiThumbDownLine, RiThumbUpLine } from "react-icons/ri";
import { RxCrossCircled } from "react-icons/rx";
import { useTheme } from "next-themes";
//import { sendfeedback } from "./feedback_action"; //data reduncay code
import { sendfeedback } from "./feedbackaction"; //no data reduncay code

export const MESSAGE_ICON_SIZE = 18;

const FeedbackComponent = ({ chat_id, msg_id }) => {
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const { theme, setTheme } = useTheme(); // Use the useTheme hook to get the current theme

  const handleFeedback = feedback => {
    console.log(feedback);
    setFeedbackGiven(true);
    sendfeedback(chat_id, feedback, msg_id);
    console.log("Feedback: " + feedback);
  };

  const handleClose = () => {
    setFeedbackGiven(true);
  };

  if (feedbackGiven) return null;

  // Determine styles based on the current theme
  const containerStyles = {
    width: "21rem",
    color: theme === "dark" ? "white" : "black", // Dynamic text color based on theme
    backgroundColor: theme === "dark" ? "#1F2937" : "white", // Dynamic background color
    padding: "1rem",
    borderRadius: "0.5rem",
    border: "1px solid #4B5563", // This color works well on both dark and light backgrounds
  };

  return (
    <div style={containerStyles}>
      <div>
        <span>Is this conversation helpful?</span>
        <button
          style={{ padding: "0 0.4rem 0 0.6rem" }}
          onClick={() => handleFeedback("positive")}
          className={`mx-1 px-11 hover:text-green-400 ${theme === 'dark' ? 'text-white-500' : 'text-black-500'}`}
          aria-label="Thumbs up"
        >
          <RiThumbUpLine />
        </button>
        <button
          onClick={() => handleFeedback("negative")}
          className={`mx-10 hover:text-red-400 ${theme === 'dark' ? 'text-white-500' : 'text-black-500'}`}
          aria-label="Thumbs down"
        >
          <RiThumbDownLine />
        </button>
        <button
          style={{ padding: "0 0.6rem 0 1.0rem" }}
          onClick={handleClose}
          className={`mx-1 hover:text-gray-400 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-700'}`}
          aria-label="Close"
        >
          <RxCrossCircled size={MESSAGE_ICON_SIZE} />
        </button>
      </div>
    </div>
  );
};

export default FeedbackComponent;
