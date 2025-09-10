"use client";

import Image from "next/image";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/components/dropzone";
import { ImagePlus } from "lucide-react";
import type { Control, FieldValues, Path } from "react-hook-form";
import type { RoastFormValues } from "../../types";

type Props<T extends FieldValues = RoastFormValues> = {
  control: Control<T>;
  name: Path<T>;
  imageUrl: string | null;
  loading: boolean;
  dzBlockClick: boolean;
  onPick: () => void;
  onDropped: (f: File) => void;
  disabled?: boolean;
};

export default function UserImagePanel<T extends FieldValues = RoastFormValues>({
  control, name, imageUrl, loading, dzBlockClick, onPick, onDropped, disabled,
}: Props<T>) {
  return (
    <div className="flex min-h-0 flex-col">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-base font-semibold">User Image</h3>
      </div>

      <div className="flex-1 min-h-0">
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className="h-full">
              <FormControl>
                <div className="h-full min-h-[360px]">
                  <Dropzone
                    accept={{ "image/*": [] }}
                    maxFiles={1}
                    src={field.value}
                    onDrop={(accepted) => {
                      const f = accepted?.[0];
                      if (f) {
                        onDropped(f);
                      }
                    }}
                    disabled={loading || disabled}
                    className="relative h-full w-full rounded-xl border-dashed bg-muted p-6"
                  >
                    <DropzoneContent>
                      {imageUrl ? (
                        <div className="relative h-full w-full">
                          <Image
                            src={imageUrl}
                            alt="Uploaded"
                            fill
                            priority
                            className="object-contain pointer-events-none select-none"
                          />
                          <div
                            className={`absolute inset-0 z-10 ${dzBlockClick || loading ? "cursor-default" : "cursor-pointer"}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (dzBlockClick || loading) return;
                              onPick();
                            }}
                          />
                        </div>
                      ) : (
                        <div
                          className="flex h-full w-full flex-col items-center justify-center gap-3 text-center"
                          onClick={(e) => { e.stopPropagation(); onPick(); }}
                        >
                          <div className="flex size-16 items-center justify-center rounded-lg bg-background text-muted-foreground">
                            <ImagePlus className="h-6 w-6" />
                          </div>
                          <p className="font-medium">Drop an image here</p>
                          <p className="text-xs text-muted-foreground">or click to browse • Max 5MB</p>
                        </div>
                      )}
                    </DropzoneContent>
                    <DropzoneEmptyState />
                  </Dropzone>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
