package net.trustly.inappbrowserandroid

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import net.trustly.inappbrowserandroid.webchromeclient.WebChromeClientActivity
import net.trustly.inappbrowserandroid.webviewclient.WebViewClientActivity

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val webViewClientButton = findViewById<Button>(R.id.webViewClientButton)
        webViewClientButton.setOnClickListener {
            startActivity(Intent(this, WebViewClientActivity::class.java))
        }

        val webViewChromeButton = findViewById<Button>(R.id.webViewChromeButton)
        webViewChromeButton.setOnClickListener {
            startActivity(Intent(this, WebChromeClientActivity::class.java))
        }
    }

}