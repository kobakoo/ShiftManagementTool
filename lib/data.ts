export const data: People[] = [
  {
    id: 1,
    name: "山田太郎",
    date: "2025-09-7",
    start: "19:30",
    end: "21:00",
    role: "受付",
  },
  {
    id: 2,
    name: "佐藤花",
    date: "2025-09-7",
    start: "21:00",
    end: "23:00",
    role: "開店準備",
  },
  {
    id: 2,
    name: "佐藤花",
    date: "2025-09-11",
    start: "07:00",
    end: "12:00",
    role: "開店準備",
  },
  {
    id: 3,
    name: "鈴木一郎",
    date: "2025-09-11",
    start: "12:00",
    end: "18:00",
    role: "ホールスタッフ",
  },
  {
    id: 4,
    name: "田中美咲",
    date: "2025-09-12",
    start: "10:00",
    end: "15:00",
    role: "調理補助",
  },
  {
    id: 5,
    name: "高橋健",
    date: "2025-09-12",
    start: "15:00",
    end: "22:00",
    role: "調理",
  },
  {
    id: 6,
    name: "中村彩",
    date: "2025-09-13",
    start: "08:00",
    end: "14:00",
    role: "開店準備",
  },
  {
    id: 7,
    name: "伊藤大輔",
    date: "2025-09-13",
    start: "14:00",
    end: "21:00",
    role: "ホールスタッフ",
  },
  {
    id: 8,
    name: "小林優",
    date: "2025-09-14",
    start: "09:00",
    end: "17:00",
    role: "受付",
  },
  {
    id: 9,
    name: "松本梨花",
    date: "2025-09-14",
    start: "17:00",
    end: "23:00",
    role: "調理補助",
  },
];

export type People = {
  id: number;
  name: string;
  date: string;
  start: string;
  end: string;
  role: string;
};
