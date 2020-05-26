<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Answer;

class AnswerController extends Controller
{
	public function __construct(){
		$this->middleware(['auth:api']);
	}

	function create(Request $request){
		$user = $request->user();

		$answer = new Answer();
		$answer->user = $user->id;
		$answer->quiz = $request->quiz;
		$answer->question = $request->question;
		$answer->answer = $request->answer;
		$answer->correct = $request->correct;
		$answer->save();
		return response()->json($answer);
	}

	function myAnswers(Request $request, $quiz) {
		$user = $request->user();

		$mine = Answer::where([
			['user', '=', $user->id],
			['quiz', '=', $quiz]
		])->get();
		return response()->json($mine);
	}
}
