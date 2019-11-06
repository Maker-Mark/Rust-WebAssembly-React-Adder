//Tells rust not to mangle this code. We need this to signal that we are using this rust code for wasm
#[no_mangle]

//Make a public function that implicidly returns the sum

pub fn add_nums(x: i32, y: i32) -> i32 {
    //A statement WITHOUT a ";" will do an implied return
    x + y
}
