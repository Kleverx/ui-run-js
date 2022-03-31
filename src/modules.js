auto.waitFor();
importClass(android.database.sqlite.SQLiteDatabase);

var db = SQLiteDatabase.openOrCreateDatabase(files.path("./src/dt.db"), null);




module.exports = {
    log_info: log_info,
    print_info: print_info
}

function log_info() {
    // console.show();
    // sleep(100);
    // console.setPosition(0, -50);
    // console.setSize(1080, 620);
    for (let i = 0; i < 5; i++) log(i);
}



function print_info() {
    for (let i = 0; i < 5; i++) log(i);
}
