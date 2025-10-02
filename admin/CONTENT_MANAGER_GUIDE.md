# Content Manager Guide

## Overview
A unified content management tool for managing games and showcases on Nobulem.wtf. This clean, light-themed interface replaces the old Python scripts and provides a modern web-based UI.

## Features

### Games Management
- Add, edit, and delete games
- Set game status (Working, Updating, Patched)
- Add multiple features to games
- Track Roblox game IDs and thumbnails

### Showcases Management
- Add, edit, and delete video showcases
- Automatic YouTube thumbnail extraction
- Track views, duration, and dates
- Support for custom channel names

## Setup

### 1. Database Migration
First, apply the database migration to create the required tables:

```bash
# The migration file is located at:
# supabase/migrations/20250102000000_create_content_tables.sql
```

This creates:
- `games` table with RLS policies
- `showcases` table with RLS policies
- Automatic `updated_at` triggers
- Performance indexes

### 2. Access the Manager
Navigate to:
```
https://your-domain.com/admin/content-manager.html
```

### 3. Authentication
You need to be authenticated to add, edit, or delete content. The public can view content without authentication.

## Using the Content Manager

### Managing Games

#### Add a New Game
1. Click "Add New Game"
2. Fill in:
   - Game Name (required)
   - Roblox Game ID (required)
   - Thumbnail URL (required)
   - Description (required)
   - Status (Working/Updating/Patched)
3. Add features:
   - Type feature name
   - Click "Add"
   - Repeat for multiple features
4. Click "Save Game"

#### Edit a Game
1. Find the game in the list
2. Click "Edit"
3. Modify fields as needed
4. Click "Save Game"

#### Delete a Game
1. Find the game in the list
2. Click "Delete"
3. Confirm deletion

### Managing Showcases

#### Add a New Showcase
1. Click "Add New Showcase"
2. Fill in:
   - Video Title (required)
   - YouTube URL (required) - Format: `https://www.youtube.com/watch?v=VIDEO_ID`
   - Description (required)
   - Duration (required) - Format: `2:30`
   - Views (optional)
   - Channel Name (optional, defaults to "YokaiScripts")
   - Date (required)
3. Click "Save Showcase"

Note: The thumbnail is automatically extracted from the YouTube URL.

#### Edit a Showcase
1. Find the showcase in the list
2. Click "Edit"
3. Modify fields as needed
4. Click "Save Showcase"

#### Delete a Showcase
1. Find the showcase in the list
2. Click "Delete"
3. Confirm deletion

## Data Structure

### Games Table
```sql
- id (uuid, primary key)
- name (text)
- game_id (text, Roblox ID)
- thumbnail (text, URL)
- description (text)
- status (text, working/updating/patched)
- features (text[], array of features)
- created_at (timestamptz)
- updated_at (timestamptz)
```

### Showcases Table
```sql
- id (uuid, primary key)
- title (text)
- url (text, YouTube URL)
- video_id (text, YouTube video ID)
- thumbnail (text, URL)
- description (text)
- duration (text, e.g., "2:30")
- views (integer)
- channel (text)
- date (date)
- created_at (timestamptz)
- updated_at (timestamptz)
```

## Security

### Row Level Security (RLS)
Both tables have RLS enabled with the following policies:

**Public Access:**
- Anyone can view games and showcases (SELECT)

**Authenticated Access:**
- Authenticated users can INSERT, UPDATE, and DELETE

### Best Practices
1. Always authenticate before managing content
2. Verify URLs before saving
3. Use appropriate status values for games
4. Include accurate video durations for showcases

## Troubleshooting

### Content Not Loading
- Check browser console for errors
- Verify Supabase connection settings in `.env`
- Ensure database migration has been applied

### Cannot Add/Edit Content
- Verify you are authenticated
- Check RLS policies are correctly applied
- Verify the migration was successful

### YouTube Thumbnails Not Showing
- Verify the URL format is correct
- Ensure the video ID is extracted properly
- Check if the YouTube video is public

## Integration with Website

The content manager automatically updates:
- `/games/index.html` - Displays all games
- `/showcases/index.html` - Displays all showcases

No additional code changes are needed. The website will automatically fetch from the database.

## Theme Issues Fixed

### Light Theme Visibility
Fixed visibility issues in the Games page:
- **Loader Section**: Now properly visible in Light theme with appropriate background and text colors
- **Copy Buttons**: Text is now white on dark background, visible in all themes
- **Modal Copy Buttons**: Same fix applied to modal buttons

The theme system now properly handles:
- Button backgrounds and text colors for all themes
- Loader box backgrounds in both dark and light themes
- Input fields with appropriate contrast
- Border colors for better visibility

## Notes

- This replaces the old Python scripts (NBLM Game Manager and main.py)
- All data is stored in Supabase, not in HTML files
- Changes are instantly reflected on the website
- The UI is fully responsive and works on mobile devices
