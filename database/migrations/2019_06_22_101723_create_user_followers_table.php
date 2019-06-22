<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserFollowersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_followers', function (Blueprint $table) {
            $table->integer('followed_id')->unsigned();
            $table->integer('follower_id')->unsigned();
            $table->timestamps();
            $table->foreign('followed_id')->references('id')->on('users');
            $table->foreign('follower_id')->references('id')->on('users');
            $table->primary(['followed_id', 'follower_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_followers');
    }
}
