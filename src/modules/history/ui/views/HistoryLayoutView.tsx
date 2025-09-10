"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { BadgeVariant } from "@/types/types";
import { buildFileViewUrl } from "@/modules/history/utils/files";
import type { HistoryDoc } from "@/modules/history/types";
import { Sidebar, SidebarHeader, SidebarContent, SidebarInset, useSidebar } from "@/components/ui/sidebar";

type Props = {
  docs: HistoryDoc[];
  children: React.ReactNode;
};

function HistoryList({ docs }: { docs: HistoryDoc[] }) {
  const { isMobile, setOpenMobile } = useSidebar();
  return (
    <>
      {docs.length === 0 && (
        <p className="text-sm text-muted-foreground">Nothing here yet.</p>
      )}
      {docs.map((doc) => (
        <Link
          key={doc.$id}
          href={`/history/${doc.$id}`}
          className="flex gap-3 rounded-md border bg-card p-2 hover:bg-muted transition-colors"
          onClick={() => {
            if (isMobile) setOpenMobile(false);
          }}
        >
          <div className="relative w-14 h-14 flex-shrink-0 rounded-md overflow-hidden border">
            <Image
              src={buildFileViewUrl(doc.fileId)}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <Badge
                variant={doc.mode as BadgeVariant}
                className="text-xs capitalize"
              >
                {doc.mode}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
              {doc.reply}
            </p>
          </div>
        </Link>
      ))}
    </>
  );
}

export default function HistoryLayoutView({ docs, children }: Props) {
  const { isMobile, state } = useSidebar();
  const shrinkForSidebar = !isMobile && state === "expanded";
  return (
    <>
      <Sidebar side="left" collapsible="offcanvas">
        <SidebarHeader className="p-4">
          <h2 className="text-lg font-semibold">History</h2>
        </SidebarHeader>
        <SidebarContent className="space-y-3 p-4">
          <HistoryList docs={docs} />
        </SidebarContent>
      </Sidebar>
      <SidebarInset
        className="min-h-screen md:h-screen"
        style={shrinkForSidebar ? {
          marginLeft: "var(--sidebar-width)",
          width: "calc(100% - var(--sidebar-width))",
        } : undefined}
      >
        {children}
      </SidebarInset>
    </>
  );
}

// No local topbar; navbar handles trigger and layout.
