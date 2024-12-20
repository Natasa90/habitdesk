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
  
  export interface GradientButtonProps {
    onPress: () => void;
    children: React.ReactNode; // Required to ensure the icon is passed
  };

export interface HeaderWithIconProps {
    icon: string;
    title: string; 
}