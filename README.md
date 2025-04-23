# SageSites: Philosophy Geography Game

An educational game that connects philosophical ideas with their geographical origins. Test your knowledge of philosophy and geography by guessing the locations of important philosophical sites around the world.

## Features

- Interactive map-based gameplay
- Educational content about philosophers and their works
- Progressive hint system
- User progress tracking
- Responsive design for desktop and mobile

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- PostgreSQL (v14 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd PhilosophyGuesser
```

2. Install root dependencies:
```bash
cd src
npm install
```

3. Install client dependencies:
```bash
cd client
npm install
```

4. Install server dependencies:
```bash
cd ../server
npm install
```

5. Set up environment variables:
Create a `.env` file in the server directory with the following content:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/sagesites"
JWT_SECRET="your-secret-key"
PORT=3000
NODE_ENV=development
```

6. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

## Development

1. Start the development server:
```bash
# In the src directory
npm run start
```

This will start both the client and server in development mode:
- Client: http://localhost:3001
- Server: http://localhost:3000

## Testing

```bash
# Run all tests
npm test

# Run client tests
npm run test:client

# Run server tests
npm run test:server
```

## Project Structure

```
src/
├── client/                 # Frontend React application
│   ├── public/            # Static files
│   └── src/
│       ├── components/    # Reusable React components
│       ├── pages/         # Page components
│       ├── store/         # Redux store configuration
│       ├── services/      # API services
│       └── utils/         # Utility functions
├── server/                # Backend Express application
│   ├── src/
│   │   ├── config/       # Configuration files
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Express middleware
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   └── utils/        # Utility functions
│   └── prisma/           # Database schema and migrations
└── shared/               # Shared types and utilities
```

## ✨ Features

### 🔍 Global Philosophical Exploration
- Immersive street views and high-quality images of historical philosophical sites
- Interactive map interface for pinpointing locations
- Dynamic difficulty levels adapting to your philosophical knowledge

### 💡 Enlightening Hints
- Timed quote hints from works written at each location
- Progressive clue system to guide your discoveries
- Reference cards for major philosophical movements and schools

### 🎓 Educational Journey
- Comprehensive information about each location's significance
- Biographical sketches of philosophers connected to each site
- Timeline visualization of philosophical developments

### 🏆 Achievement System
- Skill-based scoring measuring geographical accuracy and philosophical knowledge
- Unlockable content including rare philosophical locations
- Customizable profile to track your intellectual journey

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB (optional, for local development)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/sagesites.git

# Navigate to project directory
cd sagesites

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

The application will launch in your default browser. If not, check the console for the correct URL.

## 🗺️ Featured Locations

SageSites takes you on a global tour of philosophy's most important sites:

- **Plato's Academy** (Athens, Greece) - Birthplace of Western academic tradition
- **Café de Flore** (Paris, France) - Where existentialism flourished with Sartre and de Beauvoir
- **Nietzsche's Residence** (Turin, Italy) - Where "Thus Spoke Zarathustra" was completed
- **Socrates' Prison** (Athens, Greece) - Site of the philosopher's final dialogue
- **Machiavelli's Writing Studio** (San Casciano, Italy) - Where "The Prince" was penned
- **Confucius' Temple** (Qufu, China) - Center of Confucian thought for millennia
- **Heidegger's Hut** (Black Forest, Germany) - Retreat where "Being and Time" took shape
- **Wittgenstein's Cabin** (Skjolden, Norway) - Isolated site of linguistic philosophy breakthroughs

And many more to discover!

## 🧩 How It Works

1. **Observe** - You'll be placed at a philosophical landmark
2. **Investigate** - Look for clues in architecture, surroundings, and cultural context
3. **Contemplate** - After 30 seconds, receive a philosophical quote hint
4. **Locate** - Place your marker on the world map
5. **Learn** - Discover the location's philosophical significance and historical context

## 🖼️ Demo

*Screenshots coming soon! The application is currently in development.*

In the meantime, imagine:
- An immersive interface showing philosophical landmarks from around the world
- Interactive maps where players can test their knowledge of philosophy's birthplaces
- Educational cards revealing the stories behind history's greatest ideas

## 📚 Technical Stack

- **Frontend**: React.js with TypeScript
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Maps Integration**: Google Maps API
- **Authentication**: JWT with secure refresh tokens
- **Deployment**: Docker containerization for scalable deployment

## 🤝 Contributing

We welcome contributions from philosophy enthusiasts and developers alike! See our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Areas we're especially interested in expanding:
- Additional philosophical locations with historical significance
- Quote collections from philosophical works
- Translations to make philosophy accessible globally
- Performance optimizations for smoother experiences

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Special thanks to philosophy departments and historians who provided location data
- The GeoGuessr team for pioneering geographical discovery games
- All contributors and philosophy enthusiasts who've supported this project

---

<div align="center">
  <i>SageSites: Walking in the footsteps of great minds.</i>
</div>
