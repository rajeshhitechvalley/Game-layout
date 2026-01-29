<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Achievement;
use App\Models\User;

class SocialSeeder extends Seeder
{
    public function run(): void
    {
        // Create sample achievements
        $achievements = [
            [
                'name' => 'First Victory',
                'description' => 'Win your first game',
                'icon' => 'trophy',
                'badge_color' => 'bg-yellow-500',
                'points' => 10,
                'type' => 'game',
                'requirements' => json_encode(['wins' => 1]),
                'is_hidden' => false,
            ],
            [
                'name' => 'Social Butterfly',
                'description' => 'Add 10 friends',
                'icon' => 'users',
                'badge_color' => 'bg-blue-500',
                'points' => 25,
                'type' => 'social',
                'requirements' => json_encode(['friends' => 10]),
                'is_hidden' => false,
            ],
            [
                'name' => 'Speed Demon',
                'description' => 'Complete a game in under 5 minutes',
                'icon' => 'zap',
                'badge_color' => 'bg-red-500',
                'points' => 50,
                'type' => 'game',
                'requirements' => json_encode(['time' => 300]),
                'is_hidden' => false,
            ],
            [
                'name' => 'Master Collector',
                'description' => 'Bookmark 50 games',
                'icon' => 'bookmark',
                'badge_color' => 'bg-purple-500',
                'points' => 30,
                'type' => 'milestone',
                'requirements' => json_encode(['bookmarks' => 50]),
                'is_hidden' => false,
            ],
            [
                'name' => 'Secret Achievement',
                'description' => 'Discover a hidden feature',
                'icon' => 'eye',
                'badge_color' => 'bg-gray-500',
                'points' => 100,
                'type' => 'milestone',
                'requirements' => json_encode(['secret' => true]),
                'is_hidden' => true,
            ],
        ];

        foreach ($achievements as $achievement) {
            Achievement::create($achievement);
        }

        // Create some test users for testing
        $testUsers = [
            [
                'name' => 'Test Player One',
                'email' => 'player1@test.com',
                'password' => bcrypt('password'),
                'is_admin' => false,
            ],
            [
                'name' => 'Test Player Two',
                'email' => 'player2@test.com',
                'password' => bcrypt('password'),
                'is_admin' => false,
            ],
            [
                'name' => 'Test Player Three',
                'email' => 'player3@test.com',
                'password' => bcrypt('password'),
                'is_admin' => false,
            ],
        ];

        foreach ($testUsers as $userData) {
            User::create($userData);
        }

        $this->command->info('Social features seeded successfully!');
    }
}
