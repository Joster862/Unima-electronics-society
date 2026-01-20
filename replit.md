# University of Malawi Electronics Society Website

## Overview
A static website for the University of Malawi Electronics Society - a student-led organization focused on electronics, innovation, and technology education.

## Project Architecture
- **Type**: Static HTML/CSS/JS website
- **Server**: Served with `npx serve` on port 5000
- **No build step required**

## File Structure
- `index.html` - Main landing page
- `news.html` - News page
- `style.css` - Main stylesheet
- `script.js` - JavaScript functionality (slideshow, counter animations, FAQ accordion, news loading)
- `news.json` - News data in JSON format
- Various `.jpg` images for slides, gallery, and branding

## Key Features
- Responsive navigation with hamburger menu
- Hero slideshow with automatic transitions
- Animated statistics counter
- News section loaded dynamically from JSON
- FAQ accordion
- Event highlights section

## Development
The site runs via `npx serve -l 5000` which serves static files.

## Deployment
Configured as a static site deployment serving the root directory.
