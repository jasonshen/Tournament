package com.headlight.nycengineeringchallenge.main

import android.arch.lifecycle.*
import com.headlight.nycengineeringchallenge.App
import com.headlight.nycengineeringchallenge.network.GCPDRequest
import com.headlight.nycengineeringchallenge.network.GothamCityRepository
import com.headlight.nycengineeringchallenge.network.NetworkState
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers

class MainViewModel(private val repository: GothamCityRepository) : ViewModel() {
    private val compositeDisposable = CompositeDisposable()

    private var lastLookup: GCPDRequest? = null

    private val internalState = MutableLiveData<NetworkState>()
    val networkState: LiveData<NetworkState> = Transformations.map(internalState, {
        it
    })

    val showPhoto: Boolean
        get() = networkState.value is NetworkState.Loading || networkState.value is NetworkState.LookupResult

    val showLoading: Boolean
        get() = networkState.value is NetworkState.Loading

    val showLookupResponse: Boolean
        get() = networkState.value is NetworkState.LookupResult

    val showReportResponse: Boolean
        get() = networkState.value is NetworkState.ReportResult

    val showError: Boolean
        get() = networkState.value is NetworkState.Error

    val looksLikeText: String
        get() {
            val closestMatch = (networkState.value as? NetworkState.LookupResult)?.response?.closest_match.orEmpty()
            return "This looks like: $closestMatch"
        }

    val matchPercentageText: String
        get() {
            val percentage = (networkState.value as? NetworkState.LookupResult)?.response?.percent_match
                    ?: 0
            return "$percentage% Match"
        }

    val reportStatus: String
        get() = (networkState.value as? NetworkState.ReportResult)?.response?.status.orEmpty()

    val errorMessage: String
        get() = (networkState.value as? NetworkState.Error)?.error?.message.orEmpty()

    val lastLookupImage: String?
        get() = lastLookup?.image_contents

    fun lookup(GCPDRequest: GCPDRequest) {
        lastLookup = GCPDRequest
        internalState.postValue(NetworkState.Loading())

        val disposable = repository
                .lookup(GCPDRequest)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(
                        {
                            if (it.percent_match == 0) {
                                // No match?
                            } else {
                                val state = NetworkState.LookupResult(it)
                                internalState.postValue(state)
                            }
                        },
                        {
                            val error = Throwable("Unable to lookup villain.")
                            val state = NetworkState.Error(error)
                            internalState.postValue(state)
                        }
                )

        compositeDisposable.add(disposable)
    }

    fun reportLastLookup() {
        lastLookup?.let { lookup ->
            internalState.postValue(NetworkState.Loading())

            val disposable = repository
                    .report(lookup)
                    .subscribeOn(Schedulers.io())
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe(
                            {
                                val state = NetworkState.ReportResult(it)
                                internalState.postValue(state)
                            },
                            {
                                val error = Throwable("Unable to report villain.")
                                val state = NetworkState.Error(error)
                                internalState.postValue(state)
                            }
                    )

            compositeDisposable.add(disposable)
        }
    }

    override fun onCleared() {
        super.onCleared()

        compositeDisposable.dispose()
    }

    companion object {
        val FACTORY = object : ViewModelProvider.Factory {
            override fun <T : ViewModel?> create(modelClass: Class<T>): T {
                val repository = GothamCityRepository(App.getHeadlightsAPI())

                @Suppress("UNCHECKED_CAST")
                return MainViewModel(repository) as T
            }
        }
    }
}