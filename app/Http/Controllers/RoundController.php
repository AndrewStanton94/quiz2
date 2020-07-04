<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Round;
use App\Question;

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

	function deleteRound(Request $request, $roundId) {
		$round = Round::find($roundId);
		$questions = Question::where([
			['quiz', '=', $round->quiz],
			['round', '=', $round->round_order]
		])->get();

		if ($questions->isEmpty()) {
			$round->delete();
			return response()->json($round);
		} else {
			return response()->json([
				'error' => 'Must delete questions before deleting the round',
				'data' => $questions
			], 409);
		}
	}
}
