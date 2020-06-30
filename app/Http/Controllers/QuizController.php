<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Quiz;

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
}


