"use client"

import { $getRoot, $getSelection, EditorState, createEditor } from 'lexical';
import { SyntheticEvent, useEffect, useState } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

// import { SyntheticEvent, useState } from 'react';
// import axios from 'axios';
import { useDateStore } from '../../hooks/SelectDateStore';
import { format } from 'date-fns';
import ExportPlugin from '../plugins/ExportPluginHTML';
import ExportPluginJson from '../plugins/ExportPluginJson';
import { ToolbarPlugin } from '../plugins/ToolbarPlugin';
import { AutoFocusPlugin } from '../plugins/AutoFocusPlugin';

import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import styles from "./Editor.module.scss";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { CodeHighlightPlugin } from "../plugins/CodeHighlightPlugin";
import { nodes } from "./nodes";
import { theme } from './editorTheme';
import { InlineToolbarPlugin } from '../plugins/InlineToolbarPlugin';
import TreeViewPlugin from '../plugins/TreeViewPlugin';
import { ImportPlugin } from '../plugins/ImportPlugin';
import { $generateNodesFromDOM } from '@lexical/html';
import { ImportPluginHTML } from '../plugins/ImportPluginHTML';
import { FC } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Button from '../Button/Button';


export const loadData = (): string => {
  // JSON.stringify(editorState)
  const text = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"example.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'
  const text2 = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"this is editorState example.a","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'
  return text2;
};


const EvaluationType = {
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
}

interface Item {
  id: number;
  naisei: string;
  created_at?: string
  // 他のプロパティがあればここに追加
}

// const theme = {
//   // Theme styling goes here
//   // ...
// }

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  // useEffect(() => {
  //   editor.focus();
  //   console.log("editorrr", editor);

  // }, [editor]);

  return null;
}

function onError(error: any) {
  console.error(error);
}

// const defaltText = 'default text daaaa'

