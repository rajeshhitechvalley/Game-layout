<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Create test users for demo purposes
        $testUsers = [
            [
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'password' => Hash::make('password'),
                'is_admin' => false,
                'is_online' => true,
                'avatar_url' => null,
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'jane@example.com',
                'password' => Hash::make('password'),
                'is_admin' => false,
                'is_online' => false,
                'avatar_url' => null,
            ],
            [
                'name' => 'Mike Johnson',
                'email' => 'mike@example.com',
                'password' => Hash::make('password'),
                'is_admin' => false,
                'is_online' => true,
                'avatar_url' => null,
            ],
            [
                'name' => 'Sarah Wilson',
                'email' => 'sarah@example.com',
                'password' => Hash::make('password'),
                'is_admin' => false,
                'is_online' => false,
                'avatar_url' => null,
            ],
            [
                'name' => 'Alex Brown',
                'email' => 'alex@example.com',
                'password' => Hash::make('password'),
                'is_admin' => false,
                'is_online' => true,
                'avatar_url' => null,
            ],
        ];

        foreach ($testUsers as $userData) {
            // Check if user already exists
            if (!User::where('email', $userData['email'])->exists()) {
                User::create($userData);
            }
        }
    }
}
