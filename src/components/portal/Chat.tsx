import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface Msg {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
  conversation_user_id: string;
}

interface Props {
  conversationUserId: string; // the investor's user_id (groups conversation)
  currentUserId: string;
}

const Chat = ({ conversationUserId, currentUserId }: Props) => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_user_id", conversationUserId)
        .order("created_at", { ascending: true });
      setMessages((data as Msg[]) || []);
    };
    load();

    const channel = supabase
      .channel(`msgs-${conversationUserId}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `conversation_user_id=eq.${conversationUserId}` },
        (payload) => setMessages((m) => [...m, payload.new as Msg]))
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [conversationUserId]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    if (!text.trim()) return;
    const content = text.trim();
    setText("");
    await supabase.from("messages").insert({
      conversation_user_id: conversationUserId,
      sender_id: currentUserId,
      content,
    });
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-lg bg-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 && <p className="text-center text-sm text-gray-400 mt-8">No messages yet. Start the conversation.</p>}
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender_id === currentUserId ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${m.sender_id === currentUserId ? "bg-prime-blue text-white" : "bg-gray-100 text-gray-900"}`}>
              {m.content}
              <div className="text-[10px] opacity-70 mt-1">{new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={(e) => { e.preventDefault(); send(); }} className="p-3 border-t flex gap-2">
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message..." />
        <Button type="submit" size="icon" className="bg-prime-blue hover:bg-prime-blue/90"><Send className="w-4 h-4" /></Button>
      </form>
    </div>
  );
};

export default Chat;