# CoRent 🏠

A full-stack web application that calculates fair rent distribution for shared housing based on room size and shared spaces.

**Live Demo:** [co-rent-rho.vercel.app](https://co-rent-rho.vercel.app/)

![CoRent Screenshot](https://raw.githubusercontent.com/Felixlarss/FelixLarss/refs/heads/main/coRent.png)

## The Problem

Splitting rent fairly in a collective is complicated. How do you account for different room sizes, shared spaces, and individual amenities? Manual calculations are error-prone and time-consuming.

## The Solution

CoRent automates fair rent distribution by:
- Calculating proportional rent based on room sizes and shared spaces
- Managing multiple tenants and rooms in a single household
- Providing a simple, intuitive interface for rent calculations
- Supporting authentication so households can save and share their data

## Tech Stack

### Frontend
- **SvelteKit** - Modern web framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling

### Backend
- **Express.js** - REST API server
- **TypeScript** - Type-safe API development
- **PostgreSQL** - Relational database

### Deployment
- **Vercel** - Frontend hosting
- **Railway** - Backend API and PostgreSQL database hosting
- **Docker Compose** - Local development environment

## Features

✅ Add, edit, and remove tenants and rooms  
✅ Automatic fair rent calculation  
✅ Authentication system with house keys  
✅ Shareable household data  
✅ Type-safe full-stack architecture  
✅ Responsive design for mobile and desktop

## Getting Started

**Live Demo:** [co-rent-rho.vercel.app](https://co-rent-rho.vercel.app/)

The application is deployed and ready to use! No local setup required - just visit the link above to try it out.

### Want to run it locally?

The source code is available for review, but local setup requires environment configuration that isn't included in the repository for security reasons. Feel free to explore the codebase to see how it works!

## Project Structure

```
CoRent/
├── backend/              # Express.js API server
│   ├── src/
│   └── package.json
├── frontend-svelteKit/   # SvelteKit application
│   ├── src/
│   └── package.json
├── compose.yaml          # Docker Compose configuration
└── init.sql              # PostgreSQL initialization script
```

## Database Schema

The PostgreSQL database includes tables for:
- **house** - Household information and authentication keys
- **member** - Individual member data
- **room** - Room details and sizes
- **member_room** - Junction table linking members to their rooms

See `init.sql` for the complete schema.

## API Endpoints

### House
- `GET /api/house` - Get house information
- `POST /api/house` - Create new house
- `PATCH /api/house/:house_id` - Update house
- `DELETE /api/house/:house_id` - Delete house

### Members
- `GET /api/members` - Get all members with calculated rent distribution
- `GET /api/member/:member_id` - Get specific member with their calculated rent
- `POST /api/members` - Add new member
- `PATCH /api/members/:member_id` - Update member
- `DELETE /api/members/:member_id` - Remove member

### Rooms
- `GET /api/rooms` - Get all rooms
- `POST /api/rooms` - Add new room
- `PATCH /api/rooms/:room_id` - Update room
- `DELETE /api/rooms/:room_id` - Remove room

## What I Learned

Building CoRent taught me:
- **Full-stack architecture** - Organizing a modular, scalable backend with separation of concerns
- **Database design** - Creating normalized schemas and optimized queries
- **Type safety** - Using TypeScript across the entire stack to reduce runtime errors
- **Authentication systems** - Implementing custom authentication with house keys
- **DevOps basics** - Containerization with Docker for consistent development environments
- **API design** - Building RESTful endpoints with efficient data handling

## Future Improvements

- [ ] Multi-currency support
- [ ] Utility bill splitting feature
- [ ] Export calculations to PDF
- [ ] Email notifications for rent reminders
- [ ] Mobile app version

## Contributing

This is a personal learning project, but suggestions and feedback are welcome! Feel free to open an issue or reach out.

## License

MIT License - feel free to use this code for learning purposes.

## Contact

**Felix Larsson**  
📧 Larssonsfelix@gmail.com  
💻 [github.com/Felixlarss](https://github.com/Felixlarss)

---

*Built with ❤️ to solve a real problem for people living in collectives*
