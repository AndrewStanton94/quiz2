<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
	protected $casts = [
		'quiz' => 'integer',
		'round' => 'integer',
		'question_order' => 'integer'
	];
}
