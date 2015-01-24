<?php

use Illuminate\Support\Facades\URL;

class Category extends Eloquent {
	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
	public function blog(){
		return $this->hasMany('Blog');
	}
}