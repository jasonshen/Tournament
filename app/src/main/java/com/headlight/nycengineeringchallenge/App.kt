package com.headlight.nycengineeringchallenge

import android.app.Application
import com.headlight.nycengineeringchallenge.network.GothamCityAPI
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory
import retrofit2.converter.moshi.MoshiConverterFactory
import timber.log.Timber

class App : Application() {

    override fun onCreate() {
        super.onCreate()

        if (BuildConfig.DEBUG) {
            Timber.plant(Timber.DebugTree())
        }
    }

    companion object {
        fun getHeadlightsAPI(): GothamCityAPI {
            val retrofit: Retrofit = Retrofit.Builder()
                    .baseUrl("https://www.headlightlabs.com/")
                    .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
                    .addConverterFactory(MoshiConverterFactory.create())
                    .client(
                            OkHttpClient.Builder()
                                    .addInterceptor(HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY))
                                    .build())
                    .build()

            return retrofit.create(GothamCityAPI::class.java)
        }
    }
}