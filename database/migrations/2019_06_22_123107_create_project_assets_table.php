<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectAssetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_assets', function (Blueprint $table) {
            $table->integer('project_id')->unsigned();
            $table->integer('asset_id')->unsigned();
            $table->timestamps();
            $table->foreign('project_id')->references('entity_id')->on('projects');
            $table->foreign('asset_id')->references('id')->on('assets');
            $table->primary(['project_id', 'asset_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('project_assets');
    }
}
