import { supabase } from "@/lib/supabase/browser-client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

const MAX_RETRIES = 15 // Maximum number of retries
const BACKOFF_FACTOR = 500

export const getMessageById = async (messageId: string) => {
  const { data: message } = await supabase
    .from("messages")
    .select("*")
    .eq("id", messageId)
    .single()

  if (!message) {
    throw new Error("Message not found")
  }

  return message
}

export const getMessagesByChatId = async (chatId: string) => {
  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)

  if (!messages) {
    throw new Error("Messages not found")
  }

  return messages
}

export const createMessage = async (message: TablesInsert<"messages">) => {
  const { data: createdMessage, error } = await supabase
    .from("messages")
    .insert([message])
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return createdMessage
}

export const createMessages = async (messages: TablesInsert<"messages">[]) => {
  const { data: createdMessages, error } = await supabase
    .from("messages")
    .insert(messages)
    .select("*")

  if (error) {
    throw new Error(error.message)
  }

  return createdMessages
}

export const updateMessage = async (
  messageId: string,
  message: TablesUpdate<"messages">
) => {
  const { data: updatedMessage, error } = await supabase
    .from("messages")
    .update(message)
    .eq("id", messageId)
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return updatedMessage
}
// export const updateMessageFeedback = async (messageId: string, feedback: string) => {
//   const { data: updatedMessage, error } = await supabase
//     .from("messages")
//     .update({ feedback }) // Specify the feedback field to be updated
//     .eq("id", messageId)
//     .select("*")
//     .single();

//   if (error) {
//     throw new Error(error.message);
//   }

//   return updatedMessage;
// }

export const updateMessageFeedback = async (
  messageId: string,
  feedback: string,
  attempt = 0
) => {
  try {
    const { data: updatedMessage, error } = await supabase
      .from("messages")
      .update({ feedback }) // Specify the feedback field to be updated
      .eq("id", messageId)
      .single()

    if (error) throw error

    return updatedMessage
  } catch (error) {
    if (attempt < MAX_RETRIES) {
      const backoff = BACKOFF_FACTOR * Math.pow(2, attempt) // Exponential backoff
      console.log(`Retrying updateMessageFeedback in ${backoff} ms`)

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          updateMessageFeedback(messageId, feedback, attempt + 1)
            .then(resolve)
            .catch(reject)
        }, backoff)
      })
    } else {
      throw new Error(
        `Failed to update message feedback after ${MAX_RETRIES} attempts:`
      )
    }
  }
}
export const updateMessagelabelbox = async (
  messageId: string,
  labelbox_id: string
) => {
  const { data: updatedMessage, error } = await supabase
    .from("messages")
    .update({ labelbox_id }) // Specify the feedback field to be updated
    .eq("id", messageId)
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return updatedMessage
}

export const deleteMessage = async (messageId: string) => {
  const { error } = await supabase.from("messages").delete().eq("id", messageId)

  if (error) {
    throw new Error(error.message)
  }

  return true
}

export async function deleteMessagesIncludingAndAfter(
  userId: string,
  chatId: string,
  sequenceNumber: number
) {
  const { error } = await supabase.rpc("delete_messages_including_and_after", {
    p_user_id: userId,
    p_chat_id: chatId,
    p_sequence_number: sequenceNumber
  })

  if (error) {
    return {
      error: "Failed to delete messages."
    }
  }

  return true
}
