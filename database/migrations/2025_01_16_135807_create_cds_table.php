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
        Schema::create('cds', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('artist');
            $table->integer('year')->nullable();
            $table->string('category');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $tableNames = config('cds.table_names');

        if (empty($tableNames)) {
            throw new \Exception('Error: config/cds.php not found and defaults could not be merged. Please publish the package configuration before proceeding, or drop the tables manually.');
        }

        Schema::drop($tableNames['title']);
        Schema::drop($tableNames['artist']);
        Schema::drop($tableNames['year']);
        Schema::drop($tableNames['category']);
    }
};
