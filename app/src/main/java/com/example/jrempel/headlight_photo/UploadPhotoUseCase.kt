package com.example.jrempel.headlight_photo

import android.util.Base64
import io.reactivex.Observable
import retrofit2.Retrofit
import okhttp3.OkHttpClient
import okhttp3.ResponseBody
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory
import java.io.File

class UploadPhotoUseCase {

    val KEY = "3PR1GQKeE2N2_C3Z2bTNhg"
    val URL = "https://www.headlightlabs.com/api/gcpd_lookup/"

    fun validate(image: File): Observable<ResponseBody> {
        val interceptor = HttpLoggingInterceptor()
        val client = OkHttpClient.Builder().addInterceptor(interceptor).build()
        val retrofit = Retrofit.Builder()
                .baseUrl(URL)
                .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
                .client(client)
                .build()
                .create(Service::class.java)

        val image64 = Base64.encode(image.readBytes(), Base64.DEFAULT).toString()

        return retrofit.postImage(KEY, image64)
    }

    fun submit(image: File): Observable<ResponseBody> {
        val interceptor = HttpLoggingInterceptor()
        val client = OkHttpClient.Builder().addInterceptor(interceptor).build()
        val retrofit = Retrofit.Builder()
                .baseUrl(URL)
                .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
                .client(client)
                .build()
                .create(Service::class.java)

        val image64 = Base64.encode(image.readBytes(), Base64.DEFAULT).toString()

        return retrofit.postImage(KEY, image64)
    }
}