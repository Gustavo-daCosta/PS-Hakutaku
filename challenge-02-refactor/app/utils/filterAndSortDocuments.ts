import type Document from "../types/Document";

interface FilterOptions {
  searchTerm: string;
  selectedCategory: string;
  selectedTags: string[];
  sortBy: string;
}

export function filterAndSortDocuments(
  documents: Document[],
  { searchTerm, selectedCategory, selectedTags, sortBy }: FilterOptions
): Document[] {
  let filtered = documents;

  if (searchTerm.trim() !== "") {
    filtered = filtered.filter(
      (doc) =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }

  if (selectedCategory !== "all") {
    filtered = filtered.filter((doc) => doc.category === selectedCategory);
  }

  if (selectedTags.length > 0) {
    filtered = filtered.filter((doc) => selectedTags.some((tag) => doc.tags.includes(tag)));
  }

  if (sortBy === "title") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "date") {
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (sortBy === "author") {
    filtered.sort((a, b) => a.author.localeCompare(b.author));
  }

  return filtered;
}
