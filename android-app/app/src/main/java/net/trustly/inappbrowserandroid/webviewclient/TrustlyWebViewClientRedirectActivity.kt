package net.trustly.inappbrowserandroid.webviewclient

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

class TrustlyWebViewClientRedirectActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        Intent(this, WebViewClientActivity::class.java).apply {
            addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP)
        }.run { startActivity(this) }
        finish()
    }

}