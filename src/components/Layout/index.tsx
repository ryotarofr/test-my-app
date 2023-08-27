import { EvaluationType } from '@/app/types';
// import { useEffect, useState } from 'react';
import Calendar from '../Calendar/Calendar';
import { Editor } from '../Editor/Editor';
import StarsCanvas from '../Canvas/Stars';
// import axios from 'axios';
// import CreateNaiseiForm from './CreateNaiseiForm';



interface Item {
  id: number;
  naisei: string;
  created_at: string
  evaluation_type: EvaluationType
  // 他のプロパティがあればここに追加
}

export const Layout = () => {

  return (
    <>
      {/* <Test /> */}
      <div className='min-h-[100vh] pb-10'>
        <div className='flex justify-center items-center'>

          <div className=''>
            <Calendar />
            <div>
              {/* <h1 className='text-center py-4 text-lg'>Act when you think.</h1> */}
              <ul>
                {/* {data.map(item => (
            <li key={item.id}>{item.naisei}:{item.created_at}:{item.evaluation_type}</li>
          ))} */}
              </ul>
              <Editor />
              {/* <CreateNaiseiForm /> */}
            </div>

          </div>
          <StarsCanvas />
        </div>
      </div>
    </>
  );
}

