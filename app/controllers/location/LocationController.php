<?php

class LocationController extends BaseController {

    /**
     * Location Model
     * @var Location
     */
    protected $location;

    public function __construct()
    {
        parent::__construct();
//        $this->location = $user;
    }


    /**
     * Displays the form for user creation
     *
     */
    public function getCreate()
    {

        $arrayJS = array(
            'http://maps.googleapis.com/maps/api/js?sensor=true&libraries=places',
            'assets/global/plugins/bootbox/bootbox.min.js',
            'assets/global/plugins/gmaps/gmaps.min.js',
            'assets/global/plugins/jquery-validation/js/jquery.validate.min.js',
            'assets/global/plugins/jquery-validation/js/localization/messages_vi.min.js',
            'assets/global/plugins/uniform/jquery.uniform.min.js',
            'assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
            'assets/admin/pages/scripts/maps-google.js',
            'assets/frontend/pages/scripts/location.js',

        );
        $arrayStyle = array(
            'assets/frontend/pages/css/location.css',
            'assets/global/plugins/uniform/css/uniform.default.css',
            'assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css'
        );
        $js_page = $this->JScript($arrayJS);
        $style_page = $this->Style($arrayStyle);
        return View::make('site/location/create', compact('js_page','style_page'));
    }

    public function loadInitParam(){
        $foodType = Option::orderBy('name','ASC')->where('name','=','food_type')->get();
        $province = Province::orderBy('name','ASC')->get();
        $utility = Utility::orderBy('name','ASC')->get();
        $food = Food::orderBy('name','ASC')->get();
        $initParam = array("food"=>$food, "foodType"=>$foodType, "utility"=>$utility, "province"=>$province);
//        $initParam = array( "province"=>$province);

        return json_encode($initParam);
    }

}
