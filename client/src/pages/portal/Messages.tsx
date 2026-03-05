import PortalLayout from "@/components/PortalLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/_core/hooks/useAuth";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Send, MessageSquare, Loader2, BookOpen } from "lucide-react";

// Jessica's admin user ID — we'll get it from the admin user list
const JESSICA_DISPLAY = { name: "Jessica Seiders", initials: "JS" };

export default function Messages() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get admin users to find Jessica's ID
  const { data: allMessages, isLoading, refetch } = trpc.messages.list.useQuery({});

  // Find Jessica's ID from messages (she's the admin)
  const jessicaId = allMessages?.find(m => m.fromUserId !== user?.id)?.fromUserId
    ?? allMessages?.find(m => m.toUserId !== user?.id)?.toUserId;

  const { data: conversation, refetch: refetchConvo } = trpc.messages.list.useQuery(
    { otherUserId: jessicaId! },
    { enabled: !!jessicaId, refetchInterval: 5000 }
  );

  const sendMessage = trpc.messages.send.useMutation({
    onSuccess: () => {
      setMessage("");
      refetchConvo();
    },
    onError: (e) => toast.error(e.message),
  });

  const markRead = trpc.messages.markRead.useMutation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  useEffect(() => {
    if (jessicaId && user?.id) {
      markRead.mutate({ fromUserId: jessicaId });
    }
  }, [jessicaId, conversation?.length]);

  const handleSend = () => {
    if (!message.trim()) return;
    if (!jessicaId) {
      // No prior conversation — send to admin (ID 1 as fallback)
      sendMessage.mutate({ toUserId: 1, content: message.trim() });
      return;
    }
    sendMessage.mutate({ toUserId: jessicaId, content: message.trim() });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const displayMessages = jessicaId ? conversation : [];

  return (
    <PortalLayout title="Messages" subtitle="Chat directly with Jessica">
      <div className="flex flex-col h-[calc(100vh-12rem)] max-h-[700px]">
        {/* Chat header */}
        <div className="flex items-center gap-4 p-4 border border-border rounded-t-2xl bg-card">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-serif font-bold text-sm">
            JS
          </div>
          <div>
            <h3 className="font-serif font-semibold text-foreground">Jessica Seiders</h3>
            <div className="flex items-center gap-1.5 text-xs font-sans text-green-600">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Travel Advisor · Next Chapter Travel
            </div>
          </div>
          <div className="ml-auto">
            <div className="flex items-center gap-1.5 text-xs font-sans text-muted-foreground">
              <BookOpen className="w-3.5 h-3.5" />
              Also: To Be Read Bookstore
            </div>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 border-x border-border bg-muted/20 space-y-4">
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-secondary" />
            </div>
          )}

          {!isLoading && (!displayMessages || displayMessages.length === 0) && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <MessageSquare className="w-12 h-12 text-muted-foreground mb-3" />
              <h3 className="text-lg font-serif font-semibold text-foreground mb-2">Start the Conversation</h3>
              <p className="text-muted-foreground font-sans text-sm max-w-xs">
                Send Jessica a message about your trip, questions, or anything you need help with.
              </p>
            </div>
          )}

          {displayMessages?.map((msg) => {
            const isFromMe = msg.fromUserId === user?.id;
            return (
              <div
                key={msg.id}
                className={`flex ${isFromMe ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex items-end gap-2 max-w-[75%] ${isFromMe ? "flex-row-reverse" : "flex-row"}`}>
                  {/* Avatar */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    isFromMe
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}>
                    {isFromMe ? (user?.name?.charAt(0) ?? "?") : "JS"}
                  </div>

                  {/* Bubble */}
                  <div className={`rounded-2xl px-4 py-3 ${
                    isFromMe
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-card border border-border text-foreground rounded-bl-sm"
                  }`}>
                    <p className="font-sans text-sm leading-relaxed">{msg.content}</p>
                    <p className={`font-sans text-xs mt-1 ${isFromMe ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                      {new Date(msg.createdAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="flex items-center gap-3 p-4 border border-t-0 border-border rounded-b-2xl bg-card">
          <Input
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message to Jessica..."
            className="flex-1 font-sans border-border"
            disabled={sendMessage.isPending}
          />
          <Button
            onClick={handleSend}
            disabled={!message.trim() || sendMessage.isPending}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-sans"
            size="icon"
          >
            {sendMessage.isPending
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : <Send className="w-4 h-4" />
            }
          </Button>
        </div>
      </div>
    </PortalLayout>
  );
}
