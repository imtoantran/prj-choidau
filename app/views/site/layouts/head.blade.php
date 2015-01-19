<meta charset="utf-8">
<title>
    @section('title') @if (isset($default_page_title)) {{$default_page_title}} @else  {{$page_title}}   @endif @show

</title>
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

@section('meta_tag')
<meta name="keywords" content="@if (isset($default_keyword)) {{$default_keyword}} @endif " />
<meta name="author" content="choidau.net" />
<meta name="description" content="@if (isset($default_description)){{$default_description}} @endif " />
@show



<!-- Mobile Specific Metas
================================================= -->

<link rel="shortcut icon" href="favicon.ico">

<!-- Fonts START -->
<link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;subset=all" rel="stylesheet" type="text/css">
<link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900&amp;subset=all" rel="stylesheet" type="text/css"><!--- fonts for slider on the index page -->
<!-- Fonts END -->

<!-- Global styles START -->
<link rel="stylesheet" href="{{asset('assets/global/plugins/fontello/css/fontello.css')}}">
<link rel="stylesheet" href="{{asset('assets/global/plugins/bootstrap/css/bootstrap.min.css')}}">
@if (isset($style_global))
{{$style_global}}
@endif
<!-- Global styles END -->



<!-- Page level plugin styles START -->
@if (isset($style_plugin))
{{$style_plugin}}
@endif
<!-- Page level plugin styles END -->



<!-- Theme styles START -->
<link rel="stylesheet" href="{{asset('bootstrap/css/bootstrap.min.css')}}">
<link rel="stylesheet" href="{{asset('assets/global/css/components.css')}}">
<link rel="stylesheet" href="{{asset('assets/frontend/layout/css/style.css')}}">
<link rel="stylesheet" href="{{asset('assets/frontend/pages/css/style-choidau.css')}}">
<link rel="stylesheet" href="{{asset('assets/frontend/layout/css/style-responsive.css')}}">
<link rel="stylesheet" href="{{asset('assets/frontend/layout/css/themes/choidau-green.css')}}">
<link rel="stylesheet" href="{{asset('assets/frontend/layout/css/custom.css')}}">
@if (isset($style_page))
{{$style_page}}
@endif
<!-- Theme styles END -->


<style>
    @if (isset($style_script))
    {{$style_script}}
    @endif
</style>