import { $applyNodeReplacement, $createParagraphNode, DOMConversionMap, DOMConversionOutput, DOMExportOutput, EditorConfig, LexicalEditor, NodeKey, ParagraphNode, SerializedElementNode, SerializedParagraphNode, Spread } from "lexical"

export const ParagraphStyleTypes = {
  default: 'デフォルト',
  info: '補足説明',
  success: '補足説明（サクセス）',
  warning: '補足説明（警告）',
  error: '補足説明（注意）',
} as const
export type ParagraphStyleType = keyof typeof ParagraphStyleTypes

const NAME = 'paragraphStyle' as const
type NAME = typeof NAME

export type SerializedParagraphStyleNode = Spread<
  {
    type: NAME
    styleType?: ParagraphStyleType
    version: 1
  },
  SerializedElementNode
>

export default class ParagraphStyleNode extends ParagraphNode {
  __styleType: ParagraphStyleType = 'default'

  static getType() {
    return NAME
  }

  static clone(node: ParagraphStyleNode) {
    return new ParagraphStyleNode(node.__styleType, node.__key)
  }

  static importDOM(): DOMConversionMap | null {
    return {
      p: (_node) => {
        return {
          conversion: convertParagraphStyleElement,
          priority: 0,
        }
      },
    }
  }

  // extend元と型が違うと怒られるのでオーバーロードする
  static importJSON(serializedNode: SerializedParagraphNode): ParagraphNode
  static importJSON(
    serializedNode: SerializedParagraphStyleNode,
  ): ParagraphStyleNode
  static importJSON(
    serializedNode: SerializedParagraphNode | SerializedParagraphStyleNode,
  ) {
    if (serializedNode.type === 'paragraph') {
      return $createParagraphNode()
    } else {
      const { styleType }: any = serializedNode
      const node = $createParagraphStyleNode(styleType)
      return node
    }
  }

  constructor(styleType?: ParagraphStyleType, key?: NodeKey) {
    super(key)
    if (styleType) {
      this.__styleType = styleType
    }
  }

  // DOMに表示されるElementを作成する
  createDOM(config: EditorConfig) {
    const dom = super.createDOM(config)
    dom.dataset[NAME] = this.__styleType
    // addClassNamesToElement(dom, NAME)

    return dom
  }

  exportDOM(editor: LexicalEditor): DOMExportOutput {
    const { element } = super.exportDOM(editor)
    if (element) {
      element.classList.add(NAME)
      element.dataset[NAME] = this.__styleType
    }

    return {
      element,
    }
  }

  exportJSON(): SerializedParagraphStyleNode {
    return {
      ...super.exportJSON(),
      type: NAME,
      styleType: this.__styleType,
      version: 1,
    }
  }

  // 中のテキストをコピーしたときに、カラーボックスのスタイルも引き継ぐ
  // falseだとコピペしたときに、通常のParagraphNodeになってしまう
  extractWithChild(): boolean {
    return true
  }
}

export const $createParagraphStyleNode = (styleType?: ParagraphStyleType) => {
  return $applyNodeReplacement<ParagraphStyleNode>(
    new ParagraphStyleNode(styleType),
  )
}

function convertParagraphStyleElement(domNode: Node): DOMConversionOutput {
  let node = null
  if (
    domNode instanceof HTMLParagraphElement &&
    domNode.classList.contains(NAME) &&
    isParagraphStyleType(domNode.dataset[NAME])
  ) {
    node = $createParagraphStyleNode(domNode.dataset[NAME])
  }
  return { node }
}

const isParagraphStyleType = (str?: string): str is ParagraphStyleType => {
  return Object.keys(ParagraphStyleTypes).includes(str || '')
}