package com.headlight.nycengineeringchallenge.main

import android.Manifest
import android.app.Activity
import android.app.Activity.RESULT_OK
import android.arch.lifecycle.Observer
import android.arch.lifecycle.ViewModelProviders
import android.content.Intent
import android.graphics.BitmapFactory
import android.os.Bundle
import android.support.design.widget.Snackbar
import android.support.v4.app.Fragment
import android.util.Base64
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.headlight.nycengineeringchallenge.ImageHelper
import com.headlight.nycengineeringchallenge.databinding.FragmentMainBinding
import com.headlight.nycengineeringchallenge.network.GCPDRequest
import com.tbruyelle.rxpermissions2.RxPermissions
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers
import kotlinx.android.synthetic.main.fragment_main.*


/**
 * A placeholder fragment containing a simple view.
 */
class MainActivityFragment : Fragment() {
    private lateinit var binding: FragmentMainBinding
    private val compositeDisposable = CompositeDisposable()

    private val viewModel: MainViewModel by lazy {
        ViewModelProviders.of(this, MainViewModel.FACTORY).get(MainViewModel::class.java)
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        binding = FragmentMainBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        fab.setOnClickListener {
            openGallery()
        }

        report_button.setOnClickListener {
            viewModel.reportLastLookup()
        }

        viewModel.lastLookupImage?.let { encoded ->
            val withoutMetaData = encoded.removePrefix("data:image/png;base64,")
            val decodedString = Base64.decode(withoutMetaData, Base64.DEFAULT)
            val decodedImage = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.size)
            villain_image?.setImageBitmap(decodedImage)
        }

        viewModel.networkState.observe(this, Observer {
            //TODO: I know this is hacky, but I can't find a way to make the viewmodel also an observable for data binding.
            binding.viewModel = viewModel
            binding.executePendingBindings()
        })
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (requestCode == GALLERY_IMAGE_REQUEST && resultCode == RESULT_OK && data != null) {
            val uri = data.data
            val contentResolver = activity?.contentResolver ?: return

            val bytes = ImageHelper.getImageBytes(contentResolver, uri) ?: return
            villain_image?.setImageBitmap(BitmapFactory.decodeByteArray(bytes, 0, bytes.size))

            val encoded = ImageHelper.getBase64EncodedImage(bytes)
            val lookupRequest = GCPDRequest(encoded)
            viewModel.lookup(lookupRequest)
        }
    }

    private fun openGallery() {
        val disposable = RxPermissions(activity as Activity)
                .request(Manifest.permission.READ_EXTERNAL_STORAGE)
                .map { it }
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(
                        {
                            val intent = Intent()
                            intent.type = "image/*"
                            intent.action = Intent.ACTION_GET_CONTENT
                            startActivityForResult(Intent.createChooser(intent, "Select a photo"), GALLERY_IMAGE_REQUEST)
                        },
                        {
                            Snackbar.make(binding.root, "Photo permission required.", Snackbar.LENGTH_SHORT).show()
                        }
                )

        compositeDisposable.add(disposable)
    }

    override fun onDestroy() {
        super.onDestroy()

        compositeDisposable.dispose()
    }

    companion object {
        private const val GALLERY_IMAGE_REQUEST = 0
    }
}
