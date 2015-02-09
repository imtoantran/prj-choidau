

<!-- choidau-person-header -->
<div class="person-header">
   <div style="position: relative;">
    <div class="person-header-bg" style="background-image: url('{{$blogList['background']}}')"></div>
    <div  id="iM_user_slide" type_insert="insert_one_img_anh_bia" class="single-picture-wrapper imageManager_openModal insertMedia change-img"  data-toggle="modal" data-target="#imageManager_modal"  style="top: 5px;  left: 38px;">
        @if(Auth::check()&&Auth::user()->id==$blogList['id_user_blog'])
        <i class="icon-camera"></i>
        @endif
      <span></span>

    </div>
    <div class="change-img btn-save-anh-bia"  data-toggle="modal"  style="top: 5px;  left: 78px;display: none">

        <i class="icon-ok-circle-1"></i>
    </div>
   </div>
    <div class="row margin-none">
        <div class="col-md-2 text-right person-header-avatar">

            <img class="avatar-pad2" src=" {{$blogList['avatar']}}" width="150" height="150" alt="">

            <div  id="iM_user_slide" type_insert="insert_one_img_avatar" class="single-picture-wrapper imageManager_openModal insertMedia change-img"  data-toggle="modal" data-target="#imageManager_modal"  style="top: 5px;  left: 38px;">
                @if(Auth::check()&&Auth::user()->id==$blogList['id_user_blog'])
                <i class="icon-camera"></i>
                @endif
            </div>
            <div class="change-img btn-save-avatar"  data-toggle="modal"  style="top: 5px;  left: 78px;display: none">

                <i class="icon-ok-circle-1"></i>


            </div>
        </div>
        <div class="col-md-10 col-none-padding">
            <header class="person-header-username" id_u_blo="{{$blogList['id']}}"> {{$blogList['name']}}</header >
            <nav class="person-header-nav">
<!--
                <ul class="">
                    <li>Hoạt động</li>
                    <li>Ảnh</li>
                    <li>Địa điểm yêu thích</li>
                    <li>Checkin</li>
                    <li>Bạn bè</li>
                    <li><i class="icon-cog"></i></li>
                </ul>-->
                <ul class="nav nav-tabs nav-justified location-navigation" role="tablist">
                    <li role="presentation" class="active">
                        <a href="#home" aria-controls="home" role="tab" data-toggle="tab" aria-expanded="false">Hoạt động</a>
                    </li>
                    <li role="presentation" class="">
                        <a href="#tag-blog-photo-content" id="btn-tag-blog-photo" aria-controls="profile" role="tab" data-toggle="tab" aria-expanded="false">Ảnh</a>
                    </li>
                    <li role="presentation" class="">
                        <a href="#tag-blog-location-like-content" aria-controls="messages" id="btn-tag-blog-location-like" role="tab" data-toggle="tab" aria-expanded="false">Địa điểm yêu thích</a>
                    </li>
                    <li role="presentation" class="">
                        <a href="#tag-blog-checkin-content" aria-controls="settings" id="btn-tag-blog-checkin" role="tab" data-toggle="tab" aria-expanded="true">Checkin</a>
                    </li>
                    <li role="presentation">
                        <a href="#tag-blog-friend-content" id="btn-tag-blog-friend" aria-controls="settings" role="tab" data-toggle="tab" aria-expanded="true">Bạn bè</a>
                    </li>
                    <li role="presentation">
                        <a href="#settings" aria-controls="settings" role="tab" data-toggle="tab" aria-expanded="true"><i class="icon-cog"></i></a>
                    </li>
                </ul>

            </nav>
        </div>
    </div>
</div>
<!-- end choidau-person-header -->
