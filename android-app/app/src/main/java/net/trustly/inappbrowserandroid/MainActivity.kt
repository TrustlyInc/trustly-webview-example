package net.trustly.inappbrowserandroid

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import net.trustly.inappbrowserandroid.webviewclient.CustomTabActivity

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val customTabButton = findViewById<Button>(R.id.customTabsButton)
        customTabButton.setOnClickListener {
            startActivity(Intent(this, CustomTabActivity::class.java))
        }
    }

}