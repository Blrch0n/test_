#!/bin/bash

# Campus Event Portal - Quick Setup for Vercel
# This script helps you configure and deploy to Vercel

echo "🎓 Campus Event Portal - Vercel Deployment Setup"
echo "================================================="
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "⚠️  Vercel CLI not found. Installing..."
    npm i -g vercel
fi

echo "✅ Vercel CLI is ready"
echo ""

# Step 1: Environment Variables
echo "📝 Step 1: Set up Environment Variables"
echo "--------------------------------------"
echo "You need to add these environment variables in Vercel Dashboard:"
echo ""
echo "  DB_HOST=203.91.116.122"
echo "  DB_PORT=22136"
echo "  DB_USER=teams"
echo "  DB_PASSWORD=superSecretPassword!123"
echo "  DB_NAME=team6_event_portal"
echo "  SESSION_SECRET=$(openssl rand -base64 32)"
echo "  NODE_ENV=production"
echo ""
echo "Go to: https://vercel.com/[your-username]/[your-project]/settings/environment-variables"
echo ""
read -p "Press ENTER when you've added the environment variables..."

# Step 2: Install session store dependency
echo ""
echo "📦 Step 2: Installing session store package"
echo "-------------------------------------------"
npm install express-mysql-session --save
echo "✅ Session store package installed"

# Step 3: Git commit
echo ""
echo "💾 Step 3: Committing changes"
echo "-----------------------------"
git add .
git status
echo ""
read -p "Commit these changes? (y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]
then
    git commit -m "Configure for Vercel deployment

- Add vercel.json configuration
- Update environment variable handling
- Add comprehensive documentation
- Prepare for MySQL session store"
    echo "✅ Changes committed"
fi

# Step 4: Deploy
echo ""
echo "🚀 Step 4: Deploy to Vercel"
echo "---------------------------"
read -p "Deploy now? (y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]
then
    vercel --prod
else
    echo "Skipping deployment. Run 'vercel --prod' when ready."
fi

echo ""
echo "✅ Setup Complete!"
echo ""
echo "📚 Next Steps:"
echo "  1. Read DEPLOYMENT_GUIDE.md for detailed instructions"
echo "  2. Implement MySQL session store (see app.js.session-store-example)"
echo "  3. Test your deployment at the Vercel URL"
echo "  4. Check PROJECT_SUMMARY.md for full analysis"
echo ""
echo "🎉 Good luck with your deployment!"