export const Editor: FC<{
  defaultContentAsHTML?: string;
}> = ({ }) => {


  // const exportAsHTML = (contenAsHTML: string) => {
  // setData(contenAsHTML)
  // console.log("exporthtml", contenAsHTML);
  // };
  const exportAsJson = (contenAsJson: string) => {
    // const jsonString = JSON.stringify(contenAsJson);
    setNaisei(contenAsJson)
    // console.log("jsontostring", data);
    return contenAsJson
  };

  const importAsJson = (contenAsJson: string) => {
    // const jsonString = JSON.stringify(contenAsJson);
    setNaisei(contenAsJson)
    // console.log("jsontostring", data);
    return contenAsJson
  };

  const [evaluationType, setEvaluationType] = useState(EvaluationType.A);
  const [naisei, setNaisei] = useState('')
  const [naiseiId, setNaiseiId] = useState('')
  const selectedDay = useDateStore((state) => state.selectedDay);
  // const setSelectedDay = useDateStore((state) => state.setSelectedDay);
  const footer = selectedDay ? (
    <p className='text-lg'>select : {format(selectedDay, 'yyyy-MM-dd')}.</p>
  ) : (
    <p>Please pick a day.</p>
  );
  const footerDate = footer.props.children[1]

  useEffect(() => {
    setNaisei('');
    setNaiseiId('')
    async function fetchNaisei() {
      // fetch関数でリクエストを送る
      const response = await fetch(`http://localhost:3000/api/naisei/${footerDate}`);
      const resNaisei = await response.json();
      setNaisei(resNaisei.getNaiseiCreatedAt.naisei)
      setNaiseiId(resNaisei.getNaiseiCreatedAt.id)
      console.log("naiseiId", naiseiId);

    }
    fetchNaisei();
  }, [selectedDay])

  function onChange(editorState: any) {
    editorState.read(() => {
      const root = $getRoot();
      const selection = $getSelection();
      const tomato = root.__cachedText
      // console.log("onchange editorstate", root, selection, tomato);
      // setNaisei(tomato);
    });
  }

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    toast.success('Naiseiをアップデートしました!!')
  };

  useEffect(() => {
    async function updateNaisei() {
      // fetch関数でリクエストを送る
      const response = await fetch(`http://localhost:3000/api/naisei/${naiseiId}`, {
        method: "PUT",
        body: JSON.stringify({ naisei: naisei, evaluation_type: evaluationType }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // const resJson = await response.json();
      return response
    }
    updateNaisei();
  }, [selectedDay, setEvaluationType, handleUpdate])


  // const handleSubmit = async (e: SyntheticEvent) => {
  //   e.preventDefault();
  //   try {
  //     const apiUrl = 'http://localhost:3000/naisei';
  //     const response = await axios.post(apiUrl, {
  //       naisei: naisei,
  //       evaluation_type: evaluationType,
  //     });
  //     // console.log(response.data); // Handle the response as needed
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const initialConfig = {
    namespace: 'MyEditor',
    theme: theme,
    nodes: nodes,
    onError,
    editorState: naisei
  };

  // if (!naisei) return <>loading...initialconfがデフォのEditor.tsxを表示</>;

  if (!naisei) {
    // async function createNaisei() {
    //   // fetch関数でリクエストを送る
    //   const response = await fetch(`http://localhost:3000/api/naisei`, {
    //     method: "POST",
    //     body: JSON.stringify({ naisei, evaluation_type }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   return response.json();
    // }
    // createNaisei() 
    const postBlog = async ({
      naisei,
      evaluation_type,
      created_at,
    }: {
      naisei: string;
      evaluation_type: any;
      created_at: string
    }) => {
      const res = fetch("http://localhost:3000/api/naisei", {
        method: "POST",
        body: JSON.stringify({ naisei, evaluation_type }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return (await res).json();
    };
    const defaultValue = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"example.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'
    const defaultDate = "2023-08-11T00:00:00.000Z"
    const onCreate = async (e: React.FormEvent) => {
      e.preventDefault();

      await postBlog({
        naisei: defaultValue,
        evaluation_type: "A",
        created_at: defaultDate
      });
    }


    return <button onClick={onCreate} >create Naisei</button>
  }

  return (
    <div className={styles.wrapper}>
      <LexicalComposer initialConfig={initialConfig}>
        {/* <ImportPluginHTML defaultContentAsHTML={defaultContentAsHTML} /> */}
        <ToolbarPlugin />
        <InlineToolbarPlugin />
        <div className={styles.editorContainer}>
          {/* <PlainTextPlugin
            contentEditable={<ContentEditable />}
            placeholder={<div>write your naisei</div>}
            ErrorBoundary={LexicalErrorBoundary}
          /> */}
          <RichTextPlugin
            contentEditable={<ContentEditable className={styles.contentEditable} />}
            placeholder={<>write your naisei</>}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <OnChangePlugin onChange={onChange} />
        {/* {data ? */}
        <form
        // onSubmit={handleUpdate}
        >
          <label>
            Evaluation Type:
            <select value={evaluationType} onChange={(e) => setEvaluationType(e.target.value)}>
              {Object.values(EvaluationType).map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </label>
          <Button onClick={handleUpdate}>Update Naisei</Button>
          <Toaster
            position="bottom-right"
            reverseOrder={false}
          />
        </form>
        {/* : <>とりあえず何も入れない</> */}
        {/* // <form onSubmit={handleUpdate}> */}
        {/* //   <label> */}
        {/* //     Evaluation Type: */}
        {/* //     <select value={evaluationType} onChange={(e) => setEvaluationType(e.target.value)}> */}
        {/* //       {Object.values(EvaluationType).map((value) => ( */}
        {/* //         <option key={value} value={value}>{value}</option> */}
        {/* //       ))} */}
        {/* //     </select> */}
        {/* //   </label> */}
        {/* //   <button type="submit">Updated Naisei</button> */}
        {/* // </form> */}
        {/* } */}
        <AutoFocusPlugin />
        <HistoryPlugin />
        <CheckListPlugin />
        <CodeHighlightPlugin />

        {/* <HistoryPlugin /> */}
        {/* <TreeViewPlugin /> */}
        {/* <AutoFocusPlugin /> */}
        {/* <MarkdownShortcutPlugin transformers={TRANSFORMERS} /> */}
        {/* <MyCustomAutoFocusPlugin /> */}
        {/* <ExportPlugin exportAsHTML={exportAsHTML} /> */}
        <ExportPluginJson exportAsJSON={exportAsJson} />
        {/* <ImportPlugin /> */}


      </LexicalComposer>
    </div>
  );
}

