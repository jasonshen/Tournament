package com.example.jrempel.headlight_photo

import android.app.Activity
import android.app.AlertDialog
import android.content.Intent
import android.os.Bundle
import android.os.Environment
import android.provider.MediaStore
import android.support.design.widget.Snackbar
import android.support.v4.content.FileProvider
import android.support.v7.app.AppCompatActivity
import android.view.MenuItem
import android.view.View
import android.view.View.GONE
import android.view.View.VISIBLE
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import kotlinx.android.synthetic.main.activity_main.*
import java.io.File
import java.text.SimpleDateFormat
import java.util.*


class MainActivity : AppCompatActivity() {

    val REQUEST_TAKE_PHOTO = 1

    var currentPhotoPath: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setSupportActionBar(toolbar)

        fab.setOnClickListener { view ->
            dispatchTakePictureIntent()
//            Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
//                    .setAction("Action", null).show()
        }

        showLoading(false)
    }

//    override fun onCreateOptionsMenu(menu: Menu): Boolean {
//        // Inflate the menu; this adds items to the action bar if it is present.
//        menuInflater.inflate(R.menu.menu_main, menu)
//        return true
//    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        return when (item.itemId) {
            R.id.action_settings -> true
            else -> super.onOptionsItemSelected(item)
        }
    }

    private fun dispatchTakePictureIntent() {
        val takePictureIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
        takePictureIntent.resolveActivity(packageManager).let {

            val photoFile = createImageFile()
            val photoURI = FileProvider.getUriForFile(this,
                    "com.example.android.fileprovider",
                    photoFile)
            takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, photoURI)
            startActivityForResult(takePictureIntent, REQUEST_TAKE_PHOTO)
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent) {
        if (requestCode == REQUEST_TAKE_PHOTO && resultCode == Activity.RESULT_OK) {

            currentPhotoPath?.let { uploadPhotoVerify(it) }
        }
    }

    private fun uploadPhotoVerify(photo: String) {

        val c = UploadPhotoUseCase().validate(File(photo))

        c
                .observeOn(AndroidSchedulers.mainThread())
                .subscribeOn(Schedulers.computation())
                .doOnSubscribe { showLoading(true) }
                .subscribe(
                        { showLoading(false) },
                        { e ->

                            showLoading(false)

                            // api down, mock a success
                            /*
                            e.printStackTrace()
                            AlertDialog.Builder(this).setTitle(android.R.string.dialog_alert_title).setMessage(e.message).show()
                            showLoading(false)
                            */

                            onValidateComplete(LookupResponse("https://headlight.s3.amazonaws.com/gGQhTbt_O9wD2lFxRdbzPw/elKtOo6L4EXKkkp2NmVXVw", "Agitator Aligator", 53.0), photo)
                        }
                )
    }

    private fun onValidateComplete(response: LookupResponse, photo: String) {
        showLoading(true)

        // todo load image from response and show in dialog
        val view = layoutInflater.inflate(R.layout.dialog_match, null)

        val builder = AlertDialog.Builder(this)
                .setTitle("Report Match?")
                .setMessage("${response.percentMatch}% match")
                .setView(view)
                .setPositiveButton(android.R.string.ok, { dialog, id -> submitPhoto(photo) })
                .setNegativeButton(android.R.string.cancel, { _, _ -> /* do nothing */ })
        builder.show()
    }

    private fun submitPhoto(photo: String) {
        val c = UploadPhotoUseCase().submit(File(photo))

        c
                .observeOn(AndroidSchedulers.mainThread())
                .subscribeOn(Schedulers.computation())
                .doOnSubscribe { showLoading(true) }
                .subscribe(
                        {
                            submitPhotoSuccess()
                        },
                        { e ->

                            showLoading(false)
                            // api down, mock a success
                            /*
                            e.printStackTrace()
                            AlertDialog.Builder(this).setTitle(android.R.string.dialog_alert_title).setMessage(e.message).show()
                            showLoading(false)
                            */

                            submitPhotoSuccess()
                        }
                )
    }

    private fun submitPhotoSuccess() {
        showLoading(false)
        Snackbar.make(findViewById(android.R.id.content), "Photo submitted successfully", Snackbar.LENGTH_LONG).setAction("Action", null).show()
    }

    private fun showLoading(loader: Boolean) {

        if (loader) {
            findViewById<View>(R.id.main).visibility = GONE
            findViewById<View>(R.id.loading).visibility = VISIBLE
        } else {
            findViewById<View>(R.id.main).visibility = VISIBLE
            findViewById<View>(R.id.loading).visibility = GONE
        }
    }

    private fun createImageFile(): File {
        // Create an image file name
        val timeStamp = SimpleDateFormat("yyyyMMdd_HHmmss").format(Date())
        val imageFileName = "JPEG_" + timeStamp + "_"
        val storageDir = getExternalFilesDir(Environment.DIRECTORY_PICTURES)
        val image = File.createTempFile(
                imageFileName, /* prefix */
                ".jpg", /* suffix */
                storageDir      /* directory */
        )

        // Save a file: path for use with ACTION_VIEW intents
        currentPhotoPath = image.absolutePath
        return image
    }
}
