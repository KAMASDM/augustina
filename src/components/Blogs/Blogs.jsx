// components/Blogs/Blogs.jsx

"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Search,
  Filter,
  X,
  Calendar,
  Tag,
  User,
  SortAsc,
  SortDesc,
  RefreshCw,
  FolderOpen,
  Clock,
  TrendingUp,
  Grid,
  List,
  ChevronDown,
  ChevronUp
} from "lucide-react";

// Helper function to strip HTML and create plain text summary
const createSummary = (htmlContent, length = 100) => {
  if (!htmlContent || typeof htmlContent !== 'string') return "";
  
  try {
    const plainText = htmlContent
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, " ")
      .trim();
    
    return plainText.length > length
      ? plainText.substring(0, length) + "..."
      : plainText;
  } catch (error) {
    console.error("Error creating summary:", error);
    return "";
  }
};

// Helper function to get proper image URL
const getImageUrl = (imagePath) => {
  if (!imagePath || imagePath === null || imagePath === "null") {
    return "/assets/images/placeholder.png";
  }
  
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `https://sweekarme.in${cleanPath}`;
};

// Blog Image component with error handling
const BlogImage = ({ src, alt, ...props }) => {
  const [imgSrc, setImgSrc] = useState(() => getImageUrl(src));
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      console.log("Blog image failed to load:", imgSrc);
      setHasError(true);
      setImgSrc("/assets/images/placeholder.png");
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt || "Blog post image"}
      onError={handleError}
      {...props}
    />
  );
};

