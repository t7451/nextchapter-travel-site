import { AdminLayout } from "./AdminDashboard";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/_core/hooks/useAuth";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Send, MessageSquare, Loader2, Users } from "lucide-react";
import { useSearch } from "wouter";

export default function AdminMessages() {
  const { user } = useAuth();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const defaultClientId = params.get("client") ? Number(params.get("client")) : undefined;

  const { data: clients } = trpc.admin.clients.useQuery();
  const [selectedClientId, setSelectedClientId] = useState<number | null>(defaultClientId ?? null);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedClient = clients?.find(c => c.id === selectedClientId);

  const { data: conversation, refetch } = trpc.messages.list.useQuery(
    { otherUserId: selectedClientId! },
    { enabled: !!selectedClientId, refetchInterval: 5000 }
  );

  const sendMessage = trpc.messages.send.useMutation({
    onSuccess: () => { setMessage(""); refetch(); },
    onError: (e) => toast.error(e.message),
  });

  const markRead = trpc.messages.markRead.useMutation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  useEffect(() => {
    if (selectedClientId && user?.id) {
      markRead.mutate({ fromUserId: selectedClientId });
    }
  }, [selectedClientId, conversation?.length]);

  const handleSend = () => {
    if (!message.trim() || !selectedClientId) return;
    sendMessage.mutate({ toUserId: selectedClientId, content: message.trim() });
  };

  return (
    <AdminLayout title="Messages" subtitle="Chat with your clients">
      <div className="flex gap-6 h-[calc(100vh-12rem)]">
        {/* Client list */}
        <div className="w-72 flex-shrink-0 border border-border rounded-2xl overflow-hidden flex flex-col bg-card">
          <div className="p-4 border-b border-border">
            <h3 className="font-serif font-semibold text-foreground text-sm">Clients</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            {!clients || clients.length === 0 ? (
              <div className="p-4 text-center">
                <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground font-sans text-xs">No clients yet</p>
              </div>
            ) : (
              clients.map(client => (
                <button
                  key={client.id}
                  onClick={() => setSelectedClientId(client.id)}
                  className={`w-full flex items-center gap-3 p-4 text-left hover:bg-muted/50 transition-colors border-b border-border/50 ${
                    selectedClientId === client.id ? "bg-primary/5 border-l-2 border-l-primary" : ""
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif font-bold text-sm flex-shrink-0">
                    {client.name?.charAt(0) ?? "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm font-medium text-foreground truncate">{client.name ?? "Unknown"}</p>
                    <p className="font-sans text-xs text-muted-foreground truncate">{client.email ?? ""}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col border border-border rounded-2xl overflow-hidden">
          {!selectedClientId ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="text-lg font-serif font-semibold text-foreground mb-2">Select a Client</h3>
                <p className="text-muted-foreground font-sans text-sm">Choose a client from the list to start messaging.</p>
              </div>
            </div>
          ) : (
            <>
              {/* Chat header */}
              <div className="flex items-center gap-3 p-4 border-b border-border bg-card">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif font-bold">
                  {selectedClient?.name?.charAt(0) ?? "?"}
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-foreground">{selectedClient?.name ?? "Client"}</h3>
                  <p className="text-xs font-sans text-muted-foreground">{selectedClient?.email ?? ""}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/10">
                {!conversation || conversation.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground font-sans text-sm">No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  conversation.map(msg => {
                    const isFromMe = msg.fromUserId === user?.id;
                    return (
                      <div key={msg.id} className={`flex ${isFromMe ? "justify-end" : "justify-start"}`}>
                        <div className={`flex items-end gap-2 max-w-[75%] ${isFromMe ? "flex-row-reverse" : "flex-row"}`}>
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                            isFromMe ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"
                          }`}>
                            {isFromMe ? "JS" : (selectedClient?.name?.charAt(0) ?? "?")}
                          </div>
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
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex items-center gap-3 p-4 border-t border-border bg-card">
                <Input
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
                  placeholder={`Message ${selectedClient?.name ?? "client"}...`}
                  className="flex-1 font-sans"
                />
                <Button
                  onClick={handleSend}
                  disabled={!message.trim() || sendMessage.isPending}
                  className="bg-primary text-primary-foreground font-sans"
                  size="icon"
                >
                  {sendMessage.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
