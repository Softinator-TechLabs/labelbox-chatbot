const { getMessagesByChatId } = require("../../db/messages")
const axios = require("axios")
async function createDataRow(datasetId, rowData, authToken) {
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

    console.log("Response:", response.data)
    return response.data
  } catch (error) {
    console.error("Error:", error.response.data)
    throw error
  }
}

exports.sendfeedback = async (chatId, feedback_message, msg_id) => {
  const data = await getMessagesByChatId(chatId)
  //console.log(data);
  // console.log("messages"+ feedback_message);
  const convertApiResponse = (responseData, msg, msg_id) => {
    const convertedData = {
      messages: responseData.map(entry => {
        // Create a new object for each message, conditionally including feedback
        const message = {
          id: entry.id,
          chat_id: entry.chat_id,
          user_id: entry.user_id,
          created_at: entry.created_at,
          updated_at: entry.updated_at,
          content: entry.content,
          image_paths: entry.image_paths,
          role: entry.role,
          model: entry.model,
          sequence_number: entry.sequence_number,
          assistant_id: entry.assistant_id,
          ...(entry.id === msg_id && { feedback: msg }) // Conditionally add feedback
        }

        return message
      })
    }

    return convertedData
  }

  // Convert the data
  const convertedData = convertApiResponse(data, feedback_message, msg_id)
  const convertedDataString = JSON.stringify(convertedData, null, 2)
  // const oringal = JSON.stringify(data, null, 2)by
  // console.log("original" + oringal)
  // console.log("my" + convertedDataString)
  // Use the converted data as needed
  const datasetId = "clt5qvkht004n0728ab5cucc6" // Replace with your dataset ID
  const rowData = convertedDataString // Replace with your row data
  const authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbHQ0NmxpazEwMGdqMDd5eDB0bjRnMGEyIiwib3JnYW5pemF0aW9uSWQiOiJjbHQ0NmxpanMwMGdpMDd5eGU1bDkzNHdpIiwiYXBpS2V5SWQiOiJjbHQ1a2l4N2QwM3h5MDd3MWR6b2Jla2FrIiwic2VjcmV0IjoiOGI5MzBmNDc0M2ZhNDkzZTEyZGRkMmUyNGZiMWYxZGIiLCJpYXQiOjE3MDkxMTA5MzksImV4cCI6MjM0MDI2MjkzOX0.Ef13h12o6Ct17j0JvJdghsev8LH7yTIOH0ZJaID7pAE" // Replace with your Bearer authentication token

  const save = createDataRow(datasetId, rowData, authToken)
    .then(() => {
      console.log("Data successfully created.")
    })
    .catch(error => {
      console.error("Failed to create data:", error)
    })

  console.log("hurry " + save)
}
