package net.trustly.inappbrowserandroid.webchromeclient

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

class TrustlyWebChromeClientRedirectActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        Intent(this, WebChromeClientActivity::class.java).apply {
            addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP)
        }.run { startActivity(this) }
        finish()
    }

}