import { ReactNode } from "react";

export interface CardLayoutProps {
    title: string | number;
    porch: {
      text?: string;
      email?: string;
      source: string;
      excellent?: number;
    };
    displayComment: string;
    commentText: string;
    showMore?: boolean;
    handleMore?: () => void;
    handleVote: (type: string) => void;
    isUpdating: boolean;
    formattedDate?: string;
    extraContent?: ReactNode;
  };
  
  export interface ButtonProps {
    onPress: () => void;
    children: React.ReactNode; 
    className?: string;
  };

export interface HeaderWithIconProps {
    icon: string;
    title: string; 
}