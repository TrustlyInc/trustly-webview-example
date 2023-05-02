package net.trustly.inappbrowserandroid.webviewclient

import android.annotation.SuppressLint
import android.content.Context
import android.net.Uri
import android.os.Bundle
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.browser.customtabs.CustomTabsIntent
import net.trustly.inappbrowserandroid.WebViewBaseActivity

class WebViewClientActivity : WebViewBaseActivity() {

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
        }

        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(
                view: WebView,
                request: WebResourceRequest
            ): Boolean {
                val url = request.url.toString()
                if (url.contains("/oauth/login"))
                    launchUrl(this@WebViewClientActivity, url)
                return true
            }
        }
        webView.loadUrl("http://192.168.1.4:3000?integrationContext=InAppBrowser&urlScheme=web-view-client-redirect")
    }

    override fun onResume() {
        super.onResume()

        webView.loadUrl("javascript:window.Trustly.proceedToChooseAccount();")
    }

    private fun launchUrl(context: Context, url: String) {
        val customTabsIntent = CustomTabsIntent.Builder().build()
        customTabsIntent.launchUrl(context, Uri.parse(url))
    }

}