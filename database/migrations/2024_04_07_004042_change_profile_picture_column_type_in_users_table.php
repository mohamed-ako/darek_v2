<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeProfilePictureColumnTypeInUsersTable extends Migration
{
    public function up()
    {
        Schema::table('user', function (Blueprint $table) {
            $table->binary('profile_picture')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('user', function (Blueprint $table) {
            // Define rollback logic if needed
        });
    }
}
