import { Button } from "@repo/ui/components/button"
import { prisma } from "@repo/db";

export default async function Page() {
  const user = await prisma.user.findFirst() 

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Button size="sm">Button</Button>
        <br></br>
        {user?.name ?? "No user added yet"}
      </div>
    </div>
  )
}
