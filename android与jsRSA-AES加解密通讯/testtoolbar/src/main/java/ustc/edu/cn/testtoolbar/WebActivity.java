package ustc.edu.cn.testtoolbar;

import android.os.Handler;
import android.os.Message;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.util.Base64;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Button;
import android.widget.Toast;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.InvalidKeyException;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import ustc.edu.cn.testtoolbar.aes.AESUtil;
import ustc.edu.cn.testtoolbar.rsa.RSAEncryptionUtil;

public class WebActivity extends AppCompatActivity implements View.OnClickListener{

    Button mShowGraph;
    WebView mWebView;
    JSONObject mArgs;
    String strArgs;
    JsObject jsObject;

    RSAEncryptionUtil encryptUtil;
    AESUtil aesUtil;
    String clientAESKey;
    String iv="1234567812345678";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_web);

        Toolbar toolbar = (Toolbar)findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setHomeButtonEnabled(true);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    }

    @Override
    protected void onResume(){
        super.onResume();

        mShowGraph = (Button) findViewById(R.id.show_graph);
        mWebView = (WebView) findViewById(R.id.webView);
        WebSettings mWebSettings = mWebView.getSettings();
        mWebSettings.setJavaScriptEnabled(true);
        mWebSettings.setDomStorageEnabled(true);

        jsObject = new JsObject();
        mWebView.addJavascriptInterface(jsObject, "jsObject");
        mWebView.loadUrl("file:///android_asset/indexvue.html");

        mShowGraph.setOnClickListener(this);
    }

    private void initArgs(){
        strArgs = "[" +
                    "{\"name\":\"现金\",\"value\":99999.99}," +
                    "{\"name\":\"股票\",\"value\":878.88}," +
                    "{\"name\":\"开放式基金\",\"value\":67676.67}," +
                    "{\"name\":\"债券\",\"value\":53658.88}," +
                    "{\"name\":\"融资\",\"value\":78965.99}," +
                    "{\"name\":\"融券\",\"value\":987987.88}," +
                    "{\"name\":\"质押\",\"value\":569807.00}," +
                    "{\"name\":\"天汇宝\",\"value\":6353849.99}," +
                    "{\"name\":\"其他\",\"value\":3487.00}]";
        if(aesUtil != null){
            strArgs = aesUtil.encrypt(strArgs);
        }
//        try {
//            mArgs = new JSONObject(strArgs);
//        } catch (JSONException e) {
//            e.printStackTrace();
//        }

    }
    @Override
    public boolean onCreateOptionsMenu(Menu menu){
        getMenuInflater().inflate(R.menu.menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem menuItem){
        switch (menuItem.getItemId()){
            case android.R.id.home:
                finish();
                break;
        }
        return true;
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.show_graph://需先获取js长生的aes key
                if(strArgs == null)initArgs();
//                Toast.makeText(WebActivity.this, aesUtil.getKey(), Toast.LENGTH_SHORT).show();
                jsObject.showGragh(mWebView,strArgs);
                break;
        }
    }


    private class JsObject{
        @JavascriptInterface
        public String toString(){return "jsObject";}

        //java call js
        public void showGragh(final WebView webView, final String args){
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    try {
//                        Toast.makeText(getApplicationContext(), args, Toast.LENGTH_SHORT).show();
                        webView.loadUrl("javascript: showGraph('" + args + "')");
                    }catch (Exception e){
                        e.printStackTrace();
                    }
                }
            });
        }

        //js call java
        @JavascriptInterface
        public void jsRetInfo(final String info){
//            Toast.makeText(getApplicationContext(), info, Toast.LENGTH_SHORT).show();
            new Thread(new Runnable() {
                @Override
                public void run() {
                    Bundle bundle = new Bundle();
                    bundle.putString("key", rsaDecrypt(info));
                    Message msg = new Message();
                    msg.setData(bundle);
                    infoHandler.sendMessage(msg);
                }
            }).start();
        }

        @JavascriptInterface
        public void communicate(final String cipher){
//            Toast.makeText(getApplicationContext(), cipher, Toast.LENGTH_SHORT).show();
            new Thread(new Runnable() {
                @Override
                public void run() {
                    try {

                        String result = aesUtil.aesDecrypt(cipher);
//                        String result = Decrypt(cipher,clientAESKey);
                        Bundle bundle = new Bundle();
                        bundle.putString("plainText", result);
                        Message msg = new Message();
                        msg.setData(bundle);
                        infoHandler.sendMessage(msg);
                    }catch (Exception e){
                        e.printStackTrace();
                    }
                }
            }).start();
        }
    }

    private String rsaDecrypt(String str){
        try {
            RSAEncryptionUtil encryptUtil = RSAEncryptionUtil.getInstance();
            if(encryptUtil.getPrivateKey() == null) {
                InputStream inputStream = getResources().getAssets()
                                .open("pkcs8_privatekey.pem");
                RSAPrivateKey privateKey = encryptUtil.loadPrivateKey(inputStream);
                encryptUtil.setPrivateKey(privateKey);
            }

            return encryptUtil.decrypt(Base64.decode(str,Base64.DEFAULT));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    final Handler infoHandler = new Handler(){
        @Override
        public void handleMessage(Message msg){
            Bundle bundle = msg.getData();
//            String cipher = bundle.getString("cipher");
            String key = bundle.getString("key");
            if(key != null) {
                if(aesUtil == null)aesUtil = new AESUtil();
                aesUtil.setKey(key);
            }
            String plainText = bundle.getString("plainText");
            if(plainText != null)
                Toast.makeText(getApplicationContext(), plainText, Toast.LENGTH_SHORT).show();
        }
    };


}
