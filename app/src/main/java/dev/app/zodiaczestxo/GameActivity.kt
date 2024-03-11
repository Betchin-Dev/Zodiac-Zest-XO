package dev.app.zodiaczestxo

import android.content.Intent
import android.os.Bundle
import android.webkit.WebSettings
import android.webkit.WebView
import android.widget.ImageButton
import androidx.appcompat.app.AppCompatActivity

class GameActivity : AppCompatActivity() {

    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_game)

        webView = findViewById(R.id.webView)

        val webSettings: WebSettings = webView.settings
        webSettings.javaScriptEnabled = true

        webView.loadUrl("file:///android_asset/zodiaczest/dist/index.html")

        val buttonToAnotherActivity: ImageButton = findViewById(R.id.imageButton)
        buttonToAnotherActivity.setOnClickListener {

            val intent = Intent(this, MainActivity::class.java)


            startActivity(intent)
        }
    }
}