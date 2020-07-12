<?php

namespace App\Policies;

use App\User;
use App\Round;
use App\Quiz;
use Illuminate\Auth\Access\HandlesAuthorization;

class RoundPolicy
{
    use HandlesAuthorization;

	public function update(Use $user, Round $round) {
		$quiz = Quiz::find($round->quiz);
		return $user->id === $quiz->question_master ?: Response::deny()
	}
}
