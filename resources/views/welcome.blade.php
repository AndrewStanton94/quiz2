<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1 shrink-to-fit=no">

	<title>{{ env('APP_NAME', 'Quiz') }}</title>

	<!-- Scripts -->
	<script src="{{ asset('js/manifest.js') }}" defer></script>
	<script src="{{ asset('js/vendor.js') }}" defer></script>
	<script src="{{ asset('js/app.js') }}" defer></script>

	<!-- Fonts -->
	<link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

	<!-- Styles -->
	<link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body>
	<div id="app">
	</div>
</body>
</html>
