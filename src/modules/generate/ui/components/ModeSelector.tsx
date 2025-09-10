"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Mode } from "../../types";
import { modeLabel, modeMeta } from "../../utils/mode";

type Props = {
  value: Mode;
  onChange: (m: Mode) => void;
  disabled?: boolean;
  className?: string;
};

export default function ModeSelector({ value, onChange, disabled, className }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="outline" className={className ?? "w-48 justify-between"} disabled={disabled}>
          <span className="flex items-center gap-2">
            <span className={`inline-block h-2.5 w-2.5 rounded-full ${modeMeta[value].dot}`} />
            Mode: {modeLabel(value)}
          </span>
          <ChevronDown className="ml-2 h-4 w-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Choose Mode</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {(["roast","compliment","random","ai_decide"] as Mode[]).map((m) => (
          <DropdownMenuItem key={m} onClick={() => onChange(m)} disabled={disabled}>
            <span className="flex items-center gap-2">
              <span className={`inline-block h-2.5 w-2.5 rounded-full ${modeMeta[m].dot}`} />
              {modeLabel(m)}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
