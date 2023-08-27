"use client"

import React, { FC, useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes } from '@lexical/html';

export const ExportPlugin: FC<{
  exportAsHTML?: (contentAsHTML: string) => void;
}> = ({
  exportAsHTML
}) => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
      if (exportAsHTML) {
        editor.registerUpdateListener(() => {
          editor.update(() => {
            const contentAsHTML = $generateHtmlFromNodes(editor);
            exportAsHTML(contentAsHTML);
            // console.log("exportcontentAsHTML", contentAsHTML);

          });
        });
      }
    }, [editor, exportAsHTML]);

    return null;
  };

export default ExportPlugin;