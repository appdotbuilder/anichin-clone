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
        Schema::create('watch_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('anime_id')->constrained()->cascadeOnDelete();
            $table->foreignId('episode_id')->constrained()->cascadeOnDelete();
            $table->string('session_id')->nullable(); // For guest watch history
            $table->foreignId('user_id')->nullable()->constrained()->cascadeOnDelete();
            $table->integer('watch_progress')->default(0); // in seconds
            $table->boolean('completed')->default(false);
            $table->timestamp('last_watched_at');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('anime_id');
            $table->index('episode_id');
            $table->index('session_id');
            $table->index('user_id');
            $table->index('last_watched_at');
            $table->unique(['episode_id', 'session_id']);
            $table->unique(['episode_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('watch_histories');
    }
};