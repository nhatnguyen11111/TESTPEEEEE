import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';

// GET - Lấy danh sách tất cả posts
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';
    
    let query = {};
    if (search) {
      query = {
        name: { $regex: search, $options: 'i' }
      };
    }
    
    const sortOrder = order === 'desc' ? -1 : 1;
    const sortObj: any = {};
    sortObj[sort] = sortOrder;
    
    const posts = await Post.find(query).sort(sortObj);
    
    return NextResponse.json({ 
      success: true, 
      data: posts 
    });
    
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST - Tạo post mới
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { name, description, image } = body;
    
    if (!name || !description) {
      return NextResponse.json(
        { success: false, error: 'Name and description are required' },
        { status: 400 }
      );
    }
    
    const post = new Post({
      name,
      description,
      image
    });
    
    await post.save();
    
    return NextResponse.json({ 
      success: true, 
      data: post 
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    );
  }
}