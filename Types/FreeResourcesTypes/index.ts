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

interface Fact {
    id: number;
    like: number;
    exelent: number;
    false: number;
    text: string;
    source: string;
    category?: string;  
  };

export interface FreeSourceProps {
    fact: Fact;  
    setFacts: React.Dispatch<React.SetStateAction<Fact[]>>;  
};
  