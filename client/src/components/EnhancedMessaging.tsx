import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useWebSocket } from "@/hooks/useWebSocket";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  Send,
  Phone,
  Video,
  MoreVertical,
  Search,
  Paperclip,
  Smile,
  Calendar,
  Star,
  CheckCircle2
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface EnhancedMessagingProps {
  className?: string;
}

export default function EnhancedMessaging({ className }: EnhancedMessagingProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { sendMessage } = useWebSocket();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: conversations, isLoading: conversationsLoading } = useQuery({
    queryKey: ['/api/conversations'],
    enabled: !!user,
  });

  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ['/api/messages', selectedConversation],
    enabled: !!selectedConversation,
    queryFn: async () => {
      const response = await fetch(`/api/messages/${selectedConversation}`);
      if (!response.ok) throw new Error('Failed to fetch messages');
      return response.json();
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (messageData: { content: string; receiverId: string }) => {
      return apiRequest('/api/messages', {
        method: 'POST',
        body: JSON.stringify(messageData),
      });
    },
    onSuccess: (newMessage) => {
      setNewMessage("");
      queryClient.invalidateQueries({ queryKey: ['/api/messages', selectedConversation] });
      queryClient.invalidateQueries({ queryKey: ['/api/conversations'] });
      
      // Send real-time message via WebSocket
      sendMessage({
        type: 'message',
        receiverId: selectedConversation,
        data: newMessage
      });
      
      toast({ description: "Message sent successfully" });
    },
  });

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    sendMessageMutation.mutate({
      content: newMessage.trim(),
      receiverId: selectedConversation
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const filteredConversations = conversations?.filter((conv: any) => 
    conv.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const selectedConversationData = conversations?.find((conv: any) => conv.userId === selectedConversation);

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px] ${className}`}>
      {/* Conversations List */}
      <Card className="enterprise-card lg:col-span-1">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Messages</CardTitle>
            <Badge variant="secondary" className="bg-conectify-primary/10 text-conectify-primary">
              {filteredConversations.length}
            </Badge>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[480px]">
            {conversationsLoading ? (
              <div className="space-y-3 p-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse flex space-x-3">
                    <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-slate-400 mb-2">No conversations yet</div>
                <div className="text-sm text-slate-500">Start messaging clients to begin collaborating</div>
              </div>
            ) : (
              filteredConversations.map((conversation: any) => (
                <div
                  key={conversation.userId}
                  className={`p-4 border-b cursor-pointer hover:bg-slate-50 transition-colors ${
                    selectedConversation === conversation.userId ? 'bg-conectify-primary/5 border-r-2 border-r-conectify-primary' : ''
                  }`}
                  onClick={() => setSelectedConversation(conversation.userId)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.user.profileImageUrl} />
                        <AvatarFallback>
                          {conversation.user.firstName[0]}{conversation.user.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-connectify-secondary truncate">
                          {conversation.user.firstName} {conversation.user.lastName}
                        </h4>
                        <span className="text-xs text-slate-500">
                          {formatDistanceToNow(new Date(conversation.lastMessage.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 truncate">
                        {conversation.lastMessage.content}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <Badge variant="secondary" className="bg-conectify-primary text-white text-xs mt-1">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Message Thread */}
      <Card className="enterprise-card lg:col-span-2">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedConversationData?.user.profileImageUrl} />
                    <AvatarFallback>
                      {selectedConversationData?.user.firstName[0]}{selectedConversationData?.user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-conectify-secondary">
                      {selectedConversationData?.user.firstName} {selectedConversationData?.user.lastName}
                    </h3>
                    <div className="flex items-center space-x-1 text-sm text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Online</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Calendar className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="p-0">
              <ScrollArea className="h-[380px] p-4">
                {messagesLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                        <div className="animate-pulse bg-slate-200 rounded-lg p-3 max-w-xs">
                          <div className="h-4 bg-slate-300 rounded w-24"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages?.map((message: any) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.senderId === user?.id
                            ? 'bg-conectify-primary text-white'
                            : 'bg-slate-100 text-slate-900'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <div className={`flex items-center justify-between mt-1 ${
                            message.senderId === user?.id ? 'text-white/70' : 'text-slate-500'
                          }`}>
                            <span className="text-xs">
                              {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                            </span>
                            {message.senderId === user?.id && (
                              <CheckCircle2 className="h-3 w-3" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </ScrollArea>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pr-20"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                      <Button variant="ghost" size="sm">
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || sendMessageMutation.isPending}
                    className="bg-conectify-primary hover:bg-conectify-primary/90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        ) : (
          <CardContent className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-conectify-secondary mb-2">
                Select a conversation
              </h3>
              <p className="text-conectify-neutral">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}