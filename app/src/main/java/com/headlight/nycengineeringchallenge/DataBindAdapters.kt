package com.headlight.nycengineeringchallenge

import android.databinding.BindingAdapter
import android.view.View

@BindingAdapter("visibilityCondition")
fun setVisibilityCondition(view: View?, condition: Boolean) {
    view?.visibility = if (condition) View.VISIBLE else View.GONE
}