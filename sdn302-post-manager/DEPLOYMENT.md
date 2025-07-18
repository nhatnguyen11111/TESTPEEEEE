# Deployment Guide - SDN302 Post Manager

## 🚀 Quick Deployment to Vercel

### Step 1: Prepare Your Repository
1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit - SDN302 Post Manager"
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your repository
5. Configure environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NEXTAUTH_SECRET`: A random secret key
   - `NEXTAUTH_URL`: Your deployed URL (will be provided after deployment)

### Step 3: MongoDB Atlas Setup
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier is sufficient)
3. Create a database user:
   - Username: `admin`
   - Password: Generate a secure password
4. Network Access: Add IP address `0.0.0.0/0` (allows access from anywhere)
5. Get connection string and replace in environment variables

### Step 4: Test Your Deployment
1. Visit your deployed URL
2. Test creating, editing, and deleting posts
3. Verify search and sort functionality

## 🔧 Alternative Deployment Options

### Railway
1. Connect your GitHub repository
2. Add environment variables
3. Deploy automatically

### Render
1. Create new web service
2. Connect GitHub repository
3. Add environment variables
4. Deploy

### Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables

## 🌐 Environment Variables

Required environment variables for deployment:

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/sdn302-posts?retryWrites=true&w=majority
NEXTAUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=https://your-deployed-url.vercel.app
```

## 📝 Post-Deployment Checklist

- [ ] Application loads successfully
- [ ] Database connection works
- [ ] Can create new posts
- [ ] Can edit existing posts
- [ ] Can delete posts with confirmation
- [ ] Search functionality works
- [ ] Sort functionality works
- [ ] Images display correctly
- [ ] Responsive design works on mobile
- [ ] All API endpoints respond correctly

## 🔍 Troubleshooting

### Common Issues:

1. **Database Connection Error**
   - Check MongoDB URI format
   - Verify network access settings
   - Confirm database user permissions

2. **Environment Variables Not Loading**
   - Ensure variables are set in deployment platform
   - Check variable names match exactly
   - Redeploy after adding variables

3. **Build Errors**
   - Check all imports are correct
   - Verify TypeScript types
   - Run `npm run build` locally first

4. **API Routes Not Working**
   - Verify API route file structure
   - Check HTTP methods are correct
   - Ensure proper error handling

## 📊 Performance Optimization

- Images are optimized automatically by Next.js
- API routes use efficient MongoDB queries
- Client-side caching for better performance
- Responsive design reduces mobile load times

## 🔒 Security Considerations

- Environment variables protect sensitive data
- MongoDB connection uses authentication
- Input validation prevents injection attacks
- HTTPS enforced in production

---

For support, refer to the main README.md file or contact the development team.