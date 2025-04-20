# BITians Social Media Platform

## Project Overview
This project aims to create a dedicated social media platform for BIT Mesra, Ranchi, optimized for college-specific interactions and features. The goal is to develop a highly engaging and useful platform that becomes an integral part of campus life.

## Key Features

1. **Campus-specific Authentication**
   - Use college email for registration
   - Verify student/faculty status

2. **Personalized Profiles**
   - Customizable academic information
   - Skill showcases and project portfolios

3. **Department and Course Groups**
   - Automatic enrollment based on student data
   - Resource sharing and discussion forums

4. **Event Management**
   - College event calendar
   - Club and society event promotions
   - RSVP and attendance tracking

5. **Campus Marketplace**
   - Buy/sell/exchange textbooks and study materials
   - Roommate finder for hostels

6. **Alumni Network**
   - Connect current students with alumni
   - Mentorship programs and job opportunities

7. **Academic Support**
   - Peer tutoring system
   - Study group formation

8. **Campus News and Announcements**
   - Official college updates
   - Student-run news channels

9. **Lost and Found**
   - Report and claim lost items on campus

10. **Internship and Placement Portal**
    - Company postings specific to BIT Mesra
    - Interview experiences and tips

11. **Mess and Canteen Reviews**
    - Daily menu updates
    - Ratings and feedback system

12. **Campus Map and Navigation**
    - Interactive map of college facilities
    - Class schedule integration with navigation

13. **Anonymous Confession Board**
    - Moderated platform for sharing thoughts

14. **Gamification Elements**
    - Reward points for academic achievements and platform engagement
    - Leaderboards and badges

15. **Virtual Club Fair**
    - Showcase of all college clubs and societies
    - Easy sign-up and information access

16. **Stories and Anonymous Posts**
    - Share temporary stories visible for 24 hours
    - Post anonymously for privacy-sensitive topics

17. **Group Creation and Management**
    - Create and join interest-based or department-specific groups
    - Advanced group admin features and moderation tools

18. **Verification System**
    - Blue tick verification for official college accounts and notable individuals
    - Verified badges for recognized student organizations

19. **Admin Panel**
    - Comprehensive dashboard for platform management
    - Content moderation and user management tools

20. **Responsive UI**
    - Seamless experience across desktop, tablet, and mobile devices
    - Adaptive design for various screen sizes

21. **Newsrooms**
    - Dedicated spaces for college departments and student journalists
    - Real-time updates on campus happenings

22. **Future Events Calendar**
    - Long-term event planning and promotion
    - Integration with personal calendars

23. **Academic Hub**
    - Centralized repository for study materials, lecture notes, and past papers
    - Subject-wise organization and easy search functionality

24. **BIT All-in-One App**
    - Integration of college services (library, hostel management, etc.)
    - Single sign-on for all college-related digital services

25. **Career Development Center**
    - Resume builder and review system
    - Mock interview scheduling with alumni and industry professionals

26. **Health and Wellness Section**
    - Mental health resources and anonymous counseling requests
    - Fitness challenges and nutrition tips

27. **Campus Sustainability Initiatives**
    - Eco-friendly project tracking and participation
    - Green campus leaderboard and rewards

28. **Alumni Success Stories**
    - Featured profiles of notable alumni
    - Interactive timeline of alumni achievements

29. **Virtual Lab Access**
    - Remote access to college laboratory simulations
    - Collaborative virtual experiments

30. **Skill Development Workshops**
    - Online and offline workshop organization and registration
    - Skill endorsement system among peers

31. **Campus Safety and Security**
    - Emergency contact information and alerts
    - Safe walk home feature with real-time tracking

32. **Campus Polls and Surveys**
    - Quick and easy creation of polls and surveys
    - Real-time results and analysis

33. **Campus Library Integration**
    - Digital library access and e-book borrowing
    - Physical library reservation system

34. **Campus Radio Station**
    - Live streaming of college radio shows
    - Music and talk show archives

35. **Campus Weather and Traffic Updates**
    - Real-time weather and traffic information
    - Integration with local weather and traffic APIs

## Technical Stack

1. **Frontend**: React.js with Next.js 15+ for server-side rendering
2. **Authentication**: NextAuth.js with Google Sign-in
3. **Database**: Drizzle ORM with Turso DB
4. **Styling**: TailwindCSS for responsive design
5. **Real-time Features**: Socket.io for instant messaging and notifications (planned)
6. **Cloud Hosting**: Vercel or similar platform
7. **Mobile Responsiveness**: Fully responsive design for all devices
8. **API Integration**: College management system API for data synchronization (planned)
9. **Analytics**: Google Analytics for user behavior tracking (planned)
10. **Security**: Regular security audits and HTTPS implementation

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- A Google OAuth client ID and secret
- A Turso database account and token

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bitians-next.git
   cd bitians-next
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the example environment file and update it with your credentials:
   ```bash
   cp .env.example .env.local
   ```

4. Update the `.env.local` file with your credentials:
   - Generate a `NEXTAUTH_SECRET` (you can use `openssl rand -base64 32`)
   - Add your Google OAuth credentials
   - Add your Turso database URL and auth token

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Database Setup

1. Generate the database schema:
   ```bash
   npm run db:generate
   ```

2. Push the schema to your Turso database:
   ```bash
   npm run db:push
   ```

3. View your database with Drizzle Studio:
   ```bash
   npm run db:studio
   ```

### Authentication Setup

This project uses NextAuth.js with Google authentication. To set up Google OAuth:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Create an OAuth client ID
5. Add the authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy the client ID and secret to your `.env.local` file

## Development Roadmap

1. **Phase 1**: Core features development (Authentication, Profiles, Groups)
2. **Phase 2**: Academic and social features (Events, Marketplace, Academic Support)
3. **Phase 3**: Advanced features and integrations (Alumni Network, Placement Portal)
4. **Phase 4**: Mobile app development
5. **Phase 5**: Testing, security audits, and performance optimization
6. **Phase 6**: Beta launch and feedback collection
7. **Phase 7**: Full launch and continuous improvement

By focusing on these features and technical aspects, we aim to create a highly engaging and useful platform that becomes an indispensable part of life at BIT Mesra, Ranchi.
