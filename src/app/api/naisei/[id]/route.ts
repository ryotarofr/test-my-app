import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import { main } from "../route";

export const GET = async (req: Request, res: NextResponse) => {
  try {
    let created_at = (req.url.split("/naisei/")[1])
    const dateObj = new Date(created_at);

    await main();

    const getNaiseiCreatedAt = await prisma.naisei.findFirst({
      where: {
        created_at: {
          gte: new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 1), // 指定した日付の日初めを取得
          lt: new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate() + 1, 1), // 指定した日付の翌日初めを取得
        }
      }
    });

    if (!created_at) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Success", getNaiseiCreatedAt }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split("/naisei/")[1]);
    const { naisei, evaluation_type } = await req.json();
    let created_at = (req.url.split("/naisei/")[1])
    const dateObj = new Date(created_at);
    await main();

    const post = await prisma.naisei.update({
      data: { naisei, evaluation_type },
      where: {
        id,
        // created_at: {
        //   gte: new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 1), // 指定した日付の日初めを取得
        //   lt: new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate() + 1, 1), // 指定した日付の翌日初めを取得
        // }
      },
    });

    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split("/naisei/")[1]);

    await main();

    const deleteNaisei = await prisma.naisei.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Success", deleteNaisei }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
