package com.headlight.nycengineeringchallenge.network

data class LookupResponse(
        var location: String,
        var closest_match: String,
        var percent_match: Int
)