package net.trustly.inappbrowserandroid.webchromeclient

import android.annotation.SuppressLint
import android.os.Bundle
import android.os.Message
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebView.WebViewTransport
import net.trustly.inappbrowserandroid.TrustlyConstants
import net.trustly.inappbrowserandroid.WebViewBaseActivity

class WebChromeClientActivity : WebViewBaseActivity() {

    private lateinit var trustlyWebView: TrustlyWebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        trustlyWebView = TrustlyWebView(this)

        webView.settings.apply {
            javaScriptCanOpenWindowsAutomatically = true
            javaScriptEnabled = true
            domStorageEnabled = true
            setSupportMultipleWindows(true)
        }

        webView.webChromeClient = object : WebChromeClient() {
            override fun onCreateWindow(
                view: WebView,
                isDialog: Boolean,
                isUserGesture: Boolean,
                resultMsg: Message
            ): Boolean {
                return if (view.hitTestResult.type == 0) {
                    //window.open
                    webView.addView(trustlyWebView)
                    val transport = resultMsg.obj as WebViewTransport
                    transport.webView = trustlyWebView.webView
                    resultMsg.sendToTarget()
                    true
                } else false
            }
        }
        webView.loadUrl(TrustlyConstants.TRUSTLY_URL + "web-chrome-client-redirect")
    }

    override fun onResume() {
        super.onResume()

        trustlyWebView.proceedToChooseAccount()
    }

}