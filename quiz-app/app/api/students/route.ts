// import { query } from "@/lib/connectDB";
// import { NextRequest } from "next/server";

// export const GET = async () => {
//   const Article = await query("SELECT * FROM students WHERE age > 18");
//   return Response.json({ message: "success", data: Article });
// };

// export const POST = async (request: NextRequest) => {
//   const body = await request.json();
//   const { title, content, summary } = body;

//   const Article = await query(
//     `INSERT INTO students(title, content, summary) VALUES (${title}, ${content}, ${summary})`
//   );
//   return Response.json({ message: "successfully added", data: Article });
// };
