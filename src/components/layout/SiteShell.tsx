import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import type { Collection } from "@/types/catalog";

interface SiteShellProps {
  children: ReactNode;
  collections: Collection[];
}

export const SiteShell = ({ children, collections }: SiteShellProps) => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header collections={collections} />
    <main className="flex-1">{children}</main>
    <Footer collections={collections} />
  </div>
);
