package com.headlight.nycengineeringchallenge.network

import io.reactivex.Flowable

class GothamCityRepository(private val gothamCityAPI: GothamCityAPI) {
    fun lookup(GCPDRequest: GCPDRequest): Flowable<LookupResponse> {
        return gothamCityAPI.lookup(GCPDRequest)
    }

    fun report(GCPDRequest: GCPDRequest): Flowable<ReportResponse> {
        return gothamCityAPI.report(GCPDRequest)
    }
}