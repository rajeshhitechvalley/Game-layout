<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@playzone.com',
            'password' => Hash::make('password'),
            'is_admin' => true,
        ]);

        $this->command->info('Admin user created successfully!');
        $this->command->info('Email: admin@playzone.com');
        $this->command->info('Password: password');
    }
}
