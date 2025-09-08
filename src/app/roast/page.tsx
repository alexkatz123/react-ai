"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { roastPicture } from "@/lib/roast";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/dropzone";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, UploadIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type RoastFormValues = {
  image: File[];
  mode: "roast" | "compliment" | "random" | "ai_decide";
};

export default function RoastPage() {
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<RoastFormValues>({
    defaultValues: { image: [], mode: "roast" },
  });

  async function onSubmit(values: RoastFormValues) {
    if (!values.image?.[0]) return;

    setReply("");
    setLoading(true);

    const result = await roastPicture(values.image[0], values.mode);

    if (result.ok && result.reply) {
      setReply(result.reply);
    } else {
      form.setError("image", {
        type: "manual",
        message: result.error || "Something went wrong",
      });
    }

    setLoading(false);
  }

  const imageUrl = form.getValues("image")?.[0]
    ? URL.createObjectURL(form.getValues("image")[0])
    : null;

  return (
    <div className="max-w-xl mx-auto py-10 space-y-6 h-full">
      {imageUrl ? (
        <Conversation className="relative w-full">
          <ConversationContent>
            <Message from={"user"}>
              <MessageContent>
                <Image
                  src={imageUrl}
                  alt="Uploaded"
                  width={250}
                  height={250}
                  className="rounded-lg"
                />
              </MessageContent>
            </Message>
            {reply ? (
              <>
              <Message from={"assistant"}>
                <MessageContent>{reply}</MessageContent>
              </Message>
              <Avatar>
                <AvatarImage
                  className="bg-muted"
                  src="/logo.svg"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              </>
              
            ) : (
              <div className="flex flex-row">
              <Avatar>
                <AvatarImage
                  className="bg-muted"
                  src="/logo.svg"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
                <Message from={"assistant"}>
                <MessageContent className="flex flex-row space-x-0.5 ">
                  <span className="font-extrabold text-primary animate-bounce">
                    .
                  </span>
                  <span className="font-extrabold text-primary animate-bounce [animation-delay:0.2s]">
                    .
                  </span>
                  <span className="font-extrabold text-primary animate-bounce [animation-delay:0.4s]">
                    .
                  </span>
                </MessageContent>
              </Message>
            
              
              </div>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      ) : (
        <Conversation className="relative w-full">
          <ConversationContent>
            <Message from={"system"}>
             
              <MessageContent>
                Upload an image and get roasted instantly! 🔥
              </MessageContent>
               <Avatar>
                <AvatarImage
                  className="bg-muted"
                  src="/logo.svg"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Message>
            <Message from={"user"}>
              <MessageContent className="w-full">
                <Card>
                  <CardHeader>
                    <CardTitle>Upload a Picture to Get Roasted 🔥</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                      >
                        <FormField
                          control={form.control}
                          name="image"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Dropzone
                                  accept={{ "image/*": [] }}
                                  maxFiles={1}
                                  src={field.value}
                                  onDrop={(accepted) =>
                                    field.onChange(accepted)
                                  }
                                  className="h-[250px]"
                                >
                                  <DropzoneContent>
                                    {field.value?.[0] ? (
                                      <Image
                                        src={URL.createObjectURL(
                                          field.value[0]
                                        )}
                                        alt="Uploaded"
                                        width={250}
                                        height={250}
                                        className="rounded-lg object-cover"
                                      />
                                    ) : (
                                      <div className="flex w-full items-center gap-4 p-8">
                                        <div className="flex size-16 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                                          <UploadIcon size={24} />
                                        </div>
                                        <div className="text-left">
                                          <p className="font-medium text-sm">
                                            Upload a file
                                          </p>
                                          <p className="text-muted-foreground text-xs">
                                            Drag and drop or click to upload
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                  </DropzoneContent>
                                  <DropzoneEmptyState />
                                </Dropzone>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex flex-row space-x-2 items-center">
                          <FormField
                            control={form.control}
                            name="mode"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="outline"
                                        className="w-full"
                                      >
                                        {field.value === "roast" && "Roast"}
                                        {field.value === "compliment" &&
                                          "Compliment"}
                                        {field.value === "random" && "Random"}
                                        {field.value === "ai_decide" &&
                                          "AI Decide"}
                                        <span className="ml-2">▼</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-full">
                                      <DropdownMenuLabel>
                                        Choose Mode
                                      </DropdownMenuLabel>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem
                                        onClick={() => field.onChange("roast")}
                                      >
                                        Roast
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() =>
                                          field.onChange("compliment")
                                        }
                                      >
                                        Compliment
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() => field.onChange("random")}
                                      >
                                        Random
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() =>
                                          field.onChange("ai_decide")
                                        }
                                      >
                                        AI Decide
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button
                            type="submit"
                            disabled={loading}
                            className="flex-1"
                          >
                            {loading ? (
                              <>
                                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                Roasting…
                              </>
                            ) : (
                              "Roast Me"
                            )}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </MessageContent>
            </Message>
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      )}
    </div>
  );
}
