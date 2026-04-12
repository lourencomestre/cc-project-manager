"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { daysUntilGoLive } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const days = daysUntilGoLive();

  return (
    <header className="sticky top-0 z-30 flex h-12 items-center justify-between border-b border-border bg-background px-4">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Badge
          variant={days <= 14 ? "destructive" : "outline"}
          className="font-mono text-[11px] font-normal"
        >
          {days > 0 ? `${days}d até go-live` : "Go-live!"}
        </Badge>
        <Separator orientation="vertical" className="h-4" />
        <ThemeToggle />
      </div>
    </header>
  );
}
