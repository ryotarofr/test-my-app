"use client"

import { FC, useEffect } from 'react';
import { $generateNodesFromDOM } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot, $insertNodes } from 'lexical';

export const ImportPluginHTML: FC<{
  defaultContentAsHTML?: string;
}> = ({
  defaultContentAsHTML
}) => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
      if (typeof defaultContentAsHTML === 'undefined') return;
      editor.update(() => {
        const parser = new DOMParser();
        const textHtmlMimeType: DOMParserSupportedType = 'text/html';
        const dom = parser.parseFromString(defaultContentAsHTML, textHtmlMimeType);
        const nodes = $generateNodesFromDOM(editor, dom);
        $getRoot().select();
        $insertNodes(nodes);
      });
    }, [editor, defaultContentAsHTML]);

    return null;
  };
