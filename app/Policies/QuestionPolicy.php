<?php

namespace App\Policies;

use App\User;
use App\Question;
use App\Quiz;
use Illuminate\Auth\Access\HandlesAuthorization;

class QuestionPolicy
{
    use HandlesAuthorization;

	public function update(User $user, Question $question) {
		$quiz = Quiz::find($question->quiz);
		return $user->id === $quiz->question_master ?: Response::deny();
	}
}
