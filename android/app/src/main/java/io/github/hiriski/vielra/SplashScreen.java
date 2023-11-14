package io.github.hiriski.vielra;

import android.app.Activity;
import android.app.Dialog;

public class SplashScreen {

    public static Dialog dialog;

    public static void showSplashScreen(final Activity activity) {
        dialog = new Dialog(activity, R.style.SplashScreenTheme);
        dialog.setContentView(R.layout.splash_screen);
        dialog.setCancelable(false);

        dialog.show();

        Thread thread = new Thread() {
            public void run() {
                try {
                    sleep(3250); // Wait for 3 seconds.
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } finally {
                    dialog.dismiss();
                }
            }
        };

        thread.start();
    }
}
