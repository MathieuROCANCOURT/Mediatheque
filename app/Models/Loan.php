<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    public function cd() {
        return $this->belongsTo(CD::class);
    }

    public function client() {
        return $this->belongsTo(Client::class);
    }
}
