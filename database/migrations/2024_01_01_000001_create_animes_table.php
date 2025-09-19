<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('animes', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('synopsis')->nullable();
            $table->string('thumbnail')->nullable();
            $table->string('banner')->nullable();
            $table->enum('status', ['ongoing', 'completed', 'upcoming'])->default('ongoing');
            $table->enum('type', ['tv', 'movie', 'ova', 'ona', 'special'])->default('tv');
            $table->string('studio')->nullable();
            $table->year('release_year')->nullable();
            $table->string('genre')->nullable(); // JSON string of genres
            $table->integer('total_episodes')->nullable();
            $table->decimal('rating', 3, 1)->nullable();
            $table->integer('mal_id')->nullable()->unique();
            $table->integer('view_count')->default(0);
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
            
            // Indexes for performance
            $table->index('status');
            $table->index('type');
            $table->index('is_featured');
            $table->index(['status', 'created_at']);
            $table->index(['type', 'status']);
            $table->index('view_count');
            $table->index('rating');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('animes');
    }
};