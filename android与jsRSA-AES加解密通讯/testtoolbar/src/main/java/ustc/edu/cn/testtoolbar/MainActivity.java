package ustc.edu.cn.testtoolbar;

import android.content.Intent;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    RecyclerView mRecyclerView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar)findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);


    }

    @Override
    protected void onResume(){
        super.onResume();

        mRecyclerView = (RecyclerView)findViewById(R.id.recyclerView);
        //Use this setting to improve performance if you
        //know that changes in content do not change the layout
        //size of the RecyclerView
        mRecyclerView.setHasFixedSize(true);

        //use a linear layout manager
        mRecyclerView.setLayoutManager(new LinearLayoutManager(this));

        String[] myDataset = new String[]{"Java",
        "Object-C","Talent","Google","Facebook","FB"};
        MyAdapter adapter = new MyAdapter(myDataset);
        mRecyclerView.setAdapter(adapter);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu){
        getMenuInflater().inflate(R.menu.menu,menu);
        return true;
    }

    class MyAdapter extends RecyclerView.Adapter<MyViewHolder>{

        private String[] data;
        public MyAdapter(String[] data){
            this.data = data;
        }
        @Override
        public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            View view = View.inflate(getApplicationContext(),R.layout.textview,null);
            return new MyViewHolder(view);
        }

        @Override
        public void onBindViewHolder(MyViewHolder holder, int position) {
            holder.textView.setText(data[position]);
        }

        @Override
        public int getItemCount() {
            return data.length;
        }
    }

    class MyViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener{

        TextView textView;
        public MyViewHolder(View itemView) {
            super(itemView);
            textView = (TextView) itemView.findViewById(R.id.textView);
            textView.setOnClickListener(this);
        }


        @Override
        public void onClick(View v) {
            Snackbar.make(v,textView.getText(),Snackbar.LENGTH_SHORT).show();
            Intent intent = new Intent(getApplicationContext(), WebActivity.class);
            startActivity(intent);

        }
    }
}
