// hook/useSectionPagination.js
import { useState, useEffect } from 'react';
import { useFetchHomePage } from './useFetchHomePage';

export const useSectionPagination = (sectionId, initialItems, paginationMeta) => {
  const [page, setPage] = useState(paginationMeta?.current_page || 1);
  const [items, setItems] = useState(initialItems);
  
  const { data, isLoading, refetch } = useFetchHomePage(sectionId, page);
  
  useEffect(() => {
    if (data?.data?.length) {
      // Find the section with matching id
      const updatedSection = data.data.find(item => item.id === sectionId);
      if (updatedSection) {
        if (Array.isArray(updatedSection.items)) {
          setItems(updatedSection.items);
        } else if (updatedSection.items?.data) {
          setItems(updatedSection.items.data);
        }
      }
    }
  }, [data, sectionId]);
  
  const goToNextPage = () => {
    if (paginationMeta?.next_page_url) {
      setPage(prev => prev + 1);
      refetch();
    }
  };
  
  const goToPrevPage = () => {
    if (paginationMeta?.prev_page_url) {
      setPage(prev => prev - 1);
      refetch();
    }
  };
  
  return {
    items,
    isLoading,
    currentPage: page,
    totalPages: paginationMeta?.last_page || 1,
    goToNextPage,
    goToPrevPage,
    hasNextPage: !!paginationMeta?.next_page_url,
    hasPrevPage: !!paginationMeta?.prev_page_url,
  };
};