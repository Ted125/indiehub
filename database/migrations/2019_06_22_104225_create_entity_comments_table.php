<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEntityCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('entity_comments', function (Blueprint $table) {
            $table->integer('entity_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->string('comment');
            $table->softDeletes();
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('entity_id')->references('id')->on('entities');
            $table->primary(['user_id', 'entity_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('entity_comments');
    }
}
