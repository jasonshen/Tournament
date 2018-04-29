package com.headlight.nycengineeringchallenge.network

import io.reactivex.Flowable
import retrofit2.http.Body
import retrofit2.http.POST

interface GothamCityAPI {
    @POST("api/gcpd_lookup")
    fun lookup(@Body request: GCPDRequest): Flowable<LookupResponse>

    @POST("api/gcpd_report")
    fun report(@Body request: GCPDRequest): Flowable<ReportResponse>
}