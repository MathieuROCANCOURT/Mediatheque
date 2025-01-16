<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CD extends Model
{
    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function author() {
        return $this->belongsTo(Author::class);
    }
}
