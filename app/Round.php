<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Round extends Model
{
	protected $casts = [
		'quiz' => 'integer',
		'round_order' => 'integer'
	];
}
