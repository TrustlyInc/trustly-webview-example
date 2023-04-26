package net.trustly.inappbrowserandroid

import android.annotation.SuppressLint
import android.content.Context
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.browser.customtabs.CustomTabsIntent
import androidx.fragment.app.Fragment

/**
 * A simple [Fragment] subclass.
 * Use the [SecondFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class SecondFragment : Fragment() {

    private lateinit var webView: WebView

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_second, container, false)
        initViews(view)
        return view
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun initViews(view: View) {
        with(view) {
            webView = findViewById(R.id.webView)

            val settings = webView.settings
            settings.apply {
                javaScriptEnabled = true
                domStorageEnabled = true
            }

            webView.webViewClient = object : WebViewClient() {
                override fun shouldOverrideUrlLoading(
                    view: WebView,
                    request: WebResourceRequest
                ): Boolean {
                    try {
                        val url = request.url.toString()
                        if (url.contains("/oauth/login"))
                            launchUrl(requireContext(), url)
                        return false
                    } catch (e: Exception) {
                        Log.e("MainActivity", e.message.toString())
                    }
                    return true
                }
            }
            webView.loadUrl("http://192.168.1.4:3000?integrationContext=InAppBrowser&urlScheme=redirect-navigation://second-fragment")
        }
    }

    override fun onResume() {
        super.onResume()

        webView.loadUrl("javascript:window.Trustly.proceedToChooseAccount();")
    }

    private fun launchUrl(context: Context, url: String) {
        val customTabsIntent = CustomTabsIntent.Builder().build()
        customTabsIntent.launchUrl(context, Uri.parse(url))
    }

    companion object {
        @JvmStatic
        fun newInstance() = SecondFragment()
    }
}