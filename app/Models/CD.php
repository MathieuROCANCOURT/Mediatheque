<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CD extends Model
{
    protected $table = 'CDs';

    protected $fillable = [
        'title',
        'artist',
        'category',
        'year'
    ];

    public function loan() {
        return $this->hasMany(Loan::class);
    }
}
