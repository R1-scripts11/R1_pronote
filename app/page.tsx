import { LoginButton } from "@/src/auth/LoginButton";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(options)
  console.log(options)
  console.log(session)
  if (session) {
    return <p>{JSON.stringify(session, null, 2)}</p>
  }

  return (
    <div>
      <LoginButton/>
    </div>
  );
}
