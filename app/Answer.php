<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
	protected $casts = [
		'user' => 'integer',
		'quiz' => 'integer',
		'round' => 'integer',
		'question' => 'integer',
		'score' => 'float'
	];
}
