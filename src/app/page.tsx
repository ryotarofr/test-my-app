import { PostProps, NaiseiProps, EvaluationType } from "./types";
// import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Editor } from "@/components/Editor/Editor";
import { Layout } from "@/components/Layout";
import { log } from "console";

async function fetchNaisei() {
  const res = await fetch("http://localhost:3000/api/naisei", {
    cache: "no-store",
  });

  const data = await res.json();

  return data.allNaisei;
}

const postNaisei = async ({
  naisei,
  evaluation_type,
}: {
  naisei: string;
  evaluation_type: EvaluationType;
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

export default async function Home() {
  // const [evaluationType, setEvaluationType] = useState(EvaluationType.A);
  // const [data, setData] = useState<string>('');
  // const [serializedEditorState, setSerializedEditorState] = useState<string>("");
  const allNaisei = await fetchNaisei();
  // console.log(allNaisei);
  console.log("allnaisei", allNaisei);


  // useEffect(() => {
  //   async function fetchNaisei() {
  //     // fetch関数でリクエストを送る
  //     const response = await fetch("http://localhost:3000/api/naisei");
  //     // レスポンスをJSON形式でパースする
  //     const resNaisei = await response.json();
  //     // ステート変数にデータをセットする
  //     // setData(resNaisei);
  //     return resNaisei
  //   }
  //   // 非同期関数を呼び出す
  //   fetchNaisei();

  //   postNaisei({
  //     naisei: data,
  //     evaluation_type: evaluationType,
  //   });
  // }, [])
  // console.log(posts);



  // const handleCreate = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   toast.loading("Sending Request 🚀", { id: "1" });
  //   await postNaisei({
  //     naisei: data,
  //     evaluation_type: evaluationType,
  //   });
  //   
  // }

  return (
    <div className="backdrop-blur-3xl bg-black">
      <Layout />
    </div>
  );
}
