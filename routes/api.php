<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
	'prefix' => 'auth',
	'namespace' => 'Auth'
], function(){
	Route::post('signin', 'SignInController');
	Route::post('signout', 'SignOutController');
	Route::get('me', 'MeController');
	Route::post('register', 'RegisterController');
});

Route::group([
	'prefix' => 'quiz'
], function(){
	Route::post('', 'QuizController@create');
	Route::get('', 'QuizController@allQuizzes')
		->withoutMiddleware(['auth:api']);
	Route::get('mine', 'QuizController@myQuizzes');
	Route::get('others', 'QuizController@othersQuizzes');
	Route::patch('{quizId}', 'QuizController@updateQuiz')
		->middleware('can:update,quiz');
	Route::delete('{quizId}', 'QuizController@deleteQuiz')
		->middleware('can:update,quiz');
});

Route::group([
	'prefix' => 'round'
], function(){
	Route::post('', 'RoundController@create');
	Route::get('{round}', function (App\Round $round) {
		return $round;
	});
	Route::get('fromQuiz/{quiz}', 'RoundController@quizRounds');
	Route::patch('{roundId}', 'RoundController@updateRound')
		->middleware('can:update,round');
	Route::delete('{roundId}', 'RoundController@deleteRound')
		->middleware('can:update,round');
});

Route::group([
	'prefix' => 'question'
], function(){
	Route::post('', 'QuestionController@create');
	Route::get('{question}', function (App\Question $question) {
		return $question;
	});
	Route::get('fromQuiz/{quiz}', 'QuestionController@quizQuestions');
	Route::get('fromQuiz/{quiz}/{round}', 'QuestionController@roundQuestions');
	Route::delete('{id}', 'QuestionController@deleteQuestion')
		->middleware('can:update,question');
});

Route::group([
	'prefix' => 'answer'
], function(){
	Route::post('', 'AnswerController@Create');
	Route::get('from/{quiz}', 'AnswerController@myAnswers');
	Route::patch('{answer}', 'AnswerController@update')
		->middleware('can:update,answer');
});
