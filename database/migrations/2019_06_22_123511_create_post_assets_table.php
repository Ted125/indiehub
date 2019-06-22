<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostAssetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('post_assets', function (Blueprint $table) {
            $table->integer('post_id')->unsigned();
            $table->integer('asset_id')->unsigned();
            $table->timestamps();
            $table->foreign('post_id')->references('entity_id')->on('posts');
            $table->foreign('asset_id')->references('id')->on('assets');
            $table->primary(['post_id', 'asset_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('post_assets');
    }
}
