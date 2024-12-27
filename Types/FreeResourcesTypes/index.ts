export interface CategoryTagsProps { 
    categories: string [] | { name: string } []; 
    handleCategoryClick: (category: string) => void;
    isActive: (category: string) => boolean;
};

export interface Source {
    id: number;
    like: number;
    exelent: number;
    false: number;
    text: string;
    source: string;
    category?: string;
};

export type LearningSourcesProps = {
    sources: Source[];
};

export interface TitleProps {
    title: string
};

export interface CategoryProps {
    name: string;
};

export interface CategoryFilterProps {
    setCurrentCategory: (category: string) => void; 
    currentCategory: string;
};

export interface Fact {
    id: number;
    like: number;
    exelent: number;
    false: number;
    text: string;
    source: string;
    category?: string;  
  };

export interface FreeResListProps {
    resources: Fact[]; // List of resources to render
    isLoading: boolean; // Indicates if data is being fetched
    handleVote: (columnName: keyof Fact, fact: Fact) => void; // Function to handle voting
    handleShowComments: (resourceId: number) => void; // Function to handle showing comments
    loadMore: () => void; // Function to load more resources
}