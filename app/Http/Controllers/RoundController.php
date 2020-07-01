<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Round;

class RoundController extends Controller
{
	public function __construct() {
		$this->middleware(['auth:api']);
	}

	function create(Request $request){
		$round = new Round();
		$round->quiz = $request->quiz;
		$round->round_name = $request->round_name;
		$round->round_order = $request->round_order;

		$round->save();
		return response()->json($round);
	}

	function quizRounds ($quiz) {
		$fromQuiz = Round::where('quiz', $quiz)->get();
		return response()->json($fromQuiz);
	}

	function updateRound(Request $request, $roundId) {
		$round = Round::find($roundId);

		$round->round_name = $request->round_name;

		$round->save();

		return response()->json($round);
	}
}
