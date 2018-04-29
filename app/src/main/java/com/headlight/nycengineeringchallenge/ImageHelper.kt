package com.headlight.nycengineeringchallenge

import android.content.ContentResolver
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import android.util.Base64
import java.io.ByteArrayOutputStream
import java.io.FileNotFoundException
import java.io.InputStream

object ImageHelper {

    fun getBase64EncodedImage(bytes: ByteArray): String {
        return "data:image/png;base64," + Base64.encodeToString(bytes, 0)
    }

    fun getImageBytes(contentResolver: ContentResolver, uri: Uri): ByteArray? {
        var inStream: InputStream? = null
        var bitmap: Bitmap? = null

        return try {
            inStream = contentResolver.openInputStream(uri)
            bitmap = BitmapFactory.decodeStream(inStream)
            val outStream = ByteArrayOutputStream()
            bitmap?.compress(Bitmap.CompressFormat.JPEG, 100, outStream)
            outStream.toByteArray()
        } catch (e: FileNotFoundException) {
            null
        } finally {
            inStream?.close()
            bitmap?.recycle()
        }
    }
}