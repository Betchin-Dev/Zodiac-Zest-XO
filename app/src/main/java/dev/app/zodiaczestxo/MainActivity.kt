package dev.app.zodiaczestxo

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

class MainActivity : AppCompatActivity(), android.view.View.OnClickListener {

    private var mediaPlayer: android.media.MediaPlayer? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        supportRequestWindowFeature(1)

        window.setFlags(
            1024,
            1024
        )
        setContentView(R.layout.activity_main)
        window.addFlags(android.view.WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS)

        val playButton: android.widget.Button = findViewById(R.id.one)
        val instructionButton: android.widget.Button = findViewById(R.id.two)
        val exitButton: android.widget.Button = findViewById(R.id.exit)

        playButton.setOnClickListener(this)
        instructionButton.setOnClickListener(this)
        exitButton.setOnClickListener(this)


    }

    override fun onClick(view: android.view.View) {

        mediaPlayer?.start()

        when (view.id) {
            R.id.one -> {
                val intent = android.content.Intent(this, GameActivity::class.java)
                startActivity(intent)
            }
            R.id.two -> {
                val intent = android.content.Intent(this, Instruction::class.java)
                startActivity(intent)
            }
            R.id.exit -> {
                finishAffinity()
            }
        }
    }

    //override fun onDestroy() {
        //super.onDestroy()
        // Release the MediaPlayer resources
        //mediaPlayer?.release()
    }