// Filter Section Component
const FilterSection = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory,
  selectedTag,
  setSelectedTag,
  selectedAuthor,
  setSelectedAuthor,
  sortBy, 
  setSortBy,
  viewMode,
  setViewMode,
  categories,
  tags,
  authors,
  onClearFilters,
  totalResults,
  isFiltered
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6 mb-8 sticky top-20 z-10">
      {/* Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles by title, content, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors text-gray-900 placeholder-gray-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>
        
        {/* View Mode Toggle */}
        <div className="flex items-center bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid' 
                ? 'bg-white text-primary-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            title="Grid view"
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list' 
                ? 'bg-white text-primary-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            title="List view"
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-700 text-sm"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Sort Options */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-700 text-sm"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
          <option value="category">By Category</option>
        </select>

        {/* Advanced Filters Toggle */}
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 text-sm"
        >
          <Filter className="w-4 h-4" />
          More Filters
          {showAdvancedFilters ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {/* Clear Filters */}
        {isFiltered && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Clear Filters
          </button>
        )}
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showAdvancedFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-200 pt-4 mt-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Tag Filter */}
              {tags.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Tag
                  </label>
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-700 text-sm"
                  >
                    <option value="">All Tags</option>
                    {tags.map((tag) => (
                      <option key={tag.slug || tag.name} value={tag.slug || tag.name}>
                        {tag.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Author Filter */}
              {authors.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Author
                  </label>
                  <select
                    value={selectedAuthor}
                    onChange={(e) => setSelectedAuthor(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-700 text-sm"
                  >
                    <option value="">All Authors</option>
                    {authors.map((author) => (
                      <option key={author.id || author.username} value={author.id || author.username}>
                        {author.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600 mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          <span>
            {totalResults === 0 
              ? "No articles found" 
              : `${totalResults} article${totalResults !== 1 ? 's' : ''} found`
            }
          </span>
        </div>
        {isFiltered && (
          <div className="flex items-center gap-1 text-primary-600">
            <Filter className="w-4 h-4" />
            <span>Filters active</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Blog Card Components
const BlogGridCard = ({ blog, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: Math.min(index * 0.1, 0.5) }}
    className="bg-white rounded-2xl shadow-lg overflow-hidden group h-full flex flex-col hover:shadow-2xl transition-all duration-300"
  >
    <Link href={`/blogs/${blog.slug}`} className="block">
      <div className="relative w-full h-56 flex-shrink-0 overflow-hidden">
        <BlogImage
          src={blog.featured_image}
          alt={`Featured image for ${blog.title}`}
          fill
          className="object-cover transform group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        {blog.category?.name && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
              {blog.category.name}
            </span>
          </div>
        )}
      </div>
    </Link>

    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-gray-900 mb-3 flex-grow line-clamp-2 leading-tight">
        <Link
          href={`/blogs/${blog.slug}`}
          className="hover:text-primary-600 transition-colors"
        >
          {blog.title}
        </Link>
      </h3>

      {blog.content && (
        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-4">
          {createSummary(blog.content, 120)}
        </p>
      )}

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
        {blog.published_at && (
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(blog.published_at).toLocaleDateString()}</span>
          </div>
        )}
        {blog.author && (
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>
              {blog.author.first_name 
                ? `${blog.author.first_name} ${blog.author.last_name || ''}`.trim()
                : blog.author.username || 'Team'
              }
            </span>
          </div>
        )}
      </div>

      <div className="mt-auto pt-4 border-t border-neutral-100">
        <Link
          href={`/blogs/${blog.slug}`}
          className="inline-flex items-center font-semibold text-primary-500 hover:text-primary-600 transition-colors"
        >
          Read More
          <HiOutlineArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </div>
  </motion.div>
);

const BlogListCard = ({ blog, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: Math.min(index * 0.1, 0.5) }}
    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
  >
    <div className="flex flex-col sm:flex-row">
      <Link href={`/blogs/${blog.slug}`} className="block sm:w-1/3">
        <div className="relative h-48 sm:h-full overflow-hidden">
          <BlogImage
            src={blog.featured_image}
            alt={`Featured image for ${blog.title}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-grow sm:w-2/3">
        {blog.category?.name && (
          <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium mb-3 self-start">
            {blog.category.name}
          </span>
        )}

        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          <Link
            href={`/blogs/${blog.slug}`}
            className="hover:text-primary-600 transition-colors"
          >
            {blog.title}
          </Link>
        </h3>

        {blog.content && (
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {createSummary(blog.content, 200)}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            {blog.published_at && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{new Date(blog.published_at).toLocaleDateString()}</span>
              </div>
            )}
            {blog.author && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>
                  {blog.author.first_name 
                    ? `${blog.author.first_name} ${blog.author.last_name || ''}`.trim()
                    : blog.author.username || 'Team'
                  }
                </span>
              </div>
            )}
          </div>

          <Link
            href={`/blogs/${blog.slug}`}
            className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium text-sm transition-colors"
          >
            Read More
            <HiOutlineArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  </motion.div>
);

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // URL state management for filters (uncomment when hook is available)
  // import { useUrlState } from '@/hooks/useUrlState';
  // const {
  //   searchQuery, setSearchQuery,
  //   selectedCategory, setSelectedCategory,
  //   selectedTag, setSelectedTag,
  //   selectedAuthor, setSelectedAuthor,
  //   sortBy, setSortBy,
  //   viewMode, setViewMode,
  //   clearFilters,
  //   hasActiveFilters
  // } = useUrlState();

  // For now, using local state (replace with URL state hook above when ready)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const hasActiveFilters = searchQuery || selectedCategory || selectedTag || selectedAuthor;
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedTag("");
    setSelectedAuthor("");
    setSortBy("newest");
  };

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://sweekarme.in/asiabio/api/blogs/");
        const blogsData = Array.isArray(response.data) ? response.data : [];
        const validBlogs = blogsData.filter(blog => 
          blog && typeof blog === 'object' && blog.id && blog.title && blog.slug
        );
        setBlogs(validBlogs);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Extract filter options
  const filterOptions = useMemo(() => {
    // Extract unique categories by ID
    const categoryMap = new Map();
    blogs.forEach(blog => {
      if (blog.category?.name && blog.category?.id) {
        categoryMap.set(blog.category.id, blog.category);
      }
    });
    const categories = Array.from(categoryMap.values());

    // Extract unique tags by slug or name
    const tagMap = new Map();
    blogs.forEach(blog => {
      if (blog.tags && Array.isArray(blog.tags)) {
        blog.tags.forEach(tag => {
          if (tag && (tag.slug || tag.name)) {
            const key = tag.slug || tag.name;
            tagMap.set(key, tag);
          }
        });
      }
    });
    const tags = Array.from(tagMap.values());

    // Extract unique authors by ID
    const authorMap = new Map();
    blogs.forEach(blog => {
      if (blog.author && (blog.author.id || blog.author.username)) {
        const key = blog.author.id || blog.author.username;
        const name = blog.author.first_name 
          ? `${blog.author.first_name} ${blog.author.last_name || ''}`.trim()
          : blog.author.username || 'Unknown Author';
        
        authorMap.set(key, {
          ...blog.author,
          name: name
        });
      }
    });
    const authors = Array.from(authorMap.values());

    // Debug logging (remove in production)
    if (process.env.NODE_ENV === 'development') {
      console.log('Filter Options:', { 
        categoriesCount: categories.length, 
        tagsCount: tags.length, 
        authorsCount: authors.length 
      });
    }

    return { categories, tags, authors };
  }, [blogs]);

  // Filter and sort blogs
  const filteredBlogs = useMemo(() => {
    let filtered = blogs;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(blog => 
        blog.title?.toLowerCase().includes(query) ||
        blog.content?.toLowerCase().includes(query) ||
        blog.category?.name?.toLowerCase().includes(query) ||
        blog.tags?.some(tag => tag.name?.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(blog => 
        blog.category && blog.category.id == selectedCategory
      );
    }

    // Tag filter
    if (selectedTag) {
      filtered = filtered.filter(blog => 
        blog.tags?.some(tag => 
          (tag.slug && tag.slug === selectedTag) || 
          (tag.name && tag.name === selectedTag)
        )
      );
    }

    // Author filter
    if (selectedAuthor) {
      filtered = filtered.filter(blog => 
        blog.author && 
        (blog.author.id == selectedAuthor || blog.author.username === selectedAuthor)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.published_at || a.created_at) - new Date(b.published_at || b.created_at);
        case "title-asc":
          return (a.title || "").localeCompare(b.title || "");
        case "title-desc":
          return (b.title || "").localeCompare(a.title || "");
        case "category":
          return (a.category?.name || "").localeCompare(b.category?.name || "");
        case "newest":
        default:
          return new Date(b.published_at || b.created_at) - new Date(a.published_at || a.created_at);
      }
    });

    return filtered;
  }, [blogs, searchQuery, selectedCategory, selectedTag, selectedAuthor, sortBy]);

  // Check if filters are active
  const isFiltered = hasActiveFilters;

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500 mx-auto mb-6"></div>
          <p className="text-xl font-semibold text-gray-900">Loading articles...</p>
          <p className="text-gray-600 mt-2">Please wait while we fetch the latest content</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 flex justify-center items-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <X className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load Articles</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-neutral-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-50 to-neutral-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              From Our Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest industry news, trends, and expert
              insights from our team.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter Section */}
          <FilterSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            selectedAuthor={selectedAuthor}
            setSelectedAuthor={setSelectedAuthor}
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewMode={viewMode}
            setViewMode={setViewMode}
            categories={filterOptions.categories}
            tags={filterOptions.tags}
            authors={filterOptions.authors}
            onClearFilters={clearFilters}
            totalResults={filteredBlogs.length}
            isFiltered={isFiltered}
          />

          {/* Blog Results */}
          {filteredBlogs.length > 0 ? (
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-6"
            }>
              {filteredBlogs.map((blog, index) => 
                viewMode === 'grid' ? (
                  <BlogGridCard key={blog.id} blog={blog} index={index} />
                ) : (
                  <BlogListCard key={blog.id} blog={blog} index={index} />
                )
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {blogs.length === 0 ? "No Articles Found" : "No Results Found"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {blogs.length === 0 
                    ? "We're working on creating great content for you. Check back soon!" 
                    : "Try adjusting your search or filter criteria to find what you're looking for."
                  }
                </p>
                {isFiltered ? (
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Clear All Filters
                  </button>
                ) : (
                  <Link
                    href="/"
                    className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
                  >
                    Return Home
                    <HiOutlineArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blogs;