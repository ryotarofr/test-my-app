import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $createParagraphStyleNode, ParagraphStyleType } from "./ParagraphStyleNode"
import { useEffect } from "react"
import { $createParagraphNode, $getSelection, $isRangeSelection, COMMAND_PRIORITY_EDITOR, createCommand } from "lexical"
import {
  $setBlocksType,
} from '@lexical/selection';

export const PARAGRAPH_STYLE_COMMAND = createCommand<ParagraphStyleType>()

export const ParagraphStylePlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerCommand<ParagraphStyleType>(
      PARAGRAPH_STYLE_COMMAND,
      (style) => {
        const selection = $getSelection()
        if (!$isRangeSelection(selection)) {
          return false
        }
        if (style === 'default') {
          $setBlocksType(selection, () => $createParagraphNode())
        } else {
          $setBlocksType(selection, () =>
            $createParagraphStyleNode(style),
          )
        }
        return true
      },
      COMMAND_PRIORITY_EDITOR,
    )
  }, [editor])

  return null
}