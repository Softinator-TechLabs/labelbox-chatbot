const {
  getMessagesByChatId,
  updateMessageFeedback,
  updateMessagelabelbox
} = require("../../db/messages")
const axios = require("axios")

async function createDataRow(datasetId, rowData, authToken, msgId) {
  try {
    const response = await axios.post(
      "https://api.labelbox.com/graphql",
      {
        query: `mutation createDataRow($datasetId: ID!, $rowData: String!) {
            createDataRow(data: { dataset: { connect: { id: $datasetId } }, rowData: $rowData }) {
              id
            }
          }`,
        variables: { datasetId, rowData }
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        }
      }
    )

    //   console.log("Response:", response.data)
    // console.log("dataf ID: " +JSON.stringify(response.data.data.createDataRow.id, null, 2));
    const id = JSON.stringify(response.data.data.createDataRow.id, null, 2)
    await updateMessagelabelbox(msgId, id)
    return response
  } catch (error) {
    // console.error("Error:", error.response.data)
    throw error
  }
}

// Assuming this is a new function to update data in Labelbox
async function updateLabelboxDataRow(dataRowId, rowData, authToken) {
  try {
    //  console.log("Original dataRowId: " + dataRowId);

    // Correct approach to remove leading and trailing quotes and backslashes
    let cleanedDataRowId = dataRowId.replace(/^\\?"|\\?"$/g, "")
    //  console.log("Cleaned dataRowId: " + cleanedDataRowId);

    const response = await axios.post(
      "https://api.labelbox.com/graphql",
      {
        query: `
              mutation UpdateDataRow($dataRowId: ID!, $rowData: String!) {
                  updateDataRow(where: { id: $dataRowId }, data: { rowData: $rowData }) {
                  id
                  rowData
                  }
              }
              `,
        variables: {
          dataRowId: cleanedDataRowId, // Use the cleaned ID
          rowData
        }
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        }
      }
    )

    //   console.log("Update successful:", response.data);
    return response.data
  } catch (error) {
    console.error(
      "Error updating data row:",
      error.response ? error.response.data : error
    )
    throw error
  }
}

exports.sendfeedback = async (chatId, feedbackMessage, msgId) => {
  try {
    // console.log(0);
    // Step 1: Update the feedback message in the database first
    await updateMessageFeedback(msgId, feedbackMessage)
    // console.log(1);
    // Step 2: Fetch Messages and check for existing labelId
    const messages = await getMessagesByChatId(chatId)
    // console.log(2);
    const messageWithLabel = messages.find(message => message.labelbox_id)
    // console.log("dfhdfhkdf "+messageWithLabel);
    const datasetId = process.env.NEXT_PUBLIC_LABELBOX_DATASET // Replace with your actual dataset ID
    const authToken = process.env.NEXT_PUBLIC_LABELBOX_API_KEY

    //console.log("Labelbox dataset normal" + process.env.NEXT_PUBLIC_LABELBOX_API_KEY);// Replace with your actual auth token

    if (messageWithLabel) {
      // If a labelId exists, update the data on Labelbox services
      // const labelId = JSON.stringify(messageWithLabel.labelbox_id, null, 2);
      const labelId = messageWithLabel.labelbox_id

      // console.log("chatid "+labelId)
      const rowData = JSON.stringify(messages, null, 2) // Assume you want to update with this new feedback message
      await updateLabelboxDataRow(labelId, rowData, authToken)
     // console.log(`Labelbox data updated for labelId: ${labelId}`)
    } else {
      // If no labelId exists, create new data in Labelbox and update the message with the new labelId
      console.log("Creating new Labelbox entry.")
      // const labelId = messageWithLabel.labelbox_id;
      const rowData = JSON.stringify(messages, null, 2)
      await createDataRow(datasetId, rowData, authToken, msgId)
      // Here you'd call createDataRow like before and handle the response to update your message with the new labelId
      // This part remains as in your original function for creating new data rows
    }
  } catch (error) {
    console.error("Error in sendFeedback:", error)
    throw error
  }
}
