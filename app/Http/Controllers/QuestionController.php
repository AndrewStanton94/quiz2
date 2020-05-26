<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;

class QuestionController extends Controller
{
	public function __construct(){
		$this->middleware(['auth:api']);
	}

	function create(Request $request){
		$question = new Question();
		$question->quiz = $request->quiz;
		$question->round = $request->round;
		$question->question = $request->question;
		$question->question_order = $request->question_order;

		$question->save();
		return response()->json($question);
	}

	function quizQuestions($quiz) {
		$fromQuiz = Question::where('quiz', $quiz)->get();
		return response()->json($fromQuiz);
	}

	function roundQuestions($quiz, $round) {
		$fromQuiz = Question::where([
			['quiz', '=', $quiz],
			['round', '=', $round]
		])->get();
		return response()->json($fromQuiz);
	}
}
