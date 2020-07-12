<?php

namespace App\Policies;

use App\User;
use App\Quiz;
use Illuminate\Auth\Access\HandlesAuthorization;

class QuizPolicy
{
    use HandlesAuthorization;

	public function update(User $user, Quiz $quiz) {
		return $user->id === $quiz->question_master ?: Response::deny()
	}
}
