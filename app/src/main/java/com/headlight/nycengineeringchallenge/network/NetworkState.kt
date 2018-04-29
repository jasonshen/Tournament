package com.headlight.nycengineeringchallenge.network

sealed class NetworkState {
    class Loading : NetworkState()
    class LookupResult(val response: LookupResponse) : NetworkState()
    class ReportResult(val response: ReportResponse) : NetworkState()
    class Error(val error: Throwable) : NetworkState()
}