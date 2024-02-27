import React, { FC, useContext, useEffect, useState } from "react"
import { ChatbotUIContext } from "@/context/context"
import { IconCheck, IconCopy, IconEdit, IconRepeat } from "@tabler/icons-react"
import { WithTooltip } from "../ui/with-tooltip"
import Feedback from "./feedback"


export const MESSAGE_ICON_SIZE = 18

interface MessageActionsProps {
  isAssistant: boolean
  isLast: boolean
  isEditing: boolean
  isHovering: boolean
  onCopy: () => void
  onEdit: () => void
  onRegenerate: () => void
}

export const MessageActions: FC<MessageActionsProps> = ({
  isAssistant,
  isLast,
  isEditing,
  isHovering,
  onCopy,
  onEdit,
  onRegenerate
}) => {
  const { isGenerating } = useContext(ChatbotUIContext)
  const [showCheckmark, setShowCheckmark] = useState(false)

  const handleCopy = () => {
    onCopy()
    setShowCheckmark(true)
  }

  useEffect(() => {
    if (showCheckmark) {
      const timer = setTimeout(() => {
        setShowCheckmark(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [showCheckmark])

  return (
    <>
      <div className="text-muted-foreground flex items-center space-x-2">
        {!isAssistant && isHovering && (
          <WithTooltip
            delayDuration={500}
            side="bottom"
            display={<div>Edit</div>}
            trigger={
              <IconEdit
                className="cursor-pointer hover:opacity-50"
                size={MESSAGE_ICON_SIZE}
                onClick={onEdit}
              />
            }
          />
        )}

        {(isHovering || isLast) && (
          <WithTooltip
            delayDuration={500}
            side="bottom"
            display={<div>Copy</div>}
            trigger={
              showCheckmark ? (
                <IconCheck size={MESSAGE_ICON_SIZE} />
              ) : (
                <IconCopy
                  className="cursor-pointer hover:opacity-50"
                  size={MESSAGE_ICON_SIZE}
                  onClick={handleCopy}
                />
              )
            }
          />
        )}

        {isLast && (
          <>
          <Feedback />
          </>
        )}

        {isLast && (
          <>
          <WithTooltip
            delayDuration={500}
            side="bottom"
            display={<div>Regenerate</div>}
            trigger={
              <IconRepeat
                className="cursor-pointer hover:opacity-50"
                size={MESSAGE_ICON_SIZE}
                onClick={onRegenerate}
              />
            }
          />
          
          </>
        )}
      </div>
    </>
  )
}
