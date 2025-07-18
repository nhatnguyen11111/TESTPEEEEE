# SDN302 Post Manager - Practical Exam SUM2025

A modern web application for managing posts with full CRUD functionality, built with Next.js and MongoDB.

## 🚀 Features

- **Post Management**: Create, read, update, and delete posts
- **Search & Filter**: Search posts by name and sort by name or date
- **Image Support**: Upload images or use image URLs
- **Responsive Design**: Beautiful UI that works on all devices
- **Real-time Updates**: Instant feedback for all operations
- **Confirmation Dialogs**: Safe deletion with confirmation prompts

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **UI Components**: Lucide React icons
- **Styling**: Tailwind CSS for responsive design

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB installation)
- npm or yarn package manager

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd sdn302-post-manager
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.mongodb.net/sdn302-posts?retryWrites=true&w=majority
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

**Important**: Replace the MongoDB URI with your actual connection string from MongoDB Atlas.

### 4. MongoDB Atlas Setup
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user with read/write permissions
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and update the `.env.local` file

### 5. Run the Application
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🎯 Usage

### Creating a Post
1. Click the "Add Post" button
2. Fill in the required fields (Name and Description)
3. Optionally add an image via URL or file upload
4. Click "Create" to save

### Searching Posts
- Use the search bar to find posts by name
- Results update in real-time as you type

### Sorting Posts
- Use the dropdown to sort by Name or Date
- Click the sort direction button to toggle ascending/descending

### Editing a Post
1. Click the edit icon on any post card
2. Modify the fields as needed
3. Click "Update" to save changes

### Deleting a Post
1. Click the delete icon on any post card
2. Confirm the deletion in the dialog
3. The post will be permanently removed

## 🏗️ Project Structure

```
sdn302-post-manager/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── posts/
│   │   │       ├── route.ts          # GET, POST endpoints
│   │   │       └── [id]/
│   │   │           └── route.ts      # GET, PUT, DELETE by ID
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── PostList.tsx              # Main component
│   │   ├── PostForm.tsx              # Create/Edit form
│   │   └── DeleteConfirmation.tsx    # Delete confirmation dialog
│   ├── lib/
│   │   └── mongodb.ts                # Database connection
│   └── models/
│       └── Post.ts                   # Mongoose schema
├── .env.local                        # Environment variables
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Posts Collection
- `GET /api/posts` - Get all posts with optional search and sort
- `POST /api/posts` - Create a new post
- `GET /api/posts/[id]` - Get a specific post
- `PUT /api/posts/[id]` - Update a specific post
- `DELETE /api/posts/[id]` - Delete a specific post

### Query Parameters
- `search`: Filter posts by name (case-insensitive)
- `sort`: Sort field (`name` or `createdAt`)
- `order`: Sort direction (`asc` or `desc`)

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The application can also be deployed on:
- Netlify
- Railway
- Render
- Heroku

## 🔒 Security Features

- Input validation on both client and server
- MongoDB injection protection via Mongoose
- Proper error handling
- Environment variable protection

## 🎨 UI/UX Features

- Modern, clean interface
- Smooth animations and transitions
- Loading states for better user experience
- Confirmation dialogs for destructive actions
- Responsive grid layout
- Accessible design patterns

## 📝 Development Notes

- Uses Next.js App Router for modern routing
- TypeScript for type safety
- Mongoose for MongoDB object modeling
- Tailwind CSS for utility-first styling
- Lucide React for consistent iconography

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for educational purposes as part of the SDN302 course practical exam.

---

**Student ID**: [Replace with your actual Student ID]
**Course**: SDN302 - Practical Exam SUM2025
**Submission Date**: [Current Date]
