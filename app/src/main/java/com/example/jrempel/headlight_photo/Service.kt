package com.example.jrempel.headlight_photo

import io.reactivex.Observable
import okhttp3.MultipartBody
import okhttp3.RequestBody
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.http.*

// 3PR1GQKeE2N2_C3Z2bTNhg
internal interface Service {
    @POST("/")
    @FormUrlEncoded
    fun postImage(@Field("api_key") apiKey: String, @Field("body") image_contents: String): Observable<ResponseBody>
}