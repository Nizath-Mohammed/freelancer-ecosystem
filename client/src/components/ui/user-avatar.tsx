import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  user?: {
    firstName?: string | null;
    lastName?: string | null;
    profileImageUrl?: string | null;
  };
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function UserAvatar({ user, size = "md", className }: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  const getInitials = () => {
    if (!user?.firstName && !user?.lastName) return "U";
    const first = user.firstName?.[0] || "";
    const last = user.lastName?.[0] || "";
    return `${first}${last}`.toUpperCase();
  };

  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      <AvatarImage src={user?.profileImageUrl || undefined} />
      <AvatarFallback className="bg-primary/10 text-primary font-medium">
        {getInitials()}
      </AvatarFallback>
    </Avatar>
  );
}
