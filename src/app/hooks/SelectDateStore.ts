import { create } from "zustand";

// ステートの型をインターフェースで定義する
interface DateState {
  selectedDay: Date; // 日付の型はDate
  setSelectedDay: (date: Date | undefined) => void; // 日付を更新する関数の型は(date: Date) => void
}


// create関数にステートの型を渡す
export const useDateStore = create<DateState>((set) => ({
  selectedDay: new Date(), // 初期値は今日の日付
  // setSelectedDay: (date) => set({ selectedDay: date }), // 日付を更新する関数
  setSelectedDay: (date: Date | undefined) => {
    // dateがundefinedでない場合にだけステートを更新する
    if (date) {
      set({ selectedDay: date });
    }
  },
}));