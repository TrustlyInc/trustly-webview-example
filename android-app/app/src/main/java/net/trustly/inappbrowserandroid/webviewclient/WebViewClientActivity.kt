package net.trustly.inappbrowserandroid.webviewclient

import android.annotation.SuppressLint
import android.content.Context
import android.net.Uri
import android.os.Bundle
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.browser.customtabs.CustomTabsIntent
import net.trustly.inappbrowserandroid.TrustlyConstants
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
                if (url.contains(TrustlyConstants.OAUTH_LOGIN_PATH))
                    launchUrl(this@WebViewClientActivity, url)
                return true
            }
        }
        webView.loadUrl(TrustlyConstants.TRUSTLY_URL + "web-view-client-redirect")
    }

    override fun onResume() {
        super.onResume()

        webView.loadUrl(TrustlyConstants.TRUSTLY_PROCEED_TO_CHOOSE_ACCOUNT_SCRIPT)
    }

    private fun launchUrl(context: Context, url: String) {
        val customTabsIntent = CustomTabsIntent.Builder().build()
        customTabsIntent.launchUrl(context, Uri.parse(url))
    }

}