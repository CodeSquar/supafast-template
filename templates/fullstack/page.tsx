import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Supafast Template",
  description: "Fullstack starter with Next.js, shadcn/ui, and Supabase",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Supafast Template</CardTitle>
          <CardDescription>
            Next.js + shadcn/ui + Supabase — ready to build.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <p className="text-center text-muted-foreground">
            Your fullstack project is set up. Start editing{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
              app/page.tsx
            </code>{" "}
            to customize this page.
          </p>
          <Button asChild>
            <a
              href="https://supabase.com/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Supabase Docs
            </a>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
