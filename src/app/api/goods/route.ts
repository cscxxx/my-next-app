import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  prisma.user.findMany();

  const data = await prisma.goods.findMany({
    orderyBy: {
      id: "price",
    },
  });
  return NextResponse.json({
    code: 200,
    msg: "获取数据成功",
    data,
  });
};

export const POST = async (req: NextResponse) => {
  console.log(req);

  const data = await req.json();
  await prisma.goods.create({
    data,
  });
  return NextResponse.json({
    code: 200,
    msg: "创建数据成功",
  });
};
