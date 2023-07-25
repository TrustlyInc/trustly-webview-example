package net.trustly.inappbrowserandroid

import android.os.Bundle
import android.webkit.WebView
import androidx.appcompat.app.AppCompatActivity

abstract class WebViewBaseActivity : AppCompatActivity() {

    lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_webviewbase)

        webView = findViewById(R.id.webView)
    }

}