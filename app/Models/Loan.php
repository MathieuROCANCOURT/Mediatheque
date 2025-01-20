<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Loan extends Model
{
    protected $table = 'loans';

    protected $fillable = [
        'cd_id',
        'user_id',
        'loan_date',
        'return_date',
    ];

    public function cd() {
        return $this->belongsTo(CD::class);
    }

    public function user() {
        return $this->belongsTo(User::class);  // This is correct now
    }
}
