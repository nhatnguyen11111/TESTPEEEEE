'use client';

import { useState, useEffect } from 'react';
import { IPost } from '@/models/Post';
import { Search, Plus, Edit, Trash2, ArrowUpDown } from 'lucide-react';
import PostForm from './PostForm';
import DeleteConfirmation from './DeleteConfirmation';

export default function PostList() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<IPost | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingPost, setDeletingPost] = useState<IPost | null>(null);

  useEffect(() => {
    fetchPosts();
  }, [searchTerm, sortBy, sortOrder]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        search: searchTerm,
        sort: sortBy,
        order: sortOrder
      });
      
      const response = await fetch(`/api/posts?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = () => {
    setEditingPost(null);
    setShowForm(true);
  };

  const handleEditPost = (post: IPost) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleDeletePost = (post: IPost) => {
    setDeletingPost(post);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!deletingPost) return;
    
    try {
      const response = await fetch(`/api/posts/${deletingPost._id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        fetchPosts();
        setShowDeleteConfirm(false);
        setDeletingPost(null);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingPost(null);
    fetchPosts();
  };

  const toggleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Post Manager</h1>
        
        {/* Search and Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="createdAt">Sort by Date</option>
            </select>
            
            <button
              onClick={toggleSort}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <ArrowUpDown className="h-4 w-4" />
            </button>
            
            <button
              onClick={handleCreatePost}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Post
            </button>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {post.image && (
              <img
                src={post.image}
                alt={post.name}
                className="w-full h-48 object-cover"
              />
            )}
            
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.name}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {new Date(post.createdAt || '').toLocaleDateString()}
                </span>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditPost(post)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDeletePost(post)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No posts found.</p>
          <button
            onClick={handleCreatePost}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create your first post
          </button>
        </div>
      )}

      {/* Modals */}
      {showForm && (
        <PostForm
          post={editingPost}
          onClose={handleFormClose}
        />
      )}

      {showDeleteConfirm && (
        <DeleteConfirmation
          post={deletingPost}
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowDeleteConfirm(false);
            setDeletingPost(null);
          }}
        />
      )}
    </div>
  );
}