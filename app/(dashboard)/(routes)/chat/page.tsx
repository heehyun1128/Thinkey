"use client";
import { Heading } from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {LoadingSpace} from '@/components/loadingSpace'
import { MessagesSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ChatCompletionRequestMessage from "openai";
import { Loader } from "@/components/loader"
import {cn} from "@/lib/utils"

import { ChatCompletionMessageParam , ChatCompletionContentPart,ChatCompletionContentPartText} from "openai/resources/chat/completions";
import { UserAvatar } from "@/components/user-avatar";
import { AgentAvatar } from "@/components/agent-avatar";


const ChatPage = () => {
  const [msgs, setMsgs] = useState<ChatCompletionMessageParam[]>([]);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMsg: ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,
      };
      const newMsgs = [...msgs, userMsg];

      //   Call the api and get a response
      const res = await axios.post("/api/chat", {
        messages: newMsgs,
      });
      setMsgs((curr) => [...curr, userMsg, res.data]);
      form.reset();
    } catch (error: any) {
    } finally {
      router.refresh();
    }
  };

  const renderPart=(part:ChatCompletionContentPart): React.ReactNode=>{
    if(part.type=="text"){
        return <span>{part.text}</span>
    }else{
        return null
    }
  }

  const renderContent = (
    content: string | ChatCompletionContentPart[] | null | undefined
  ): React.ReactNode => {
    if (typeof content === "string") {
      return <span>{content}</span>;
    } else if (Array.isArray(content)) {
      // Handle array content
      return content.map((part, partIndex) => (
        <span key={partIndex}>{renderPart(part)}</span>
      ));
    } else {
      return null; // Handle other types or null/undefined
    }
  };

  return (
    // add header for chat page
    <div>
      <Heading
        title="CHAT"
        description="Start chatting with your AI agent"
        icon={MessagesSquare}
        iconColor="text-orange-500"
        bgColor="bg-orange-500/10"
      />
      {/* form/input fields */}
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="border-slate-500 border rounded-lg w-full p-5 px-4 md:px-6 focus-within:shadow-sm grid grid-cols-10 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-8">
                    <FormControl className="m-0 p-0">
                      <Input
                        disabled={isLoading}
                        placeholder="Ask me something..."
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                disabled={isLoading}
                className="col-span-12 lg:col-span-2 bg-slate-500"
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
        {isLoading && <div className="p-8 flex items-center w-full justify-center bg-muted">
                <Loader />
            </div>}
            {msgs.length===0 && !isLoading && (
                <LoadingSpace label="How can I help you?" />
            )}
          <div className="flex flex-col-reverse gap-y-2">
            {msgs.map((msg,index) => (
              <div key={index}
                className={cn("p-8 w-full flex item-start gap-x-8 rounded-lg",
                msg.role==="user"?"bg-white border border-black-10" : "bg-amber-100")} >
                  {msg.role==="user"? <UserAvatar /> : <AgentAvatar />}
                  {renderContent(msg.content)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
