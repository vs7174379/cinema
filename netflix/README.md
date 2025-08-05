# Netflix Clone

A modern Netflix clone built with React, Vite, and Tailwind CSS. This project replicates the core functionality and design of Netflix's streaming platform.

## Features

### 🎬 **Core Features**
- **Home Page**: Hero banner with featured content and movie rows
- **Browse Page**: Filter and search through movies by genre
- **Search Page**: Advanced search functionality with filters
- **Movie Detail Page**: Detailed view with video player and related content
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### 🎨 **UI Components**
- **Header**: Navigation with search and user menu
- **Hero Banner**: Featured content with play buttons
- **Movie Cards**: Interactive cards with hover effects
- **Movie Rows**: Horizontal scrolling movie lists
- **Footer**: Social links and company information

### 🔧 **Technical Features**
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Beautiful icons
- **React Player**: Video playback functionality
- **Responsive Design**: Mobile-first approach

## Pages

### 1. **Home Page** (`/`)
- Hero banner with featured movie
- Multiple movie rows (Trending, Popular, New Releases, etc.)
- Smooth scrolling navigation

### 2. **Browse Page** (`/browse`)
- Genre filtering
- Grid and list view modes
- Sorting options (Title, Year, Rating)
- Movie count display

### 3. **Search Page** (`/search`)
- Real-time search functionality
- Search by title, description, or genre
- Filter results by genre
- Loading states and empty states

### 4. **Movie Detail Page** (`/movie/:id`)
- Full movie information
- Video player with controls
- Related movies section
- Action buttons (Play, My List, Rate, Share, Download)

## Components

### Core Components
- `Header.jsx` - Navigation and search
- `Hero.jsx` - Featured content banner
- `MovieCard.jsx` - Individual movie display
- `MovieRow.jsx` - Horizontal movie lists
- `Footer.jsx` - Site footer
- `Loading.jsx` - Loading spinner

### Pages
- `Home.jsx` - Main landing page
- `Browse.jsx` - Movie browsing with filters
- `Search.jsx` - Search functionality
- `MovieDetail.jsx` - Individual movie details

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd netflix
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
netflix/
├── public/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── MovieCard.jsx
│   │   ├── MovieRow.jsx
│   │   ├── Footer.jsx
│   │   └── Loading.jsx
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Browse.jsx
│   │   ├── Search.jsx
│   │   └── MovieDetail.jsx
│   ├── data/               # Static data
│   │   └── movies.js
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── package.json
└── README.md
```

## Technologies Used

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Player** - Video player component
- **React Hot Toast** - Toast notifications

## Customization

### Adding New Movies
Edit `src/data/movies.js` to add new movies:

```javascript
{
  id: 9,
  title: "New Movie",
  description: "Movie description...",
  image: "image-url",
  genre: "Action",
  year: 2024,
  rating: "TV-MA",
  duration: "2h 15m",
  featured: false,
  videoUrl: "video-url"
}
```

### Styling
The project uses Tailwind CSS. Custom styles can be added to `src/index.css`.

### Routing
Add new routes in `src/App.jsx`:

```javascript
<Route path="/new-page" element={<NewPage />} />
```

## Features to Add

- [ ] User authentication
- [ ] My List functionality
- [ ] Video streaming
- [ ] User profiles
- [ ] Rating system
- [ ] Watch history
- [ ] Recommendations
- [ ] Multi-language support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes only. Netflix is a registered trademark of Netflix, Inc.

## Acknowledgments

- Netflix for the original design inspiration
- Unsplash for sample images
- Lucide for beautiful icons
