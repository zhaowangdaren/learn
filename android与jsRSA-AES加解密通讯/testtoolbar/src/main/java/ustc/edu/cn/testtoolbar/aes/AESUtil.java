package ustc.edu.cn.testtoolbar.aes;

import android.util.Base64;

import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

/**
 * Created by ustc-zy on 15-11-23.
 */
public class AESUtil {
    private String key;

    public String aesDecrypt(String ciphertext) throws Exception {
        byte[] enc = Base64.decode(ciphertext, Base64.DEFAULT);
        SecretKeySpec keyspec = new SecretKeySpec(key.getBytes(),"AES");
        IvParameterSpec ivspec = new IvParameterSpec(key.getBytes());
        Cipher cipher = Cipher.getInstance("AES/CBC/NoPadding");


        cipher.init(Cipher.DECRYPT_MODE,keyspec,ivspec);
        byte[] plainText = cipher.doFinal(enc);

        return new String(plainText,"UTF-8");
    }

    public String encrypt(String msg){
        if(key == null)return null;
        try {
            Cipher cipher = Cipher.getInstance("AES/CBC/NoPadding");

            int blockSize = cipher.getBlockSize();

            byte[] dataBytes = msg.getBytes();
            int plaintextLength = dataBytes.length;
            if(plaintextLength % blockSize != 0){
                plaintextLength = plaintextLength + (blockSize - (plaintextLength % blockSize));
            }
            byte[] plaintext = new byte[plaintextLength];
            System.arraycopy(dataBytes, 0, plaintext, 0, dataBytes.length);
            SecretKeySpec keyspec = new SecretKeySpec(key.getBytes(), "AES");
            IvParameterSpec ivspec = new IvParameterSpec(key.getBytes());
            cipher.init(Cipher.ENCRYPT_MODE, keyspec, ivspec);
            byte[] encrypted = cipher.doFinal(plaintext);
            return new String(Base64.encodeToString(encrypted,Base64.DEFAULT));
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (NoSuchPaddingException e) {
            e.printStackTrace();
        } catch (InvalidAlgorithmParameterException e) {
            e.printStackTrace();
        } catch (InvalidKeyException e) {
            e.printStackTrace();
        } catch (BadPaddingException e) {
            e.printStackTrace();
        } catch (IllegalBlockSizeException e) {
            e.printStackTrace();
        }
        return null;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getKey() {
        return key;
    }
}
