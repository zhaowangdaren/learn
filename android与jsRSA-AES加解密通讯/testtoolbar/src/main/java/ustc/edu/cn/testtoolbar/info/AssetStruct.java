package ustc.edu.cn.testtoolbar.info;

import java.util.ArrayList;

/**
 * Created by ustc-zy on 15-11-22.
 */
public class AssetStruct {
    private ArrayList<String> colors = null;
    private ArrayList<AssetItem> assetItems = null;
    public void addColor(String color){
        if(colors == null){
            colors = new ArrayList<>();
        }
        colors.add(color);
    }

    public void addAssetItem(AssetItem item){
        if(item == null)return;
        if(assetItems == null){
            assetItems = new ArrayList<>();
        }
        assetItems.add(item);
    }
    public ArrayList<AssetItem> getAssetItems(){
        return assetItems;
    }

    public ArrayList<String> getColors(){
        return colors;
    }
    public class AssetItem {
        String name;
        float value;

        public AssetItem(String name, float value){
            this.name = name;
            this.value = value;

        }
    }
}
