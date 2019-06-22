<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->integer('entity_id')->unsigned();
            $table->string('title');
            $table->string('tagline');
            $table->string('description');
            $table->string('file_path');
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('entity_id')->references('id')->on('entities');
            $table->primary('entity_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
}
