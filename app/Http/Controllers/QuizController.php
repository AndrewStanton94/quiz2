<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Quiz;
use App\Round;
use App\Question;

class QuizController extends Controller
{
	public function __construct() {
		$this->middleware(['auth:api']);
	}

	function create(Request $request){
		$user = $request->user();

		$quiz = new Quiz();
		$quiz->quiz_name = $request->name;
		$quiz->happening_at = $request->date;
		$quiz->question_master = $request->questionMaster || $user->id;
		$quiz->save();
		return response()->json($quiz);
	}

	function myQuizzes(Request $request) {
		$user = $request->user();

		$mine = Quiz::where('question_master', $user->id)->get();
		return response()->json($mine);
	}

	function othersQuizzes(Request $request) {
		$user = $request->user();

		$others = Quiz::where('question_master', '<>', $user->id)->get();
		return response()->json($others);
	}

	function updateQuiz(Request $request, $quizId) {
		$quiz = Quiz::find($quizId);

		$quiz->quiz_name = $request->quiz_name;
		$quiz->happening_at = $request->happening_at;

		$quiz->save();

		return response()->json($quiz);
	}

	function deleteQuiz($quizId) {
		$quiz = Quiz::find($quizId);
		$rounds = Round::where('quiz', $quizId)->get();
		$questions = Question::where('quiz', $quizId)->get();

		if ($questions->isEmpty() && $rounds->isEmpty()) {
			$quiz->delete();
			return response()->json($quiz);
		} else {
			return response()->json([
				'error' => 'Must delete questions and rounds before deleting the quiz',
				'rounds' => $rounds,
				'questions' => $questions,
			], 409);
		}
	}
}


