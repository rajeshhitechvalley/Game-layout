# Social Features Documentation

## Overview
This document describes the complete social features implementation for the gaming platform, including friends, messaging, activity feeds, leaderboards, achievements, bookmarks, and favorites.

## Features

### 1. Friends System
- **Send/Receive Friend Requests**: Users can send and manage friend requests
- **Friend Status Tracking**: Pending, accepted, and blocked statuses
- **Friend List Management**: View and manage all friends

**Routes:**
- `GET /friends` - View friends and requests
- `POST /friends` - Send friend request
- `POST /friends/{friend}/accept` - Accept friend request
- `POST /friends/{friend}/reject` - Reject friend request
- `DELETE /friends/{friend}` - Remove friend

**Models:**
- `Friend` - Friend relationships
- `User` - Extended with friend relationships

### 2. Messaging System
- **Private Conversations**: One-on-one messaging between friends
- **Read Status**: Track message read/unread status
- **Conversation History**: View all messages between users

**Routes:**
- `GET /messages` - View conversation list
- `GET /messages/{user}` - View specific conversation
- `POST /messages/{user}` - Send message

**Models:**
- `Message` - Private messages

### 3. Activity Feed
- **Real-time Activities**: Track user actions and game events
- **Polymorphic Relationships**: Flexible activity tracking
- **Activity Types**: Game plays, achievements, social actions

**Routes:**
- `GET /activity` - View activity feed
- `POST /activity` - Log new activity

**Models:**
- `Activity` - User activities

### 4. Leaderboard System
- **Global Rankings**: Overall top players
- **Game-specific Rankings**: Per-game leaderboards
- **Personal Best**: Individual user scores

**Routes:**
- `GET /leaderboard` - View leaderboards
- `POST /leaderboard` - Submit score

**Models:**
- `Leaderboard` - Score entries

### 5. Achievement System
- **Unlockable Achievements**: Various achievement types
- **Progress Tracking**: Achievement progress and completion
- **Points System**: Award points for achievements

**Routes:**
- `GET /achievements` - View achievements
- `GET /achievements/{achievement}` - View achievement details

**Models:**
- `Achievement` - Achievement definitions
- `achievement_user` - User achievement progress

### 6. Bookmarks System
- **Game Bookmarks**: Save games for later
- **Categories**: Organize bookmarks by category
- **Notes**: Add personal notes to bookmarks

**Routes:**
- `GET /bookmarks` - View bookmarks
- `POST /bookmarks` - Add bookmark
- `PUT /bookmarks/{bookmark}` - Update bookmark
- `DELETE /bookmarks/{bookmark}` - Remove bookmark

**Models:**
- `Bookmark` - Game bookmarks

### 7. Favorites System
- **Favorite Games**: Quick access to loved games
- **Toggle Functionality**: Easy add/remove favorites
- **Statistics**: Track favorite game stats

**Routes:**
- `GET /favorites` - View favorites
- `POST /favorites` - Add favorite
- `DELETE /favorites/{favorite}` - Remove favorite
- `POST /favorites/toggle` - Toggle favorite status

**Models:**
- `Favorite` - Favorite games

## Database Schema

### Tables Created
1. `friends` - Friend relationships
2. `messages` - Private messages
3. `activities` - User activities
4. `leaderboards` - Score entries
5. `achievements` - Achievement definitions
6. `achievement_user` - User achievement progress
7. `bookmarks` - Game bookmarks
8. `favorites` - Favorite games

### Key Relationships
- Users can have many friends (bidirectional)
- Users can send/receive many messages
- Users can have many activities
- Users can have many leaderboard entries
- Users can unlock many achievements
- Users can bookmark many games
- Users can favorite many games

## Frontend Components

### React Components
- `Social/Friends.tsx` - Friends management interface
- `Social/Messages.tsx` - Messaging interface
- `Social/Activity.tsx` - Activity feed
- `Social/Leaderboard.tsx` - Leaderboard display
- `Profile/Achievements.tsx` - Achievement system
- `Profile/Bookmarks.tsx` - Bookmark management
- `Profile/Favorites.tsx` - Favorites display

### Features
- **Responsive Design**: Works on mobile and desktop
- **Real-time Updates**: Live messaging and activity
- **Search & Filter**: Find content easily
- **Progress Tracking**: Visual progress indicators
- **Statistics**: Comprehensive user stats

## API Endpoints

### Social Routes
```
GET  /friends              - Friend list and requests
POST /friends              - Send friend request
POST /friends/{id}/accept  - Accept request
POST /friends/{id}/reject  - Reject request
DELETE /friends/{id}       - Remove friend

GET  /messages             - Conversation list
GET  /messages/{user}      - Specific conversation
POST /messages/{user}      - Send message

GET  /activity             - Activity feed
POST /activity             - Log activity

GET  /leaderboard          - Leaderboards
POST /leaderboard          - Submit score
```

### Profile Routes
```
GET  /achievements         - Achievement list
GET  /achievements/{id}    - Achievement details

GET  /bookmarks            - Bookmark list
POST /bookmarks            - Add bookmark
PUT  /bookmarks/{id}       - Update bookmark
DELETE /bookmarks/{id}     - Remove bookmark

GET  /favorites            - Favorite list
POST /favorites            - Add favorite
DELETE /favorites/{id}     - Remove favorite
POST /favorites/toggle     - Toggle favorite
```

## Testing

### Test Data
The system includes sample data for testing:
- Test users (player1@test.com, player2@test.com, player3@test.com)
- Sample achievements
- Test route: `/test-social`

### Test Commands
```bash
# Run migrations
php artisan migrate

# Seed test data
php artisan db:seed --class=SocialSeeder

# Test social features (requires authentication)
# Visit /test-social when logged in
```

## Security Considerations

### Authentication
- All social routes require authentication
- Friend requests require mutual consent
- Messages only between friends

### Privacy
- Users control their friend list
- Private messages are secure
- Activity feed respects privacy settings

### Data Validation
- Input validation on all forms
- SQL injection prevention
- XSS protection

## Performance Optimizations

### Database Indexes
- Foreign key constraints
- Composite indexes for common queries
- Unique constraints for data integrity

### Caching
- Achievement data caching
- Leaderboard caching
- Activity feed optimization

## Future Enhancements

### Planned Features
- Real-time notifications
- Group messaging
- Game invitations
- Social sharing
- Achievement badges
- Leaderboard seasons

### Technical Improvements
- WebSocket integration
- Push notifications
- Image uploads for avatars
- File sharing in messages

## Troubleshooting

### Common Issues
1. **Migration Errors**: Ensure database is properly configured
2. **Foreign Key Issues**: Check table creation order
3. **Route Conflicts**: Verify route definitions
4. **Permission Issues**: Ensure proper middleware

### Debug Commands
```bash
# Check migrations
php artisan migrate:status

# Clear cache
php artisan cache:clear
php artisan config:clear

# Test routes
php artisan route:list --name=social
php artisan route:list --name=profile
```

## Support

For issues with the social features:
1. Check the logs: `php artisan log:tail`
2. Verify database connections
3. Test with sample data
4. Check authentication status

---

**Note**: This social features implementation is fully functional and ready for production use. All components are integrated with the existing gaming platform architecture.
