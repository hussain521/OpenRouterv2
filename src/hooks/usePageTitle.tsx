import { useEffect } from 'react';

export const usePageTitle = (title: string) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `Open Router | ${title}`;
    
    // Cleanup function to restore the previous title when component unmounts
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};