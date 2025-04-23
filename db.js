import { MongoClient } from "mongodb";

const uri = "mongodb+srv://JHSub:piworldfermi314*@em.jtd4ba4.mongodb.net/?retryWrites=true&w=majority&appName=EM";
const client = new MongoClient(uri);

export async function saveResult(result) {
  try {
    await client.connect();
    const db = client.db("EM"); // DB 이름
    const collection = db.collection("database"); // 컬렉션 이름

    await collection.insertOne(result);
    console.log("✅ 저장 성공");
  } catch (err) {
    console.error("❌ 저장 실패:", err);
  } finally {
    await client.close();
  }
}
