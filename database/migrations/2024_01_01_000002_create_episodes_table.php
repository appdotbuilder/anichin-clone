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
        Schema::create('episodes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('anime_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->integer('episode_number');
            $table->text('synopsis')->nullable();
            $table->string('thumbnail')->nullable();
            $table->json('download_links')->nullable(); // Array of download links
            $table->string('stream_url')->nullable();
            $table->integer('duration')->nullable(); // in minutes
            $table->timestamp('aired_at')->nullable();
            $table->integer('view_count')->default(0);
            $table->timestamps();
            
            // Indexes for performance
            $table->index('anime_id');
            $table->index(['anime_id', 'episode_number']);
            $table->index('aired_at');
            $table->index('view_count');
            $table->unique(['anime_id', 'episode_number']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('episodes');
    }
};