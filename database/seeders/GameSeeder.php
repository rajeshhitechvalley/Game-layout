<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Game;
use Illuminate\Support\Str;

class GameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the admin user (first user or create one if needed)
        $adminUser = \App\Models\User::first();
        if (!$adminUser) {
            $adminUser = \App\Models\User::create([
                'name' => 'Admin User',
                'email' => 'admin@playzone.com',
                'password' => bcrypt('password'),
                'is_admin' => true,
            ]);
        }

        $games = [
            [
                'user_id' => $adminUser->id,
                'title' => 'Shadow Blade: Elemental Fury',
                'description' => 'Wield the power of dual elemental blades in this epic action RPG. Master both light and dark magic as you battle through stunning realms and defeat legendary bosses.',
                'category' => 'Action',
                'image_path' => null,
                'rating' => 4.9,
                'plays' => '2300000',
                'featured' => true,
                'active' => true,
            ],
            [
                'title' => 'Turbo Rush X',
                'description' => 'Experience high-speed racing like never before. Customize your supercars and compete in intense street races across exotic locations.',
                'category' => 'Racing',
                'image_path' => null,
                'rating' => 4.8,
                'plays' => '1200000',
                'featured' => true,
                'active' => true,
            ],
            [
                'title' => 'Crystal Quest',
                'description' => 'Match colorful crystals and solve challenging puzzles in this addictive match-3 adventure. Discover power-ups and unlock new levels.',
                'category' => 'Puzzle',
                'image_path' => null,
                'rating' => 4.7,
                'plays' => '890000',
                'featured' => false,
                'active' => true,
            ],
            [
                'title' => 'Nova Strike',
                'description' => 'Engage in intense space combat in this futuristic shooter. Upgrade your weapons and defend the galaxy from alien invaders.',
                'category' => 'Shooter',
                'image_path' => null,
                'rating' => 4.6,
                'plays' => '1500000',
                'featured' => true,
                'active' => true,
            ],
            [
                'title' => 'Island Jumper',
                'description' => 'Explore mysterious islands and uncover hidden treasures in this thrilling adventure game. Solve puzzles and overcome obstacles.',
                'category' => 'Adventure',
                'image_path' => null,
                'rating' => 4.9,
                'plays' => '2100000',
                'featured' => true,
                'active' => true,
            ],
            [
                'title' => 'Goal Master',
                'description' => 'Score amazing goals and lead your team to victory in this action-packed soccer game. Customize players and compete in tournaments.',
                'category' => 'Sports',
                'image_path' => null,
                'rating' => 4.5,
                'plays' => '780000',
                'featured' => false,
                'active' => true,
            ],
            [
                'title' => 'Neon Arena',
                'description' => 'Battle players from around the world in this competitive .io game. Collect power-ups and dominate the neon-lit arena.',
                'category' => '.io',
                'image_path' => null,
                'rating' => 4.8,
                'plays' => '3200000',
                'featured' => true,
                'active' => true,
            ],
            [
                'title' => 'Dragon\'s Lair',
                'description' => 'Embark on an epic fantasy adventure as a dragon rider. Battle mythical creatures and save the kingdom from darkness.',
                'category' => 'RPG',
                'image_path' => null,
                'rating' => 4.9,
                'plays' => '450000',
                'featured' => false,
                'active' => true,
            ],
            [
                'title' => 'Speed Demons',
                'description' => 'Race against time and demons in this high-octane racing game. Drive through hellish landscapes and unlock supernatural vehicles.',
                'category' => 'Racing',
                'image_path' => null,
                'rating' => 4.4,
                'plays' => '320000',
                'featured' => false,
                'active' => true,
            ],
            [
                'title' => 'Gem Blaster',
                'description' => 'Shoot and match colorful gems in this explosive puzzle game. Create chain reactions and achieve high scores.',
                'category' => 'Puzzle',
                'image_path' => null,
                'rating' => 4.6,
                'plays' => '210000',
                'featured' => false,
                'active' => true,
            ],
            [
                'title' => 'Cyber Ops',
                'description' => 'Hack into secure systems and complete covert missions in this cyberpunk action game. Use advanced technology and tactical skills.',
                'category' => 'Action',
                'image_path' => null,
                'rating' => 4.7,
                'plays' => '180000',
                'featured' => false,
                'active' => true,
            ],
            [
                'title' => 'Sky Runner',
                'description' => 'Run and jump through floating platforms in the sky. Collect coins and avoid obstacles in this endless runner.',
                'category' => 'Adventure',
                'image_path' => null,
                'rating' => 4.8,
                'plays' => '290000',
                'featured' => false,
                'active' => true,
            ],
        ];

        foreach ($games as $game) {
            Game::create([
                'title' => $game['title'],
                'slug' => Str::slug($game['title']),
                'description' => $game['description'],
                'category' => $game['category'],
                'image_path' => $game['image_path'],
                'rating' => $game['rating'],
                'plays' => $game['plays'],
                'featured' => $game['featured'],
                'active' => $game['active'],
            ]);
        }
    }
}
