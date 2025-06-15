import { Icons } from "@repo/ui/components/icons";
import { Button } from "@repo/ui/components/button";
import Link from "next/link";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <Button className="fixed top-5" variant={"outline"} asChild>
        <Link href={"/"}>
          <Icons.arrowLeft className="h-2 w-2" />
          Back
        </Link>
      </Button>
      {children}
      <Toaster position="top-right" richColors/>
    </section>
    
  );
}