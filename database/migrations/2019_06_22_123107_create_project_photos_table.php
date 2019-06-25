<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectPhotosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_photos', function (Blueprint $table) {
            $table->integer('project_id')->unsigned();
            $table->integer('photo_id')->unsigned();
            $table->timestamps();
            $table->foreign('project_id')->references('entity_id')->on('projects');
            $table->foreign('photo_id')->references('id')->on('photos');
            $table->primary(['project_id', 'photo_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('project_photos');
    }
}
