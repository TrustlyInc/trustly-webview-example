package net.trustly.inappbrowserandroid.webviewclient

import android.annotation.SuppressLint
import android.content.Context
import android.net.Uri
import android.os.Bundle
import androidx.browser.customtabs.CustomTabsIntent
import net.trustly.inappbrowserandroid.TrustlyConstants
import net.trustly.inappbrowserandroid.WebViewBaseActivity

class CustomTabActivity : WebViewBaseActivity() {

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        launchUrl(this@CustomTabActivity, TrustlyConstants.TRUSTLY_URL + "web-view-client-redirect")
    }

    private fun launchUrl(context: Context, url: String) {
        val customTabsIntent = CustomTabsIntent.Builder().build()
        customTabsIntent.launchUrl(context, Uri.parse(url))
    }

}